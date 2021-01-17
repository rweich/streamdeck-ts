import AbstractStreamdeckConnector from "./AbstractStreamdeckConnector";
import DidReceiveGlobalSettingsEvent from "./events/incoming/DidReceiveGlobalSettingsEvent";
import DidReceiveSettingsEvent from "./events/incoming/DidReceiveSettingsEvent";
import { IncomingEventsEnum } from "./events/incoming/IncomingEventsEnum";
import OnWebsocketOpenEvent from "./events/incoming/OnWebsocketOpenEvent";
import DeviceDidConnectEvent from "./events/incoming/plugin/DeviceDidConnectEvent";
import DeviceDidDisconnectEvent from "./events/incoming/plugin/DeviceDidDisconnectEvent";
import { IncomingPluginEventsEnum } from "./events/incoming/plugin/IncomingPluginEventsEnum";
import KeyDownEvent from "./events/incoming/plugin/KeyDownEvent";
import KeyUpEvent from "./events/incoming/plugin/KeyUpEvent";
import SendToPluginEvent from "./events/incoming/plugin/SendToPluginEvent";
import TitleParametersDidChangeEvent from "./events/incoming/plugin/TitleParametersDidChangeEvent";
import WillAppearEvent from "./events/incoming/plugin/WillAppearEvent";
import WillDisappearEvent from "./events/incoming/plugin/WillDisappearEvent";
import GetSettingsEvent from "./events/outgoing/GetSettingsEvent";
import LogMessageEvent from "./events/outgoing/LogMessageEvent";
import SetSettingsEvent from "./events/outgoing/SetSettingsEvent";

// @formatter:off
type EventType<T> =
  T extends IncomingEventsEnum.OnWebsocketOpen ? OnWebsocketOpenEvent :
  T extends IncomingEventsEnum.DidReceiveSettings ? DidReceiveSettingsEvent :
  T extends IncomingEventsEnum.DidReceiveGlobalSettings ? DidReceiveGlobalSettingsEvent :
  T extends IncomingPluginEventsEnum.DeviceDidConnect ? DeviceDidConnectEvent :
  T extends IncomingPluginEventsEnum.DeviceDidDisconnect ? DeviceDidDisconnectEvent :
  T extends IncomingPluginEventsEnum.KeyDown ? KeyDownEvent :
  T extends IncomingPluginEventsEnum.KeyUp ? KeyUpEvent :
  T extends IncomingPluginEventsEnum.SendToPlugin ? SendToPluginEvent :
  T extends IncomingPluginEventsEnum.TitleParametersDidChange ? TitleParametersDidChangeEvent :
  T extends IncomingPluginEventsEnum.WillAppear ? WillAppearEvent :
  T extends IncomingPluginEventsEnum.WillDisappear ? WillDisappearEvent :
  never;
// @formatter:on

type IncomingEvents = IncomingEventsEnum | IncomingPluginEventsEnum;
type OutgoingEvents = LogMessageEvent | GetSettingsEvent | SetSettingsEvent;

export default class Plugin extends AbstractStreamdeckConnector {
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
