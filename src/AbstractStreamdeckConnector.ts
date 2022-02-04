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

export default abstract class AbstractStreamdeckConnector {
  protected eventEmitter: EventEmitter;
  protected sentEventFactory: EventsSent;
  protected logger: Logger;
  private receivedEventFactory: EventsReceived;
  private websocket: WebSocket | undefined;
  private eventQueue: EventInterface[] = [];
  private registerInfo: Record<string, unknown> | undefined;
  private uuid: string | undefined;

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
   * gets called by the streamdeck plugin/propertyinspector register process
   * @param {string} inActionInfo only used by the pi-reigster process (json-encoded)
   */
  public abstract connectElgatoStreamDeckSocket(
    inPort: string,
    inPluginUUID: string,
    inRegisterEvent: string,
    inInfo: string,
    inActionInfo?: string,
  ): void;

  /**
   * Returns the info-object that we got from the streamdeck with the registration
   */
  public get info(): Record<string, unknown> {
    return this.registerInfo || {};
  }

  /**
   * Returns the uuid for the plugin, which we got while registering with the streamdeck
   */
  public get pluginUUID(): string | undefined {
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
    inActionInfo?: string,
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
   * Requests the globally persisted settings
   *
   * Triggers the didReceiveGlobalSettings event
   *
   * @param {string} context The context / id of the current action / button
   */
  public getGlobalSettings(context: string): void {
    this.sendToStreamdeck(this.sentEventFactory.getGlobalSettings(context));
  }

  /**
   * Requests the settings stored for the button instance
   *
   * Triggers the didReceiveSettings event
   *
   * @param {string} context The context / id of the current action / button
   */
  public getSettings(context: string): void {
    this.sendToStreamdeck(this.sentEventFactory.getSettings(context));
  }

  /**
   * Persists the data globally (not just for the current button)
   *
   * Triggers the didReceiveGlobalSettings event for the plugin (if sent by pi) and for the pi (if sent by plugin)
   *
   * @param context – The context / id of the current action / button
   * @param settings – Whatever data you want to save
   */
  public setGlobalSettings(context: string, settings: unknown): void {
    this.sendToStreamdeck(this.sentEventFactory.setGlobalSettings(context, settings));
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
    if (this.websocket === undefined) {
      this.logger.debug('queueing event', event, JSON.stringify(event));
      this.eventQueue.push(event);
    } else {
      this.logger.info('sending event', event, JSON.stringify(event));
      this.websocket.send(JSON.stringify(event));
    }
  }

  protected registerStreamdeck(inPort: string, inPluginUUID: string, inRegisterEvent: string, inInfo: string): void {
    try {
      this.registerInfo = JSON.parse(inInfo);
    } catch (error) {
      this.logger.error(error);
    }
    this.uuid = inPluginUUID;
    this.websocket = new WebSocket('ws://127.0.0.1:' + inPort);
    this.websocket.addEventListener('open', () => {
      this.sendToStreamdeck(this.sentEventFactory.register(inRegisterEvent, inPluginUUID));
      this.eventEmitter.emit('websocketOpen', new OnWebsocketOpenEvent(inPluginUUID, inInfo));
      this.eventQueue.map((event) => this.sendToStreamdeck(event));
      this.eventQueue = [];
    });
    this.websocket.addEventListener('message', this.onMessage.bind(this));
  }

  private onMessage(messageEvent: MessageEvent): void {
    try {
      const event = this.createByMessageEvent(messageEvent);
      this.logger.debug('emitting event', event.event);
      this.eventEmitter.emit(event.event, event);
    } catch (error) {
      this.logger.error(error);
    }
  }

  private createByMessageEvent(
    messageEvent: MessageEvent,
  ): ReceivedPluginEventTypes | ReceivedPropertyInspectorEventTypes {
    this.logger.debug('got message', messageEvent);
    let data;

    try {
      data = JSON.parse(messageEvent.data.toString());
    } catch (error) {
      if (error instanceof Error) {
        throw new JsonParseError('error on parsing json: ' + error.toString());
      }
    }
    this.logger.debug('event data:', data);
    return this.receivedEventFactory.createFromPayload(data);
  }
}
