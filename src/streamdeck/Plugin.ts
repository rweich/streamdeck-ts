import AbstractStreamdeckConnector from "./AbstractStreamdeckConnector";
import DeviceDidConnectEvent from "./events/incoming/plugin/DeviceDidConnectEvent";
import DeviceDidDisconnectEvent from "./events/incoming/plugin/DeviceDidDisconnectEvent";
import { IncomingPluginEventsEnum } from "./events/incoming/plugin/IncomingPluginEventsEnum";
import KeyDownEvent from "./events/incoming/plugin/KeyDownEvent";
import KeyUpEvent from "./events/incoming/plugin/KeyUpEvent";
import TitleParametersDidChangeEvent from "./events/incoming/plugin/TitleParametersDidChangeEvent";
import WillAppearEvent from "./events/incoming/plugin/WillAppearEvent";
import WillDisappearEvent from "./events/incoming/plugin/WillDisappearEvent";
import SetTitleEvent from "./events/outgoing/plugin/SetTitleEvent";

// @formatter:off
type EventType<T> =
  T extends IncomingPluginEventsEnum.DeviceDidConnect ? DeviceDidConnectEvent :
  T extends IncomingPluginEventsEnum.DeviceDidDisconnect ? DeviceDidDisconnectEvent :
  T extends IncomingPluginEventsEnum.KeyDown ? KeyDownEvent :
  T extends IncomingPluginEventsEnum.KeyUp ? KeyUpEvent :
  T extends IncomingPluginEventsEnum.TitleParametersDidChange ? TitleParametersDidChangeEvent :
  T extends IncomingPluginEventsEnum.WillAppear ? WillAppearEvent :
  T extends IncomingPluginEventsEnum.WillDisappear ? WillDisappearEvent :
  never;
// @formatter:on

export default class Plugin extends AbstractStreamdeckConnector {
  /**
   * registers the eventlistener to the events the streamdeck sends to us
   */
  public on<T extends IncomingPluginEventsEnum>(eventType: T, callback: (event: EventType<T>) => void): void {
    this.eventEmitter.on(eventType, callback);
  }

  public sendEvent(event: SetTitleEvent) {
    this.sendToStreamdeck(event);
  }
};
