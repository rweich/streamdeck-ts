import AbstractStreamdeckConnector from './AbstractStreamdeckConnector';
import {
  DidReceiveGlobalSettingsEvent,
  DidReceiveSettingsEvent,
  IncomingEvents,
  OnWebsocketOpenEvent,
} from './events/incoming';
import { IncomingPropertyinspectorEvents, SendToPropertyInspectorEvent } from './events/incoming/propertyinspector';
import { GetSettingsEvent, LogMessageEvent, SetSettingsEvent } from './events/outgoing';
import { SendToPluginEvent } from './events/outgoing/propertyinspector';

/* @formatter:off */
/* eslint-disable */
type EventType<T> =
  T extends IncomingEvents.OnWebsocketOpen ? OnWebsocketOpenEvent :
  T extends IncomingEvents.DidReceiveSettings ? DidReceiveSettingsEvent :
  T extends IncomingEvents.DidReceiveGlobalSettings ? DidReceiveGlobalSettingsEvent :
  T extends IncomingPropertyinspectorEvents.SendToPropertyInspector ? SendToPropertyInspectorEvent :
  never;
/* eslint-enable */
// @formatter:on

type AllowedIncomingEvents = IncomingEvents | IncomingPropertyinspectorEvents;
type AllowedOutgoingEvents = LogMessageEvent | SendToPluginEvent | GetSettingsEvent | SetSettingsEvent;

export default class PropertyInspector extends AbstractStreamdeckConnector {
  /**
   * registers the eventlistener to the events the streamdeck sends to us
   */
  public on<T extends AllowedIncomingEvents>(eventType: T, callback: (event: EventType<T>) => void): void {
    this.eventEmitter.on(eventType, callback);
  }

  public sendEvent(event: AllowedOutgoingEvents): void {
    this.sendToStreamdeck(event);
  }
}
