# Upgrading

This document provides guidance for upgrading between major versions of streamdeck-ts.

## From v5 to v6

No code changes.

The minimum required nodejs version is now v18.17.
## From v3 to v4

No code changes.

The minimum required nodejs version is now v14.17.

## From v2 to v3

The type of the row/column propperties in the payload for the `keyUp` / `keyDown`, `willAppear` / `willDisappear` and
`didReceiveSettings` events got changed from `number` to `number | undefined`!

Code using these properties might have to be adjusted accordingly.

## From v1 to v2

Most changes were made for ease of use by removing a lot of unnecessary imports (of classes and enums).

### Removed sendEvent methods and all the event classes

The all-in-one sendEvent methods were replaced by single methods for each event. Thus, explicitely creating the event classes is no longer necessary.

The payload params or order have changed for some methods! See the according part of the readme for details.

before:

```typescript
plugin.sendEvent(new SetTitleEvent('the new title', context));
```

after:

```typescript
plugin.setTitle('the new title', context);
```

### Removed Event-Enums from the on()-methods

When registering event listeners, now use the event names directly instead of the Enums:

before:

```typescript
plugin.on(IncomingPluginEventsEnum.KeyDown, event => {
  console.log(`key pressed on row ${event.row} and column ${event.column}`);
});
```

after:

```typescript
plugin.on('keyDown', event => {
  console.log(`key pressed on row ${event.row} and column ${event.column}`);
});
```

### Removed TargetEnum for setImage / setTitle

The Enum was replaced by the target names (string).

before:

```typescript
plugin.sendEvent(new SetTitleEvent('the new title', context, TargetEnum.Both));
```

after:

```typescript
plugin.setTitle('the new title', context, { target: 'both' }); // or 'hardware' or 'software'
```

### Removed assertType and DeviceType exports

The **assertType** export was removed without replacemeht, as it's not in the scope of this package to offer that.
It can still be imported from the [streamdeck-events](https://github.com/rweich/streamdeck-events) package, but I suggest implementing that yourself.

The **DeviceType** export was removed from this package. It can now be imported from the [streamdeck-events](https://github.com/rweich/streamdeck-events) directly.
Alternatively the typeName property can be used:

before:

```typescript
plugin.on('deviceDidConnect', ({ type }) => {
  if (type === DeviceType.StreamDeckMini) {
    // do smth
  }
});
```

after:

```typescript
plugin.on('deviceDidConnect', ({ typeName }) => {
  if (typeName === 'StreamDeckMini') {
    // do smth
  }
});
```


### Replaced some plugin / pi properties

The following properties (on the Plugin **and** Propertyinspector classes) were changed:

- `plugin.context` -> replaced by `plugin.pluginUUID` (before: string|null; now: string|undefined)

- `plugin.action` -> replaced by `plugin.info`

- `plugin.pluginUUID` -> changed to return string|undefined instead of string|null
