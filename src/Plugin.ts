import AbstractStreamdeckConnector from './AbstractStreamdeckConnector';
import {
  DidReceiveGlobalSettingsEvent,
  DidReceiveSettingsEvent,
  IncomingEvents,
  OnWebsocketOpenEvent,
} from './events/incoming';
import {
  ApplicationDidLaunchEvent,
  ApplicationDidTerminateEvent,
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
import { SendToPropertyInspectorEvent, SetImageEvent, SetTitleEvent } from './events/outgoing/plugin';

/* @formatter:off */
/* eslint-disable */
/** @deprecated use the event-name-strings directly (will be removed with 2.x) */
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

/** @deprecated Use the event-name-strings directly (will be removed with 2.x) */
type AllowedIncomingEvents = IncomingEvents | IncomingPluginEvents;
type AllowedOutgoingEvents =
  | LogMessageEvent
  | GetSettingsEvent
  | SetSettingsEvent
  | OpenUrlEvent
  | SendToPropertyInspectorEvent
  | SetTitleEvent
  | SetImageEvent;

type PluginEventListenerMap = {
  applicationDidLaunch: ApplicationDidLaunchEvent;
  applicationDidTerminate: ApplicationDidTerminateEvent;
  deviceDidConnect: DeviceDidConnectEvent;
  deviceDidDisconnect: DeviceDidDisconnectEvent;
  didReceiveGlobalSettings: DidReceiveGlobalSettingsEvent;
  didReceiveSettings: DidReceiveSettingsEvent;
  keyDown: KeyDownEvent;
  keyUp: KeyUpEvent;
  propertyInspectorDidAppear: OnWebsocketOpenEvent;
  propertyInspectorDidDisappear: OnWebsocketOpenEvent;
  sendToPlugin: SendToPluginIncomingEvent;
  titleParametersDidChange: TitleParametersDidChangeEvent;
  websocketOpen: OnWebsocketOpenEvent;
  willAppear: WillAppearEvent;
  willDisappear: WillDisappearEvent;
};

export default class Plugin extends AbstractStreamdeckConnector {
  /** registers the eventlistener to the events the streamdeck sends to us */
  public on<T extends keyof PluginEventListenerMap>(
    eventType: T,
    callback: (event: PluginEventListenerMap[T]) => void,
  ): void;
  public on<T extends AllowedIncomingEvents>(eventType: T, callback: (event: EventType<T>) => void): void;
  public on<T extends AllowedIncomingEvents>(eventType: T, callback: (event: EventType<T>) => void): void {
    this.eventEmitter.on(eventType, callback);
  }

  public sendEvent(event: AllowedOutgoingEvents): void {
    this.sendToStreamdeck(event);
  }
}
