import EventEmitter from "eventemitter3";
import WebSocket, { MessageEvent } from "isomorphic-ws";
import { Logger } from "ts-log";
import EventFactory from "./events/incoming/EventFactory";
import EventInterface from "./events/outgoing/EventInterface";
import RegisterEvent from "./events/outgoing/RegisterEvent";

type SendToStremdeckEvent = EventInterface | RegisterEvent;

export default class AbstractStreamdeckConnector {
  protected eventEmitter: EventEmitter;
  private eventFactory: EventFactory;
  private logger: Logger;
  private websocket: WebSocket | null = null;
  private eventQueue: SendToStremdeckEvent[] = [];

  public constructor(eventEmitter: EventEmitter, eventFactory: EventFactory, logger: Logger) {
    this.eventEmitter = eventEmitter;
    this.eventFactory = eventFactory;
    this.logger = logger;
  }

  /**
   * returns the function the streamdeck uses as main entry point to register this plugin
   * @see https://developer.elgato.com/documentation/stream-deck/sdk/registration-procedure/
   */
  public createStreamdeckConnector() {
    return this.connectElgatoStreamDeckSocket.bind(this);
  }

  /**
   * sends the event to the streamdeck
   */
  protected sendToStreamdeck(event: SendToStremdeckEvent): void {
    if (this.websocket === null) {
      this.logger.debug("queueing event", event, JSON.stringify(event));
      this.eventQueue.push(event);
    } else {
      this.logger.info("sending event", event, JSON.stringify(event));
      this.websocket.send(JSON.stringify(event));
    }
  }

  private connectElgatoStreamDeckSocket(inPort: string, inPluginUUID: string, inRegisterEvent: string, inInfo: string) {
    this.websocket = new WebSocket("ws://127.0.0.1:" + inPort);
    this.websocket.onopen = () => {
      this.sendToStreamdeck(new RegisterEvent(inRegisterEvent, inPluginUUID));
      this.eventQueue.map(event => this.sendToStreamdeck(event));
      this.eventQueue = [];
    };
    this.websocket.onmessage = this.onMessage.bind(this);
  }

  private onMessage(messageEvent: MessageEvent): void {
    try {
      let event = this.eventFactory.createByMessageEvent(messageEvent);
      this.eventEmitter.emit(event.event, event);
    } catch (e) {
      this.logger.error(e);
    }
  }
};
