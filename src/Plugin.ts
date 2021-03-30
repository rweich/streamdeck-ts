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
import { SendToPropertyInspectorEvent, SetImageEvent, SetTitleEvent, TargetEnum } from './events/outgoing/plugin';

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

  /** @deprecated - use the other methods in here directly - will be removed with 2.x */
  public sendEvent(event: AllowedOutgoingEvents): void {
    this.sendToStreamdeck(event);
  }

  /**
   * Sends data to the propertyinspector
   * @param {string} context The context / id of the current action / button
   * @param {Record<string, unknown>} payload Whatever data you want to send
   */
  public sendToPropertyInspector(context: string, payload: Record<string, unknown>): void {
    this.sendToStreamdeck(new SendToPropertyInspectorEvent('', context, payload));
  }

  /**
   * Changes the title of the button
   * @param {string} title The new title
   * @param {string} context The context / id of the current action / button
   * @param {object} options Optional params
   * @param {TargetEnum} options.target Set if only intended for a specified target
   * @param {number} options.state Set if only intended for one state of a multi-action button
   */
  public setTitle(title: string, context: string, options: { target?: TargetEnum; state?: number } = {}): void {
    this.sendToStreamdeck(new SetTitleEvent(title, context, options.target, options.state));
  }

  /**
   * Changes the image of the button
   * @param {string} image The new image as base64 encoded string
   * @param {string} context The context / id of the current action / button
   * @param {object} options Optional params
   * @param {TargetEnum} options.target Set if only intended for a specified target
   * @param {number} options.state Set if only intended for one state of a multi-action button
   */
  public setImage(image: string, context: string, options: { target?: TargetEnum; state?: number } = {}): void {
    this.sendToStreamdeck(new SetImageEvent(image, context, options.target, options.state));
  }
}
