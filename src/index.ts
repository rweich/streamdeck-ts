export * from './events/outgoing';
export * from './events/outgoing/plugin';
export * from './events/outgoing/propertyinspector';
export { assertType, DeviceType, Plugin, PropertyInspector, Streamdeck };
export { DidReceiveSettingsEvent, OnWebsocketOpenEvent, DidReceiveGlobalSettingsEvent, IncomingEvents };
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
export { IncomingPropertyinspectorEvents, SendToPropertyInspectorIncomingEvent };

import {
  assertType,
  DidReceiveGlobalSettingsEvent as DepDidReceiveGlobalSettingsEvent,
  DidReceiveSettingsEvent as DepDidReceiveSettingsEvent,
  IncomingEvents,
  OnWebsocketOpenEvent as DepOnWebsocketOpenEvent,
} from './events/incoming';
import {
  ApplicationDidLaunchEvent as DepApplicationDidLaunchEvent,
  ApplicationDidTerminateEvent as DepApplicationDidTerminateEvent,
  DeviceDidConnectEvent as DepDeviceDidConnectEvent,
  DeviceDidDisconnectEvent as DepDeviceDidDisconnectEvent,
  DeviceType,
  IncomingPluginEvents,
  KeyDownEvent as DepKeyDownEvent,
  KeyUpEvent as DepKeyUpEvent,
  PropertyInspectorDidAppearEvent as DepPropertyInspectorDidAppearEvent,
  PropertyInspectorDidDisappearEvent as DepPropertyInspectorDidDisappearEvent,
  SendToPluginIncomingEvent as DepSendToPluginIncomingEvent,
  TitleParametersDidChangeEvent as DepTitleParametersDidChangeEvent,
  WillAppearEvent as DepWillAppearEvent,
  WillDisappearEvent as DepWillDisappearEvent,
} from './events/incoming/plugin';
import {
  IncomingPropertyinspectorEvents,
  SendToPropertyInspectorIncomingEvent as DepSendToPropertyInspectorIncomingEvent,
} from './events/incoming/propertyinspector';
import Plugin from './Plugin';
import PropertyInspector from './PropertyInspector';
import Streamdeck from './Streamdeck';

/** @deprecated internal use only - will be removed with 2.x */
const DidReceiveSettingsEvent = DepDidReceiveSettingsEvent;
/** @deprecated internal use only - will be removed with 2.x */
const OnWebsocketOpenEvent = DepOnWebsocketOpenEvent;
/** @deprecated internal use only - will be removed with 2.x */
const DidReceiveGlobalSettingsEvent = DepDidReceiveGlobalSettingsEvent;

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

/** @deprecated internal use only - will be removed with 2.x */
const SendToPropertyInspectorIncomingEvent = DepSendToPropertyInspectorIncomingEvent;
