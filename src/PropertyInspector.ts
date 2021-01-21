import AbstractStreamdeckConnector from "./AbstractStreamdeckConnector";
import {
  DidReceiveGlobalSettingsEvent,
  DidReceiveSettingsEvent,
  IncomingEventsEnum,
  OnWebsocketOpenEvent
} from "./events/incoming";
import { IncomingPropertyinspectorEventsEnum, SendToPropertyInspectorEvent } from "./events/incoming/propertyinspector";
import { GetSettingsEvent, LogMessageEvent, SetSettingsEvent } from "./events/outgoing";
import { SendToPluginEvent } from "./events/outgoing/propertyinspector";

// @formatter:off
type EventType<T> =
  T extends IncomingEventsEnum.OnWebsocketOpen ? OnWebsocketOpenEvent :
  T extends IncomingEventsEnum.DidReceiveSettings ? DidReceiveSettingsEvent :
  T extends IncomingEventsEnum.DidReceiveGlobalSettings ? DidReceiveGlobalSettingsEvent :
  T extends IncomingPropertyinspectorEventsEnum.SendToPropertyInspector ? SendToPropertyInspectorEvent :
  never;
// @formatter:on

type IncomingEvents = IncomingEventsEnum | IncomingPropertyinspectorEventsEnum;
type OutgoingEvents = LogMessageEvent | SendToPluginEvent | GetSettingsEvent | SetSettingsEvent;

export default class PropertyInspector extends AbstractStreamdeckConnector {
  /**
   * registers the eventlistener to the events the streamdeck sends to us
   */
  public on<T extends IncomingEvents>(eventType: T, callback: (event: EventType<T>) => void): void {
    this.eventEmitter.on(eventType, callback);
  }

  public sendEvent(event: OutgoingEvents) {
    this.sendToStreamdeck(event);
  }
};
