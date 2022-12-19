# streamdeck-ts

![Build/Test](https://github.com/rweich/streamdeck-ts/workflows/Build%2FTest/badge.svg)
[![codecov](https://codecov.io/gh/rweich/streamdeck-ts/branch/main/graph/badge.svg?token=PTXTTH18L2)](https://codecov.io/gh/rweich/streamdeck-ts)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Frweich%2Fstreamdeck-ts.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Frweich%2Fstreamdeck-ts?ref=badge_shield)

## About

A typescript sdk to create plugins for the elgato streamdeck.

The goal of this sdk is to make all the events (sent and received to / from the streamdeck) and their paylods typesafe.

**Features**:

- simple event interface
- working typehints and autocompletion for events and their payloads

## Quickstart

If you want to start writing your plugin right away you might want to look at the [streamdeck-ts-template](https://github.com/rweich/streamdeck-ts-template) package.

It will help you with:

- setting up this sdk
- configuring your plugins metadata
- bundling your code into the format the streamdeck needs
- creating a package for redistribution

## Upgrading guide

See [UPGRADE.md](./UPGRADE.md) for details about the upgrade process for new major versions.

## Example Implementations

- [numberdisplay](https://github.com/rweich/streamdeck-ts-numberdisplay) - the example numberdisplay plugin that comes with the streamdeck ported to use this sdk.
- [datetime](https://github.com/rweich/streamdeck-datetime) - shows the date and the time.

## Installation

```shell
yarn add @rweich/streamdeck-ts
```

or

```shell
npm install @rweich/streamdeck-ts
```

## Usage Example

```typescript
import { Streamdeck } from '@rweich/streamdeck-ts';

// Create plugin instance
const plugin = new Streamdeck().plugin();

// Add event listeners
plugin.on('keyDown', ({ row, column }) => {
  console.log(`key pressed on row ${row} and column ${column}`);
});

// Sending events:
// For some events you'll need to set a context (the "button-id").
// It's sent along most events received from the streamdeck.
plugin.on('willAppear', ({ context }) => {
  plugin.setTitle('new Title', context);
});
let keypresses = 0;
plugin.on('keyDown', ({ context }) => {
  plugin.setTitle(`key pressed ${++keypresses} times`, context);
});

// same for the property inspector
const pi = new Streamdeck().propertyinspector();
pi.on('didReceiveSettings', ({ settings }) => console.log('got settings', settings));
```

## Table of Contents

- [About](#about)
- [Quickstart](#quickstart)
- [Upgrading guide](#upgrading-guide)
- [Example Implementations](#example-implementations)
- [Installation](#installation)
- [Usage Example](#usage-example)
- [Table of Contents](#table-of-contents)
- [Exposing the plugin / pi instances to the streamdeck](#exposing-the-plugin--pi-instances-to-the-streamdeck)
- [Incoming events](#incoming-events)
  - [applicationDidLaunch](#applicationdidlaunch)
  - [applicationDidTerminate](#applicationdidterminate)
  - [deviceDidConnect](#devicedidconnect)
  - [deviceDidDisconnect](#devicediddisconnect)
  - [dialPress](#dialpress)
  - [dialRotate](#dialrotate)
  - [didReceiveGlobalSettings](#didreceiveglobalsettings)
  - [didReceiveSettings](#didreceivesettings)
  - [keyDown](#keydown)
  - [keyUp](#keyup)
  - [propertyInspectorDidAppear](#propertyinspectordidappear)
  - [propertyInspectorDidDisappear](#propertyinspectordiddisappear)
  - [sendToPlugin](#sendtoplugin)
  - [sendToPropertyInspector](#sendtopropertyinspector)
  - [systemDidWakeUp](#systemdidwakeup)
  - [titleParametersDidChange](#titleparametersdidchange)
  - [touchTap](#touchtap)
  - [websocketOpen](#websocketopen)
  - [willAppear](#willappear)
  - [willDisappear](#willdisappear)
- [Outgoing events](#outgoing-events)
  - [GetGlobalSettings](#getglobalsettings)
  - [GetSettings](#getsettings)
  - [LogMessage](#logmessage)
  - [OpenUrl](#openurl)
  - [SendToPlugin](#sendtoplugin-1)
  - [SendToPropertyInspector](#sendtopropertyinspector-1)
  - [SetFeedback](#setfeedback)
  - [SetFeedbackLayout](#setfeedbacklayout)
  - [SetImage](#setimage)
  - [SetGlobalSettings](#setglobalsettings)
  - [SetSettings](#setsettings)
  - [SetState](#setstate)
  - [SetTitle](#settitle)
  - [ShowAlert](#showalert)
  - [ShowOk](#showok)
  - [SwitchToProfile](#switchtoprofile)
- [License](#license)

## Exposing the plugin / pi instances to the streamdeck

The Streamdeck needs a globally accessible `connectElgatoStreamDeckSocket` method to register the plugin and propertyinspector.
Both, the plugin and pi instances can be exposed to the streamdeck by binding their `createStreamdeckConnector` method to the `connectElgatoStreamDeckSocket`. E.g.:

```typescript
window.connectElgatoStreamDeckSocket = plugin.createStreamdeckConnector();
```

:information_source: See the [streamdeck-ts-template](https://github.com/rweich/streamdeck-ts-template) for a real example how to do that.

## Incoming events

The Plugin / Propertyinspector can listen to the following events sent by the streamdeck.

> For detailled information see the [official docs](https://developer.elgato.com/documentation/stream-deck/sdk/events-received/) for events received from the streamdeck.

### applicationDidLaunch

Triggered when an application - specified in the `manifest.json` - was launched.

**Event-Payload**:

```typescript
event: { application: string; }
```

**Example**:

```typescript
plugin.on('applicationDidLaunch', ({ application }) => console.log(`${application} was launched!`));
```

- *is sent to: **[x] Plugin** [ ] PI*

---

### applicationDidTerminate

Triggered when an application - specified in the `manifest.json` - was terminated.

**Event-Payload**:

```typescript
event: { application: string; }
```

**Example**:

```typescript
plugin.on('applicationDidTerminate', ({ application }) => console.log(`${application} was terminated!`));
```

- *is sent to: **[x] Plugin** [ ] PI*

---

### deviceDidConnect

Triggered when a streamdeck device gets plugged to the computer.

**Event-Payload**:

```typescript
event: {
  device: string;
  name: string;
  type: DeviceType; // enum { StreamDeck, StreamDeckMini, StreamDeckXL, StreamDeckMobile, CorsairGKeys }
  columns: number;
  rows: number;
}
```

**Example**:

```typescript
plugin.on('deviceDidConnect', ({ name }) => console.log(`device ${name} was plugged in`));
```

- *is sent to: **[x] Plugin** [ ] PI*

---

### deviceDidDisconnect

Triggered when a streamdeck device gets unplugged from the computer.

**Event-Payload**:

```typescript
event: {
  device: string;
}
```

**Example**:

```typescript
plugin.on('deviceDidDisconnect', ({ device }) => console.log(`device with id ${device} was unplugged`));
```

- *is sent to: **[x] Plugin** [ ] PI*

---

### dialPress

**[Stream Deck 6.0.0+ Required]**

Triggered when a user presses or releases the dial on a Stream Deck +.

**Event-Payload**:

```typescript
event: {
  row: number | undefined;
  column: number | undefined;
  action: string;
  context: string;
  device: string;
  settings: unknown;
  controller: ControllerType; // String enum, but guaranteed to be "Encoder".
  pressed: boolean;
}
```

**Example**:

```typescript
plugin.on('dialPress', ({ pressed }) => {
  console.log(`a dial was ${pressed ? 'pressed' : 'released'}`);
});
```

- *is sent to: **[x] Plugin** [ ] PI*

---

### dialRotate

**[Stream Deck 6.0.0+ Required]**

Triggered when a user rotates a dial on a Stream Deck +. Note that a dial *may*
be pressed and rotated simultaneously.

**Event-Payload**:

```typescript
event: {
  row: number | undefined;
  column: number | undefined;
  action: string;
  context: string;
  device: string;
  settings: unknown;
  controller: ControllerType; // String enum, but guaranteed to be "Encoder".
  pressed: boolean;
  ticks: number;
}
```

**Example**:

```typescript
plugin.on('dialRotate', ({ ticks, pressed }) => {
  console.log(`a dial was rotated ${ticks} ticks. It ${pressed ? 'was' : 'was not'} pressed.`);
});
````

- *is sent to: **[x] Plugin** [ ] PI*

---

### didReceiveGlobalSettings

Triggered after a [GetGlobalSettingsEvent](#getglobalsettings) was sent to the streamdeck.

**Event-Payload**:

```typescript
event: { settings: unknown }
```

**Example**:

```typescript
plugin.on('didReceiveGlobalSettings', ({ settings }) => console.log('got settings', settings));
```

- *is sent to: **[x] Plugin [x] PI***

---

### didReceiveSettings

Triggered after a [GetSettingsEvent](#getsettings) was sent to the streamdeck.

**Event-Payload**:

```typescript
event: {
  settings: unknown;
  row: numbe | undefinedr;
  column: number | undefined;
  isInMultiAction: boolean;
  state: number | undefined;
  action: string;
  context: string;
  device: string;
}
```

**Example**:

```typescript
plugin.on('didReceiveSettings', ({ row, column, settings }) =>
  console.log(`got settings for button ${row} / ${column}`, settings),
);
```

- *is sent to: **[x] Plugin [x] PI***

---

### keyDown

Triggered when the button gets pressed.

**Event-Payload**:

```typescript
event: {
  row: number | undefined;
  column: number | undefined;
  isInMultiAction: boolean;
  state: number | undefined;
  userDesiredState: number | undefined;
  action: string;
  context: string;
  device: string;
  settings: unknown;
}
```

**Example**:

```typescript
plugin.on('keyDown', ({ row, column }) => console.log(`key down on ${row} / ${column}`));
```

- *is sent to: **[x] Plugin** [ ] PI*

---

### keyUp

Triggered when the button gets released.

**Event-Payload**:

```typescript
event: {
  row: number | undefined;
  column: number | undefined;
  isInMultiAction: boolean;
  state: number | undefined;
  userDesiredState: number | undefined;
  action: string;
  context: string;
  device: string;
  settings: unknown;
}
```

**Example**:

```typescript
plugin.on('keyUp', ({ row, column }) => console.log(`key up on ${row} / ${column}`));
```

- *is sent to: **[x] Plugin** [ ] PI*

---

### propertyInspectorDidAppear

Triggered when the property inspector appears.

**Event-Payload**:

```typescript
event: {
  action: string;
  context: string;
  device: string;
}
```

**Example**:

```typescript
plugin.on('propertyInspectorDidAppear', () => console.log(`the propertyinspector appeared!`));
```

- *is sent to: **[x] Plugin** [ ] PI*

---

### propertyInspectorDidDisappear

Triggered when the property inspector appears.

**Event-Payload**:

```typescript
event: {
  action: string;
  context: string;
  device: string;
}
```

**Example**:

```typescript
plugin.on('propertyInspectorDidDisappear', () => console.log(`the propertyinspector disappeared!`));
```

- *is sent to: **[x] Plugin** [ ] PI*

---

### sendToPlugin

Triggered when the propertyinspector sends a [SendToPluginEvent](#sendtoplugin-1).

**Event-Payload**:

```typescript
event: {
  action: string;
  context: string;
  payload: Record<string, unknown>;
}
```

**Example**:

```typescript
plugin.on('sendToPlugin', ({ payload }) => console.log(`the pi sent some data:`, payload));
```

- *is sent to: **[x] Plugin** [ ] PI*

---

### sendToPropertyInspector

Triggered when the plugin sends a [SendToPropertyInspectorEvent](#sendtopropertyinspector-1).

**Event-Payload**:

```typescript
event: {
  action: string;
  context: string;
  payload: Record<string, unknown>;
}
```

**Example**:

```typescript
pi.on('sendToPropertyInspector', ({ payload }) => console.log(`the plugin sent some data:`, payload));
```

- *is sent to: [ ] Plugin **[x] PI***

---

### systemDidWakeUp

Triggered when the computer is wake up.

**Event-Payload**:

no payload

**Example**:

```typescript
plugin.on('systemDidWakeUp', () => console.log(`system did wake up!`));
```

- *is sent to: **[x] Plugin** [ ] PI*

### titleParametersDidChange

Triggered when the user changes the title or title parameters.

**Event-Payload**:

```typescript
event: {
  action: string;
  context: string;
  device: string;
  row: number;
  column: number;
  settings: unknown;
  state: number;
  title: string;
  fontFamily: string
  fontSize: number
  fontStyle: string
  fontUnderline: boolean
  showTitle: boolean
  titleAlignment: string
  titleColor: string
}
```

**Example**:

```typescript
plugin.on('titleParametersDidChange', ({ fontSize }) => console.log(`new title/params with size ${fontSize}!`));
```
- *is sent to: **[x] Plugin** [ ] PI*

---

### touchTap

Triggered when a user touches the touch screen on a Stream Deck +. A `hold`
happens when the user keeps their finger in place for approximately 500
milliseconds.

**Event-Payload**:

```typescript
event: {
  row: number | undefined;
  column: number | undefined;
  action: string;
  context: string;
  device: string;
  settings: unknown;
  controller: ControllerType; // String enum, but guaranteed to be "Encoder".
  tapPos: [number, number]; // X, Y
  hold: boolean;
}
```

**Example**:

```typescript
plugin.on('touchTap', ({ hold, tapPos }) => {
  console.log(`touch screen tapped at (${tapPos[0]}, ${tapPos[1]}), ${hold ? 'was' : 'was not'} held!`);
});
````

- *is sent to: **[x] Plugin** [ ] PI*

---

### websocketOpen

Triggered when the websocket to the streamdeck was successfully opened.

**Event-Payload**:

```typescript
event: {
  uuid: string;
  info: string;
}
```

**Example**:

```typescript
plugin.on('websocketOpen', ({ uuid }) => console.log(`websocket opened for uuid/context: ${uuid}`));
```

- *is sent to: **[x] Plugin [x] PI***

---

### willAppear

Triggered when the plugin / button gets displayed on the streamdeck.

**Event-Payload**:

```typescript
event: {
  settings: unknown;
  row: number | undefined;
  column: number | undefined;
  isInMultiAction: boolean;
  state: number | undefined;
  action: string;
  context: string;
  device: string;
}
```

**Example**:

```typescript
plugin.on('willAppear', ({ row, column }) => console.log(`the button appeared on ${row} / ${column}`));
```

- *is sent to: **[x] Plugin** [ ] PI*

---

### willDisappear

Triggered when the plugin / button is no longer displayed on the streamdeck.

**Event-Payload**:

```typescript
event: {
  settings: unknown;
  row: number | undefined;
  column: number | undefined;
  isInMultiAction: boolean;
  state: number | undefined;
  action: string;
  context: string;
  device: string;
}
```

**Example**:

```typescript
plugin.on('willDisappear', ({ row, column }) => console.log(`the button disappeared from ${row} / ${column}`));
```

- *is sent to: **[x] Plugin** [ ] PI*

---

## Outgoing events

The plugin and propertyinspector can send the following events to the streamdeck:

> For detailled information see the [official docs](https://developer.elgato.com/documentation/stream-deck/sdk/events-sent/) for events sent to the streamdeck.

### GetGlobalSettings

Requests the settings globally stored for all buttons using this plugin / pi.

Triggers the [didReceiveGlobalSettings](#didreceiveglobalsettings) event.

`getGlobalSettings(context: string): void`

**Example**:

```typescript
plugin.getGlobalSettings('context');
```

- *can be sent from: **[x] Plugin [x] PI***

---

### GetSettings

Requests the settings stored for the button instance.

Triggers the [didReceiveSettings](#didreceivesettings) event.

`getSettings(context: string): void`

**Example**:

```typescript
plugin.getSettings('context');
```

- *can be sent from: **[x] Plugin [x] PI***

---

### LogMessage

Makes the streamdeck write the log message to a debug log file.

`logMessage(message: string): void`

**Example**:

```typescript
plugin.logMessage('the message');
```

- *can be sent from: **[x] Plugin [x] PI***

---

### OpenUrl

Makes the streamdeck open the url in a browser.

`openUrl(url: string): void`

**Example**:

```typescript
plugin.openUrl('the url');
```

- *can be sent from: **[x] Plugin [x] PI***

---

### SendToPlugin

Sends data to the plugin.
Triggers the [sendToPlugin](#sendtoplugin) event.

`sendToPlugin(context: string, payload: Record<string, unknown>, action: string): void`

**Example**:

```typescript
pi.sendToPlugin('context', { some: 'data' }, 'action');
```

- *can be sent from: [ ] Plugin **[x] PI***

---

### SendToPropertyInspector

Sends data to the propertyinspector.
Triggers the [sendToPropertyInspector](#sendtopropertyinspector) event.

`sendToPropertyInspector(context: string, payload: Record<string, unknown>): void`

**Example**:

```typescript
plugin.sendToPropertyInspector('context', { some: 'data' });
```

- *can be sent from: **[x] Plugin** [ ] PI*

---

### SetFeedback

**[Stream Deck 6.0.0+ Required]**

Sends a command to the Stream Deck to update the Feedback displayed for a
specific dial. Feedback payloads must conform to (at least) the
`GenericLayoutFeedback` type for any updates, but stricter types are accepted so
long as they also satisfy the requirements of this type.

Consult the `streamdeck-events` project for more information about feedback and
how it behaves, including valid values for particular keys.

`setFeedback(payload: LayoutFeedback | GenericLayoutFeedback, context: string): void`

**Example**:

```typescript
plugin.setFeedback({ title: 'Hello, world!' }, 'context');
```

- *can be sent from: **[x] Plugin** [ ] PI*

---

### SetFeedbackLayout

**[Stream Deck 6.0.0+ Required]**

Sends a command to the Stream Deck to update the Feedback Layout for a specific
dial. Layouts may either be a hardcoded layout ID or a path (relative to plugin
root) to a layout JSON. This library will perform *no validation* whether a
specific layout is valid or not.

Consult the `streamdeck-events` project for more information about feedback and
how it behaves, including built-in layouts.

`setFeedbackLayout(layout: LayoutFeedbackKey | string, context: string): void`

**Example**:

```typescript
plugin.setFeedbackLayout("layouts/layoutv2.json", 'context');
```

- *can be sent from: **[x] Plugin** [ ] PI*

---

### SetImage

Changes the image of the button.

`setImage(image: string, context: string, options: { target?: 'hardware' | 'software' | 'both'; state?: number }): void`

**Example**:

```typescript
plugin.setImage('imagedataAsBase64', 'context');
```

- *can be sent from: **[x] Plugin** [ ] PI*

---

### SetGlobalSettings

Persists the data globally (not just for the current button).

Triggers the [didReceiveGlobalSettings](#didreceiveglobalsettings) event for the plugin (if sent by pi) and for the pi (if sent by plugin).

`setGlobalSettings(context: string, settings: unknown): void`

**Example**:

```typescript
plugin.setGlobalSettings('context', { your: 'new-global-settings' });
```

- *can be sent from: **[x] Plugin [x] PI***

---

### SetSettings

Persists the settings for the current button.

Triggers the [didReceiveSettings](#didreceivesettings) event for the plugin (if sent by pi) and for the pi (if sent by plugin).

`setSettings(context: string, eventPayload: unknown): void`

**Example**:

```typescript
plugin.setSettings('context', { your: 'new-settings' });
```

- *can be sent from: **[x] Plugin [x] PI***

---

### SetState

Changes the state of the button if it supports multiple states.

`setState(state: number, context: string): void`

**Example**:

```typescript
plugin.setState(1, 'context');
```

- *can be sent from: **[x] Plugin** [ ] PI*

---

### SetTitle

Changes the title of the button.

`setTitle(title: string, context: string, options: { target?: 'hardware' | 'software' | 'both'; state?: number }): void`

**Example**:

```typescript
plugin.setTitle('the new title', 'context');
```

- *can be sent from: **[x] Plugin** [ ] PI*

---

### ShowAlert

Will show an alert icon on the button.

`showAlert(context: string): void`

**Example**:

```typescript
plugin.showAlert('context');
```

- *can be sent from: **[x] Plugin** [ ] PI*

---

### ShowOk

Will show an ok checkmark on the button.

`showOk(context: string): void`

**Example**:

```typescript
plugin.showOk('context');
```

- *can be sent from: **[x] Plugin** [ ] PI*

---

### SwitchToProfile

Makes the streamdeck switch to the preconfigured readonly profile.

`switchToProfile(profilename: string, context: string, device: string): void`

**Example**:

```typescript
plugin.switchToProfile('profilename', 'context', 'device');
```

- *can be sent from: **[x] Plugin** [ ] PI*


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Frweich%2Fstreamdeck-ts.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Frweich%2Fstreamdeck-ts?ref=badge_large)
