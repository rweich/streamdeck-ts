import { EventsReceived, EventsSent } from '@rweich/streamdeck-events';
import { ReceivedPluginEventTypes } from '@rweich/streamdeck-events/dist/Events/Received/Plugin/ReceivedPluginEventTypes';
import { ReceivedPropertyInspectorEventTypes } from '@rweich/streamdeck-events/dist/Events/Received/PropertyInspector';
import EventEmitter from 'eventemitter3';
import WebSocket, { MessageEvent } from 'isomorphic-ws';
import { Logger } from 'ts-log';
import OnWebsocketOpenEvent from './events/OnWebsocketOpenEvent';
import JsonParseError from './exception/JsonParseError';

// TODO: add types to the eventemitter

type EventInterface = { event: string };

export default class AbstractStreamdeckConnector {
  protected eventEmitter: EventEmitter;
  protected sentEventFactory: EventsSent;
  private receivedEventFactory: EventsReceived;
  private logger: Logger;
  private websocket: WebSocket | null = null;
  private eventQueue: EventInterface[] = [];
  private actionInfo: Record<string, unknown> | null = null;
  private uuid: string | null = null;

  public constructor(
    eventEmitter: EventEmitter,
    receivedEventFactory: EventsReceived,
    sentEventFactory: EventsSent,
    logger: Logger,
  ) {
    this.eventEmitter = eventEmitter;
    this.receivedEventFactory = receivedEventFactory;
    this.sentEventFactory = sentEventFactory;
    this.logger = logger;
  }

  /**
   * Returns the info-object that we got from the streamdeck with the registration
   */
  public get info(): Record<string, unknown> {
    return this.actionInfo || {};
  }

  /**
   * Returns the uuid for the plugin, which we got while registering with the streamdeck
   */
  public get pluginUUID(): string | null {
    return this.uuid;
  }

  /**
   * returns the function the streamdeck uses as main entry point to register this plugin
   * @see https://developer.elgato.com/documentation/stream-deck/sdk/registration-procedure/
   */
  public createStreamdeckConnector(): (
    inPort: string,
    inPluginUUID: string,
    inRegisterEvent: string,
    inInfo: string,
  ) => void {
    return this.connectElgatoStreamDeckSocket.bind(this);
  }

  /**
   * Makes the streamdeck write the log message to a debug log file
   */
  public logMessage(message: string): void {
    this.sendToStreamdeck(this.sentEventFactory.logMessage(message));
  }

  /**
   * Requests the settings stored for the button instance
   *
   * @param {string} context The context / id of the current action / button
   */
  public getSettings(context: string): void {
    this.sendToStreamdeck(this.sentEventFactory.getSettings(context));
  }

  /**
   *
   * Persists the settings for the current button.
   *
   * Triggers the didReceiveSettings event for the plugin (if sent by pi) and for the pi (if sent by plugin)
   *
   * @param {string} context The context / id of the current action / button
   * @param {unknown} settings Whatever data you want to save
   */
  public setSettings(context: string, settings: unknown): void {
    this.sendToStreamdeck(this.sentEventFactory.setSettings(context, settings));
  }

  /**
   * Makes the streamdeck open the url in a browser.
   */
  public openUrl(url: string): void {
    this.sendToStreamdeck(this.sentEventFactory.openUrl(url));
  }

  /**
   * sends the event to the streamdeck
   */
  protected sendToStreamdeck(event: EventInterface): void {
    if (this.websocket === null) {
      this.logger.debug('queueing event', event, JSON.stringify(event));
      this.eventQueue.push(event);
    } else {
      this.logger.info('sending event', event, JSON.stringify(event));
      this.websocket.send(JSON.stringify(event));
    }
  }

  private connectElgatoStreamDeckSocket(
    inPort: string,
    inPluginUUID: string,
    inRegisterEvent: string,
    inInfo: string,
  ): void {
    try {
      this.actionInfo = JSON.parse(inInfo);
    } catch (e) {
      this.logger.error(e);
    }
    this.uuid = inPluginUUID;
    this.websocket = new WebSocket('ws://127.0.0.1:' + inPort);
    this.websocket.onopen = () => {
      this.sendToStreamdeck(this.sentEventFactory.register(inRegisterEvent, inPluginUUID));
      this.eventEmitter.emit('websocketOpen', new OnWebsocketOpenEvent(inPluginUUID, inInfo));
      this.eventQueue.map((event) => this.sendToStreamdeck(event));
      this.eventQueue = [];
    };
    this.websocket.onmessage = this.onMessage.bind(this);
  }

  private onMessage(messageEvent: MessageEvent): void {
    try {
      const event = this.createByMessageEvent(messageEvent);
      this.logger.debug('emitting event', event.event);
      this.eventEmitter.emit(event.event, event);
    } catch (e) {
      this.logger.error(e);
    }
  }

  private createByMessageEvent(
    messageEvent: MessageEvent,
  ): ReceivedPluginEventTypes | ReceivedPropertyInspectorEventTypes {
    this.logger.debug('got message', messageEvent);
    let data;

    try {
      data = JSON.parse(messageEvent.data.toString());
    } catch (e) {
      throw new JsonParseError('error on parsing json: ' + e.toString());
    }
    this.logger.debug('event data:', data);
    return this.receivedEventFactory.createFromPayload(data);
  }
}
