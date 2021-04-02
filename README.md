# streamdeck-ts

![Build/Test](https://github.com/rweich/streamdeck-ts/workflows/Build%2FTest/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/rweich/streamdeck-ts/badge.svg?branch=main)](https://coveralls.io/github/rweich/streamdeck-ts?branch=main)

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

## Usage

```typescript
import { SetTitleEvent, Streamdeck } from '@rweich/streamdeck-ts';

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
- [Example Implementations](#example-implementations)
- [Installation](#installation)
- [Usage](#usage)
- [Table of Contents](#table-of-contents)
- [Exposing the plugin / pi instances to the streamdeck](#exposing-the-plugin--pi-instances-to-the-streamdeck)
- [Incoming events](#incoming-events)
  - [applicationDidLaunch](#applicationdidlaunch)
  - [applicationDidTerminate](#applicationdidterminate)
  - [deviceDidConnect](#devicedidconnect)
  - [deviceDidDisconnect](#devicediddisconnect)
  - [didReceiveGlobalSettings](#didreceiveglobalsettings)
  - [didReceiveSettings](#didreceivesettings)
  - [keyDown](#keydown)
  - [keyUp](#keyup)
  - [propertyInspectorDidAppear](#propertyinspectordidappear)
  - [propertyInspectorDidDisappear](#propertyinspectordiddisappear)
  - [sendToPlugin](#sendtoplugin)
  - [sendToPropertyInspector (tbd)](#sendtopropertyinspector-tbd)
  - [systemDidWakeUp (tbd)](#systemdidwakeup-tbd)
  - [titleParametersDidChange (tbd)](#titleparametersdidchange-tbd)
  - [websocketOpen](#websocketopen)
  - [willAppear](#willappear)
  - [willDisappear](#willdisappear)
- [Outgoing events](#outgoing-events)
  - [GetGlobalSettings (tbd)](#getglobalsettings-tbd)
  - [GetSettings](#getsettings)
  - [LogMessage](#logmessage)
  - [OpenUrl](#openurl)
  - [SendToPlugin](#sendtoplugin-1)
  - [SendToPropertyInspector](#sendtopropertyinspector)
  - [SetImage](#setimage)
  - [SetGlobalSettings (tbd)](#setglobalsettings-tbd)
  - [SetSettings](#setsettings)
  - [SetState (tbd)](#setstate-tbd)
  - [SetTitle](#settitle)
  - [ShowAlert (tbd)](#showalert-tbd)
  - [ShowOk (tbd)](#showok-tbd)
  - [SwitchToProfile (tbd)](#switchtoprofile-tbd)

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

### didReceiveGlobalSettings

Triggered after a [GetGlobalSettingsEvent](#getglobalsettingsevent-tbd) was sent to the streamdeck.

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

Triggered after a [GetSettingsEvent](#getsettingsevent) was sent to the streamdeck.

**Event-Payload**:

```typescript
event: {
  settings: unknown;
  row: number;
  column: number;
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
  row: number;
  column: number;
  isInMultiAction: boolean;
  action: string;
  context: string;
  device: string;
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
  row: number;
  column: number;
  isInMultiAction: boolean;
  action: string;
  context: string;
  device: string;
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

Triggered when the propertyinspector sends a [SendToPluginEvent](#sendtopluginevent).

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

### sendToPropertyInspector (tbd)

:x: not yet implemented

Triggered when the plugin sends a [SendToPropertyInspectorEvent](#sendtopropertyinspectorevent).

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

### systemDidWakeUp (tbd)

:x: not yet implemented

### titleParametersDidChange (tbd)

:x: not yet implemented

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
  row: number;
  column: number;
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
  row: number;
  column: number;
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

### GetGlobalSettings (tbd)

:x: not yet implemented

Requests the settings globally stored for all buttons using this plugin / pi.

Triggers the [didReceiveGlobalSettings](#didreceiveglobalsettings) event.

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
Triggers the [sendToPropertyInspector](#sendtopropertyinspector-tbd) event.

`sendToPropertyInspector(context: string, payload: Record<string, unknown>): void`

**Example**:

```typescript
plugin.sendToPropertyInspector('context', { some: 'data' });
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

### SetGlobalSettings (tbd)

:x: not yet implemented

Persists the data globally (not just for the current button).

Triggers the [didReceiveGlobalSettings](#didreceiveglobalsettings) event for the plugin (if sent by pi) and for the pi (if sent by plugin).

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

### SetState (tbd)

:x: not yet implemented

Changes the state of the button if it supports multiple states.

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

### ShowAlert (tbd)

:x: not yet implemented

Will show an alert icon on the button.

- *can be sent from: **[x] Plugin** [ ] PI*

---

### ShowOk (tbd)

:x: not yet implemented

Will show an ok checkmark on the button.

- *can be sent from: **[x] Plugin** [ ] PI*

---

### SwitchToProfile (tbd)

:x: not yet implemented

Makes the streamdeck switch to the preconfigured readonly profile.

- *can be sent from: **[x] Plugin** [ ] PI*
