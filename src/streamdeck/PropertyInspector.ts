import AbstractStreamdeckConnector from "./AbstractStreamdeckConnector";
import DidReceiveGlobalSettingsEvent from "./events/incoming/DidReceiveGlobalSettingsEvent";
import DidReceiveSettingsEvent from "./events/incoming/DidReceiveSettingsEvent";
import { IncomingEventsEnum } from "./events/incoming/IncomingEventsEnum";
import { IncomingPropertyinspectorEventsEnum } from "./events/incoming/propertyinspector/IncomingPropertyinspectorEventsEnum";
import SendToPropertyInspectorEvent from "./events/incoming/propertyinspector/SendToPropertyInspectorEvent";
import LogMessageEvent from "./events/outgoing/LogMessageEvent";

// @formatter:off
type EventType<T> =
  T extends IncomingEventsEnum.DidReceiveSettings ? DidReceiveSettingsEvent :
  T extends IncomingEventsEnum.DidReceiveGlobalSettings ? DidReceiveGlobalSettingsEvent :
  T extends IncomingPropertyinspectorEventsEnum.SendToPropertyInspector ? SendToPropertyInspectorEvent :
  never;
// @formatter:on

export default class PropertyInspector extends AbstractStreamdeckConnector {
  /**
   * registers the eventlistener to the events the streamdeck sends to us
   */
  public on<T extends IncomingEventsEnum | IncomingPropertyinspectorEventsEnum>(eventType: T, callback: (event: EventType<T>) => void): void {
    this.eventEmitter.on(eventType, callback);
  }

  public sendEvent(event: LogMessageEvent) {
    this.sendToStreamdeck(event);
  }
};
