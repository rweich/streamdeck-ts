import AbstractStreamdeckConnector from "./AbstractStreamdeckConnector";
import DidReceiveGlobalSettingsEvent from "./events/incoming/DidReceiveGlobalSettingsEvent";
import DidReceiveSettingsEvent from "./events/incoming/DidReceiveSettingsEvent";
import { IncomingEventsEnum } from "./events/incoming/IncomingEventsEnum";
import OnWebsocketOpenEvent from "./events/incoming/OnWebsocketOpenEvent";
import { IncomingPropertyinspectorEventsEnum } from "./events/incoming/propertyinspector/IncomingPropertyinspectorEventsEnum";
import SendToPropertyInspectorEvent from "./events/incoming/propertyinspector/SendToPropertyInspectorEvent";
import GetSettingsEvent from "./events/outgoing/GetSettingsEvent";
import LogMessageEvent from "./events/outgoing/LogMessageEvent";
import SendToPluginEvent from "./events/outgoing/propertyinspector/SendToPluginEvent";
import SetSettingsEvent from "./events/outgoing/SetSettingsEvent";

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
