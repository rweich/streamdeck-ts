import AbstractStreamdeckConnector from "./AbstractStreamdeckConnector";
import {
  DidReceiveGlobalSettingsEvent,
  DidReceiveSettingsEvent,
  IncomingEventsEnum,
  OnWebsocketOpenEvent
} from "./events/incoming";
import {
  DeviceDidConnectEvent,
  DeviceDidDisconnectEvent,
  IncomingPluginEventsEnum,
  KeyDownEvent,
  KeyUpEvent,
  SendToPluginIncomingEvent,
  TitleParametersDidChangeEvent,
  WillAppearEvent,
  WillDisappearEvent
} from "./events/incoming/plugin";
import { GetSettingsEvent, LogMessageEvent, SetSettingsEvent } from "./events/outgoing";

// @formatter:off
type EventType<T> =
  T extends IncomingEventsEnum.OnWebsocketOpen ? OnWebsocketOpenEvent :
  T extends IncomingEventsEnum.DidReceiveSettings ? DidReceiveSettingsEvent :
  T extends IncomingEventsEnum.DidReceiveGlobalSettings ? DidReceiveGlobalSettingsEvent :
  T extends IncomingPluginEventsEnum.DeviceDidConnect ? DeviceDidConnectEvent :
  T extends IncomingPluginEventsEnum.DeviceDidDisconnect ? DeviceDidDisconnectEvent :
  T extends IncomingPluginEventsEnum.KeyDown ? KeyDownEvent :
  T extends IncomingPluginEventsEnum.KeyUp ? KeyUpEvent :
  T extends IncomingPluginEventsEnum.SendToPlugin ? SendToPluginIncomingEvent :
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
