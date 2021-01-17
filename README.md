# streamdeck-ts

A typed streamdeck sdk for typescript plugins.

# Events

## Incoming events

The plugin or propertyinpector can listen to the following events
based on the type as seen in [IncomingEventsEnum](src/events/incoming/IncomingEventsEnum.ts),
[IncomingPluginEventsEnum](src/events/incoming/plugin/IncomingPluginEventsEnum.ts)
and [IncomingPropertyinspectorEventsEnum](src/events/incoming/propertyinspector/IncomingPropertyinspectorEventsEnum.ts).

| Type to bind | Received event | Plugin event | Propertyinspector event |
| --- | --- | --- | --- |
| ApplicationDidLaunch | to be implemented | X | |
| ApplicationDidTerminate | to be implemented | X | |
| DeviceDidConnectEvent | [DeviceDidConnectEvent](src/events/incoming/plugin/DeviceDidConnectEvent.ts) | X | |
| DeviceDidDisconnectEvent | [DeviceDidDisconnectEvent](src/events/incoming/plugin/DeviceDidDisconnectEvent.ts) | X | |
| DidReceiveGlobalSettings | [DidReceiveGlobalSettingsEvent](src/events/incoming/DidReceiveGlobalSettingsEvent.ts) | X | X |
| DidReceiveSettings | [DidReceiveSettingsEvent](src/events/incoming/DidReceiveSettingsEvent.ts) | X | X |
| KeyDownEvent | [KeyDownEvent](src/events/incoming/plugin/KeyDownEvent.ts) | X | |
| KeyUpEvent | [KeyUpEvent](src/events/incoming/plugin/KeyUpEvent.ts) | X | |
| OnWebsocketOpen | [OnWebsocketOpenEvent](src/events/incoming/OnWebsocketOpenEvent.ts) | X | X |
| PropertyInspectorDidAppearEvent | [PropertyInspectorDidAppearEvent](src/events/incoming/plugin/PropertyInspectorDidAppearEvent.ts) | X | |
| PropertyInspectorDidDisappearEvent | [PropertyInspectorDidDisappearEvent](src/events/incoming/plugin/PropertyInspectorDidDisappearEvent.ts) | X | |
| SendToPluginEvent | [SendToPluginEvent](src/events/incoming/plugin/SendToPluginEvent.ts) | X | |
| SendToPropertyInspector | to be implemented | | X |
| SystemDidWakeUp | to be implemented | X | |
| TitleParametersDidChangeEvent | [TitleParametersDidChangeEvent](src/events/incoming/plugin/TitleParametersDidChangeEvent.ts) | X | |
| WillAppearEvent | [WillAppearEvent](src/events/incoming/plugin/WillAppearEvent.ts) | X | |
| WillDisappearEvent | [WillDisappearEvent](src/events/incoming/plugin/WillDisappearEvent.ts) | X | |

### Example

Listening to keypresses on the streamdeck:

```typescript
const plugin = new StreamdeckFactory().createPlugin();
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
const plugin = new StreamdeckFactory().createPlugin();
plugin.sendEvent(new SetTitleEvent('the new title', context));
```
