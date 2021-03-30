import EventEmitter from 'eventemitter3';
import WebSocket, { MessageEvent } from 'isomorphic-ws';
import { Logger } from 'ts-log';
import { IncomingEvents, OnWebsocketOpenEvent } from './events/incoming';
import EventFactory from './events/incoming/EventFactory';
import { GetSettingsEvent, LogMessageEvent, OpenUrlEvent, RegisterEvent, SetSettingsEvent } from './events/outgoing';
import EventInterface from './events/outgoing/EventInterface';

// TODO: add types to the eventemitter

export default class AbstractStreamdeckConnector {
  protected eventEmitter: EventEmitter;
  private eventFactory: EventFactory;
  private logger: Logger;
  private websocket: WebSocket | null = null;
  private eventQueue: EventInterface[] = [];
  private actionInfo: Record<string, unknown> | null = null;
  private uuid: string | null = null;

  public constructor(eventEmitter: EventEmitter, eventFactory: EventFactory, logger: Logger) {
    this.eventEmitter = eventEmitter;
    this.eventFactory = eventFactory;
    this.logger = logger;
  }

  /**
   * Returns the context for the plugin, which we got while registering with the streamdeck
   * TODO: test (shouldnt we only have one instance?)
   */
  public get context(): string | null {
    return this.uuid;
  }

  // seems to be only set on plugins that 'support' multiactions
  public get action(): string | null {
    if (this.actionInfo !== null && 'action' in this.actionInfo) {
      return (this.actionInfo as { action: string }).action;
    }
    return null;
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
    this.sendToStreamdeck(new LogMessageEvent(message));
  }

  /**
   * Requests the settings stored for the button instance
   *
   * @param {string} context The context / id of the current action / button
   */
  public getSettings(context: string): void {
    this.sendToStreamdeck(new GetSettingsEvent(context));
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
    this.sendToStreamdeck(new SetSettingsEvent(context, settings));
  }

  /**
   * Makes the streamdeck open the url in a browser.
   */
  public openUrl(url: string): void {
    this.sendToStreamdeck(new OpenUrlEvent(url));
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
      this.sendToStreamdeck(new RegisterEvent(inRegisterEvent, inPluginUUID));
      // TODO: remove with 2.x
      this.eventEmitter.emit(IncomingEvents.OnWebsocketOpen, new OnWebsocketOpenEvent(inPluginUUID, inInfo));
      this.eventEmitter.emit('websocketOpen', new OnWebsocketOpenEvent(inPluginUUID, inInfo));
      this.eventQueue.map((event) => this.sendToStreamdeck(event));
      this.eventQueue = [];
    };
    this.websocket.onmessage = this.onMessage.bind(this);
  }

  private onMessage(messageEvent: MessageEvent): void {
    try {
      const event = this.eventFactory.createByMessageEvent(messageEvent);
      this.logger.debug('emitting event', event.event);
      this.eventEmitter.emit(event.event, event);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
