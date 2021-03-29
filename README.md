# streamdeck-ts

![Build/Test](https://github.com/rweich/streamdeck-ts/workflows/Build%2FTest/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/rweich/streamdeck-ts/badge.svg?branch=main)](https://coveralls.io/github/rweich/streamdeck-ts?branch=main)

## About

A typescript sdk to create plugins for the elgato streamdeck.

The goal of this sdk is to make all the events (sent and received to / from the streamdeck) and their paylods typesafe.

**Features**:

- simple event interface
- working typehints and autocompletion for events and their payloads

## Example Implementations

- [numberdisplay](https://github.com/rweich/streamdeck-ts-numberdisplay) - the example numberdisplay plugin from elgato ported to use this sdk.
- [streamdeck-datetime](https://github.com/rweich/streamdeck-datetime) - a simple datetime plugin.
- [streamdeck-ts-template](https://github.com/rweich/streamdeck-ts-template) - this package in a fully configured template repository to help you start coding instead of worrying about build or release configuration.

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

// Send events
// For most events you'll need a context (the button) to send events to.
// You'll get that with most events sent by the streamdeck.
plugin.on('willAppear', ({ context }) => {
  plugin.sendEvent(new SetTitleEvent('new Title', context));
});

// same for the property inspector
const pi = new Streamdeck().propertyinspector();
pi.on('didReceiveSettings', ({ settings }) => console.log('got settings', settings));
```

## Table of Contents

- [About](#about)
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
  - [GetGlobalSettingsEvent (tbd)](#getglobalsettingsevent-tbd)
  - [GetSettingsEvent](#getsettingsevent)
  - [LogMessageEvent](#logmessageevent)
  - [OpenUrlEvent](#openurlevent)
  - [SendToPluginEvent](#sendtopluginevent)
  - [SendToPropertyInspectorEvent](#sendtopropertyinspectorevent)
  - [SetImageEvent](#setimageevent)
  - [SetGlobalSettingsEvent (tbd)](#setglobalsettingsevent-tbd)
  - [SetSettingsEvent](#setsettingsevent)
  - [SetStateEvent (tbd)](#setstateevent-tbd)
  - [SetTitleEvent](#settitleevent)
  - [ShowAlertEvent (tbd)](#showalertevent-tbd)
  - [ShowOkEvent (tbd)](#showokevent-tbd)
  - [SwitchToProfileEvent (tbd)](#switchtoprofileevent-tbd)

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

- [x] sent to Plugin
- [ ] sent to PropertyInspector

**Event-Payload**:

```typescript
event: { application: string; }
```

**Example**:

```typescript
plugin.on('applicationDidLaunch', ({ application }) => console.log(`${application} was launched!`));
```

### applicationDidTerminate

Triggered when an application - specified in the `manifest.json` - was terminated.

- [x] sent to Plugin
- [ ] sent to PropertyInspector

**Event-Payload**:

```typescript
event: { application: string; }
```

**Example**:

```typescript
plugin.on('applicationDidTerminate', ({ application }) => console.log(`${application} was terminated!`));
```

### deviceDidConnect

Triggered when a streamdeck device gets plugged to the computer.

- [x] sent to Plugin
- [ ] sent to PropertyInspector

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

### deviceDidDisconnect

- [x] sent to Plugin
- [ ] sent to PropertyInspector

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

### didReceiveGlobalSettings

Triggered after a [GetGlobalSettingsEvent](#getglobalsettingsevent-tbd) was sent to the streamdeck.

- [x] sent to Plugin
- [x] sent to PropertyInspector

**Event-Payload**:

```typescript
event: { settings: unknown }
```

**Example**:

```typescript
plugin.on('didReceiveGlobalSettings', ({ settings }) => console.log('got settings', settings));
```

### didReceiveSettings

Triggered after a [GetSettingsEvent](#getsettingsevent) was sent to the streamdeck.

- [x] sent to Plugin
- [x] sent to PropertyInspector

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

### keyDown

Triggered when xxx.

- [x] sent to Plugin
- [ ] sent to PropertyInspector

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

### keyUp

Triggered when xxx.

- [x] sent to Plugin
- [ ] sent to PropertyInspector

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

### propertyInspectorDidAppear

Triggered when the property inspector appears.

- [x] sent to Plugin
- [ ] sent to PropertyInspector

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

### propertyInspectorDidDisappear

Triggered when the property inspector appears.

- [x] sent to Plugin
- [ ] sent to PropertyInspector

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

### sendToPlugin

Triggered when the propertyinspector sends a [SendToPluginEvent](#sendtopluginevent).

- [x] sent to Plugin
- [ ] sent to PropertyInspector

**Event-Payload**:

```typescript
event: {
  action: string;
  context: string;
  data: unknown;
}
```

**Example**:

```typescript
plugin.on('sendToPlugin', ({ data }) => console.log(`the pi sent some data:`, data));
```

- [ ] TODO: check data/payload name

### sendToPropertyInspector (tbd)

:x: not yet implemented

Triggered when the plugin sends a [SendToPropertyInspectorEvent](#sendtopropertyinspectorevent).

- [ ] sent to Plugin
- [x] sent to PropertyInspector

**Event-Payload**:

```typescript
event: {
  action: string;
  context: string;
  data: unknown;
}
```

**Example**:

```typescript
plugin.on('sendToPropertyInspector', ({data}) => console.log(`the plugin sent some data:`, data));
```

- [ ] TODO: check data/payload name

### systemDidWakeUp (tbd)

:x: not yet implemented

### titleParametersDidChange (tbd)

:x: not yet implemented

### websocketOpen

Triggered when the websocket to the streamdeck was successfully opened.

- [x] sent to Plugin
- [x] sent to PropertyInspector

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

### willAppear

Triggered when the plugin / button gets displayed on the streamdeck.

- [x] sent to Plugin
- [ ] sent to PropertyInspector

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

### willDisappear

Triggered when the plugin / button is no longer displayed on the streamdeck.

- [x] sent to Plugin
- [ ] sent to PropertyInspector

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

## Outgoing events

The plugin and propertyinspector can send the following events to the streamdeck:

> For detailled information see the [official docs](https://developer.elgato.com/documentation/stream-deck/sdk/events-sent/) for events sent to the streamdeck.

### GetGlobalSettingsEvent (tbd)

:x: not yet implemented

Requests the settings globally stored for all buttons using this plugin / pi.
Triggers the [didReceiveGlobalSettings](#didreceiveglobalsettings) event.

- [x] can be sent from Plugin
- [x] can be sent from PropertyInspector

### GetSettingsEvent

Requests the settings stored for the button instance.
Triggers the [didReceiveSettings](#didreceivesettings) event.

- [x] can be sent from Plugin
- [x] can be sent from PropertyInspector

**Event Signature**:

```typescript
GetSettingsEvent(context: string)
```

**Example**:

```typescript
plugin.sendEvent(new GetSettingsEvent('context'));
```

### LogMessageEvent

Makes the streamdeck write the log message to a debug log file.

- [x] can be sent from Plugin
- [x] can be sent from PropertyInspector

**Event Signature**:

```typescript
LogMessageEvent(message: string)
```

**Example**:

```typescript
plugin.sendEvent(new LogMessageEvent('the message'));
```

### OpenUrlEvent

Makes the streamdeck open the url in a browser.

- [x] can be sent from Plugin
- [x] can be sent from PropertyInspector

**Example**:

**Event Signature**:

```typescript
OpenUrlEvent(url: string)
```

```typescript
plugin.sendEvent(new OpenUrlEvent('the url'));
```

### SendToPluginEvent

Sends data to the plugin.
Triggers the [sendToPlugin](#sendtoplugin) event.

- [ ] can be sent from Plugin
- [x] can be sent from PropertyInspector

**Event Signature**:

```typescript
SendToPluginEvent(action: string, context: string, payload: unknown)
```

**Example**:

```typescript
pi.sendEvent(new SendToPluginEvent('action', 'context', { some: 'data' }));
```

### SendToPropertyInspectorEvent

Sends data to the propertyinspector.
Triggers the [sendToPropertyInspector](#sendtopropertyinspector-tbd) event.

- [x] can be sent from Plugin
- [ ] can be sent from PropertyInspector

**Event Signature**:

```typescript
SendToPropertyInspectorEvent(action: string, context: string, payload: unknown)
```

**Example**:

```typescript
plugin.sendEvent(new SendToPropertyInspectorEvent('action', 'context', { some: 'data' }));
```

### SetImageEvent

Changes the image of the button.

- [x] can be sent from Plugin
- [ ] can be sent from PropertyInspector

**Event Signature**:

```typescript
SetImageEvent(image: string, context: string, target?: TargetEnum, state?: number | undefined)
```

**Example**:

```typescript
plugin.sendEvent(new SetImageEvent('imagedataAsBase64', 'context'));
```

### SetGlobalSettingsEvent (tbd)

:x: not yet implemented

Persists the data globally (not just for the current button).
Triggers the [didReceiveGlobalSettings](#didreceiveglobalsettings) event for the plugin (if sent by pi) and for the pi (if sent by plugin).

- [x] can be sent from Plugin
- [x] can be sent from PropertyInspector

### SetSettingsEvent

Persists the settings for the current button.
Triggers the [didReceiveSettings](#didreceivesettings) event for the plugin (if sent by pi) and for the pi (if sent by plugin).

- [x] can be sent from Plugin
- [x] can be sent from PropertyInspector

**Event Signature**:

```typescript
SetSettingsEvent(context: string, eventPayload: unknown)
```

**Example**:

```typescript
plugin.sendEvent(new SetSettingsEvent('context', { your: 'new-settings' }));
```

### SetStateEvent (tbd)

:x: not yet implemented

Changes the state of the button if it supports multiple states.

- [x] can be sent from Plugin
- [ ] can be sent from PropertyInspector

### SetTitleEvent

Changes the title of the button.

- [x] can be sent from Plugin
- [ ] can be sent from PropertyInspector

**Event Signature**:

```typescript
SetTitleEvent(title: string, context: string, target?: TargetEnum, state?: number | undefined)
```

**Example**:

```typescript
plugin.sendEvent(new SetTitleEvent('the new title', 'context'));
```

### ShowAlertEvent (tbd)

:x: not yet implemented

Will show an alert icon on the button.

- [x] can be sent from Plugin
- [ ] can be sent from PropertyInspector

### ShowOkEvent (tbd)

:x: not yet implemented

Will show an ok checkmark on the button.

- [x] can be sent from Plugin
- [ ] can be sent from PropertyInspector

### SwitchToProfileEvent (tbd)

:x: not yet implemented

Makes the streamdeck switch to the preconfigured readonly profile.

- [x] can be sent from Plugin
- [ ] can be sent from PropertyInspector
