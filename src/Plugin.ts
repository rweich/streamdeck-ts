import AbstractStreamdeckConnector from './AbstractStreamdeckConnector';
import {
  DidReceiveGlobalSettingsEvent,
  DidReceiveSettingsEvent,
  IncomingEvents,
  OnWebsocketOpenEvent,
} from './events/incoming';
import {
  DeviceDidConnectEvent,
  DeviceDidDisconnectEvent,
  IncomingPluginEvents,
  KeyDownEvent,
  KeyUpEvent,
  SendToPluginIncomingEvent,
  TitleParametersDidChangeEvent,
  WillAppearEvent,
  WillDisappearEvent,
} from './events/incoming/plugin';
import { GetSettingsEvent, LogMessageEvent, OpenUrlEvent, SetSettingsEvent } from './events/outgoing';
import { SetImageEvent, SetTitleEvent } from './events/outgoing/plugin';

/* @formatter:off */
/* eslint-disable */
type EventType<T> = T extends IncomingEvents.OnWebsocketOpen
  ? OnWebsocketOpenEvent
  : T extends IncomingEvents.DidReceiveSettings
  ? DidReceiveSettingsEvent
  : T extends IncomingEvents.DidReceiveGlobalSettings
  ? DidReceiveGlobalSettingsEvent
  : T extends IncomingPluginEvents.DeviceDidConnect
  ? DeviceDidConnectEvent
  : T extends IncomingPluginEvents.DeviceDidDisconnect
  ? DeviceDidDisconnectEvent
  : T extends IncomingPluginEvents.KeyDown
  ? KeyDownEvent
  : T extends IncomingPluginEvents.KeyUp
  ? KeyUpEvent
  : T extends IncomingPluginEvents.SendToPlugin
  ? SendToPluginIncomingEvent
  : T extends IncomingPluginEvents.TitleParametersDidChange
  ? TitleParametersDidChangeEvent
  : T extends IncomingPluginEvents.WillAppear
  ? WillAppearEvent
  : T extends IncomingPluginEvents.WillDisappear
  ? WillDisappearEvent
  : never;
/* eslint-enable */
/* @formatter:on */

type AllowedIncomingEvents = IncomingEvents | IncomingPluginEvents;
type AllowedOutgoingEvents =
  | LogMessageEvent
  | GetSettingsEvent
  | SetSettingsEvent
  | OpenUrlEvent
  | SetTitleEvent
  | SetImageEvent;

export default class Plugin extends AbstractStreamdeckConnector {
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
