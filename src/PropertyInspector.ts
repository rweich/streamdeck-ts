import AbstractStreamdeckConnector from './AbstractStreamdeckConnector';
import {
  DidReceiveGlobalSettingsEvent,
  DidReceiveSettingsEvent,
  IncomingEvents,
  OnWebsocketOpenEvent,
} from './events/incoming';
import {
  IncomingPropertyinspectorEvents,
  SendToPropertyInspectorIncomingEvent,
} from './events/incoming/propertyinspector';
import { GetSettingsEvent, LogMessageEvent, OpenUrlEvent, SetSettingsEvent } from './events/outgoing';
import { SendToPluginEvent } from './events/outgoing/propertyinspector';

/* @formatter:off */
/* eslint-disable */
/** @deprecated Use PiListenerTypes (will be removed with 2.x) */
type EventType<T> = T extends IncomingEvents.OnWebsocketOpen
  ? OnWebsocketOpenEvent
  : T extends IncomingEvents.DidReceiveSettings
  ? DidReceiveSettingsEvent
  : T extends IncomingEvents.DidReceiveGlobalSettings
  ? DidReceiveGlobalSettingsEvent
  : T extends IncomingPropertyinspectorEvents.SendToPropertyInspector
  ? SendToPropertyInspectorIncomingEvent
  : never;
/* eslint-enable */
// @formatter:on

/** @deprecated Use PiListenerTypes (will be removed with 2.x) */
type AllowedIncomingEvents = IncomingEvents | IncomingPropertyinspectorEvents;
type AllowedOutgoingEvents = LogMessageEvent | SendToPluginEvent | GetSettingsEvent | SetSettingsEvent | OpenUrlEvent;

type PiEventListenerMap = {
  didReceiveGlobalSettings: DidReceiveGlobalSettingsEvent;
  didReceiveSettings: DidReceiveSettingsEvent;
  sendToPropertyInspector: SendToPropertyInspectorIncomingEvent;
  websocketOpen: OnWebsocketOpenEvent;
};

export default class PropertyInspector extends AbstractStreamdeckConnector {
  /** registers the eventlistener to the events the streamdeck sends to us */
  public on<T extends keyof PiEventListenerMap>(eventType: T, callback: (event: PiEventListenerMap[T]) => void): void;
  public on<T extends AllowedIncomingEvents>(eventType: T, callback: (event: EventType<T>) => void): void;
  public on<T extends AllowedIncomingEvents>(eventType: T, callback: (event: EventType<T>) => void): void {
    this.eventEmitter.on(eventType, callback);
  }

  public sendEvent(event: AllowedOutgoingEvents): void {
    this.sendToStreamdeck(event);
  }
}
