// organize-imports-ignore - remove ignore with 2.x
export * from './events/outgoing';
export * from './events/outgoing/plugin';
export * from './events/outgoing/propertyinspector';

import { assertType } from './events/incoming';
import { DeviceType } from './events/incoming/plugin';
import Plugin from './Plugin';
import PropertyInspector from './PropertyInspector';
import Streamdeck from './Streamdeck';

export { assertType, DeviceType, Plugin, PropertyInspector, Streamdeck };

//
// deprecated stuff below (remove with 2.x)
//

import {
  DidReceiveSettingsEvent as DepDidReceiveSettingsEvent,
  IncomingEvents,
  OnWebsocketOpenEvent as DepOnWebsocketOpenEvent,
  DidReceiveGlobalSettingsEvent as DepDidReceiveGlobalSettingsEvent,
} from './events/incoming';
/** @deprecated internal use only - will be removed with 2.x */
const DidReceiveSettingsEvent = DepDidReceiveSettingsEvent;
/** @deprecated internal use only - will be removed with 2.x */
const OnWebsocketOpenEvent = DepOnWebsocketOpenEvent;
/** @deprecated internal use only - will be removed with 2.x */
const DidReceiveGlobalSettingsEvent = DepDidReceiveGlobalSettingsEvent;
export { DidReceiveSettingsEvent, OnWebsocketOpenEvent, DidReceiveGlobalSettingsEvent, IncomingEvents };

import {
  ApplicationDidTerminateEvent as DepApplicationDidTerminateEvent,
  ApplicationDidLaunchEvent as DepApplicationDidLaunchEvent,
  KeyDownEvent as DepKeyDownEvent,
  KeyUpEvent as DepKeyUpEvent,
  WillAppearEvent as DepWillAppearEvent,
  PropertyInspectorDidDisappearEvent as DepPropertyInspectorDidDisappearEvent,
  PropertyInspectorDidAppearEvent as DepPropertyInspectorDidAppearEvent,
  WillDisappearEvent as DepWillDisappearEvent,
  TitleParametersDidChangeEvent as DepTitleParametersDidChangeEvent,
  DeviceDidDisconnectEvent as DepDeviceDidDisconnectEvent,
  DeviceDidConnectEvent as DepDeviceDidConnectEvent,
  SendToPluginIncomingEvent as DepSendToPluginIncomingEvent,
  IncomingPluginEvents,
} from './events/incoming/plugin';
/** @deprecated internal use only - will be removed with 2.x */
const ApplicationDidTerminateEvent = DepApplicationDidTerminateEvent;
/** @deprecated internal use only - will be removed with 2.x */
const ApplicationDidLaunchEvent = DepApplicationDidLaunchEvent;
/** @deprecated internal use only - will be removed with 2.x */
const KeyDownEvent = DepKeyDownEvent;
/** @deprecated internal use only - will be removed with 2.x */
const KeyUpEvent = DepKeyUpEvent;
/** @deprecated internal use only - will be removed with 2.x */
const WillAppearEvent = DepWillAppearEvent;
/** @deprecated internal use only - will be removed with 2.x */
const PropertyInspectorDidDisappearEvent = DepPropertyInspectorDidDisappearEvent;
/** @deprecated internal use only - will be removed with 2.x */
const PropertyInspectorDidAppearEvent = DepPropertyInspectorDidAppearEvent;
/** @deprecated internal use only - will be removed with 2.x */
const WillDisappearEvent = DepWillDisappearEvent;
/** @deprecated internal use only - will be removed with 2.x */
const TitleParametersDidChangeEvent = DepTitleParametersDidChangeEvent;
/** @deprecated internal use only - will be removed with 2.x */
const DeviceDidDisconnectEvent = DepDeviceDidDisconnectEvent;
/** @deprecated internal use only - will be removed with 2.x */
const DeviceDidConnectEvent = DepDeviceDidConnectEvent;
/** @deprecated internal use only - will be removed with 2.x */
const SendToPluginIncomingEvent = DepSendToPluginIncomingEvent;
export {
  ApplicationDidTerminateEvent,
  ApplicationDidLaunchEvent,
  KeyDownEvent,
  KeyUpEvent,
  WillAppearEvent,
  PropertyInspectorDidDisappearEvent,
  PropertyInspectorDidAppearEvent,
  WillDisappearEvent,
  TitleParametersDidChangeEvent,
  DeviceDidDisconnectEvent,
  DeviceDidConnectEvent,
  SendToPluginIncomingEvent,
  IncomingPluginEvents,
};

import {
  IncomingPropertyinspectorEvents,
  SendToPropertyInspectorIncomingEvent as DepSendToPropertyInspectorIncomingEvent,
} from './events/incoming/propertyinspector';
/** @deprecated internal use only - will be removed with 2.x */
const SendToPropertyInspectorIncomingEvent = DepSendToPropertyInspectorIncomingEvent;
export { IncomingPropertyinspectorEvents, SendToPropertyInspectorIncomingEvent };
