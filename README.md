# streamdeck-ts

![Build/Test](https://github.com/rweich/streamdeck-ts/workflows/Build%2FTest/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/rweich/streamdeck-ts/badge.svg?branch=main)](https://coveralls.io/github/rweich/streamdeck-ts?branch=main)

A sdk to create streamdeck plugins in typescript.

# Events

## Incoming events

The plugin or propertyinpector can listen to the following events
based on the type as seen in [IncomingEventsEnum](src/events/incoming/IncomingEvents.ts),
[IncomingPluginEventsEnum](src/events/incoming/plugin/IncomingPluginEvents.ts)
and [IncomingPropertyinspectorEventsEnum](src/events/incoming/propertyinspector/IncomingPropertyinspectorEvents.ts).

| Type to bind | Received event | Plugin event | Propertyinspector event |
| --- | --- | --- | --- |
| ApplicationDidLaunch | [ApplicationDidLaunchEvent](src/events/incoming/plugin/ApplicationDidLaunchEvent.ts) | X | |
| ApplicationDidTerminate | [ApplicationDidTerminateEvent](src/events/incoming/plugin/ApplicationDidTerminateEvent.ts) | X | |
| DeviceDidConnectEvent | [DeviceDidConnectEvent](src/events/incoming/plugin/DeviceDidConnectEvent.ts) | X | |
| DeviceDidDisconnectEvent | [DeviceDidDisconnectEvent](src/events/incoming/plugin/DeviceDidDisconnectEvent.ts) | X | |
| DidReceiveGlobalSettings | [DidReceiveGlobalSettingsEvent](src/events/incoming/DidReceiveGlobalSettingsEvent.ts) | X | X |
| DidReceiveSettings | [DidReceiveSettingsEvent](src/events/incoming/DidReceiveSettingsEvent.ts) | X | X |
| KeyDownEvent | [KeyDownEvent](src/events/incoming/plugin/KeyDownEvent.ts) | X | |
| KeyUpEvent | [KeyUpEvent](src/events/incoming/plugin/KeyUpEvent.ts) | X | |
| OnWebsocketOpen | [OnWebsocketOpenEvent](src/events/incoming/OnWebsocketOpenEvent.ts) | X | X |
| PropertyInspectorDidAppearEvent | [PropertyInspectorDidAppearEvent](src/events/incoming/plugin/PropertyInspectorDidAppearEvent.ts) | X | |
| PropertyInspectorDidDisappearEvent | [PropertyInspectorDidDisappearEvent](src/events/incoming/plugin/PropertyInspectorDidDisappearEvent.ts) | X | |
| SendToPluginEvent | [SendToPluginEvent](src/events/incoming/plugin/SendToPluginIncomingEvent.ts) | X | |
| SendToPropertyInspector | to be implemented | | X |
| SystemDidWakeUp | to be implemented | X | |
| TitleParametersDidChangeEvent | to be fully implemented | X | |
| WillAppearEvent | [WillAppearEvent](src/events/incoming/plugin/WillAppearEvent.ts) | X | |
| WillDisappearEvent | [WillDisappearEvent](src/events/incoming/plugin/WillDisappearEvent.ts) | X | |

### Example

Listening to keypresses on the streamdeck:

```typescript
const plugin = new Streamdeck().plugin();
plugin.on(IncomingPluginEventsEnum.KeyDown, event => {
  console.log(`key pressed on row ${event.row} and column ${event.column}`);
});
```

## Outgoing events

The plugin and propertyinspector can send the following events to the streamdeck:

| Event | Plugin event | Propertyinspector event |
| --- | --- | --- |
| [GetSettingsEvent](src/events/outgoing/GetSettingsEvent.ts) | X | X |
| [LogMessageEvent](src/events/outgoing/LogMessageEvent.ts) | X | X |
| [SendToPluginEvent](src/events/outgoing/propertyinspector/SendToPluginEvent.ts) | | X |
| [SetSettingsEvent](src/events/outgoing/SetSettingsEvent.ts) | X | X |
| [SetTitleEvent](src/events/outgoing/plugin/SetTitleEvent.ts) | X | |

### Example

Setting the title in the plugin:

```typescript
const plugin = new Streamdeck().plugin();
plugin.sendEvent(new SetTitleEvent('the new title', context));
```
