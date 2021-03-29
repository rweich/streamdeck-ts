import { describe, test } from 'mocha';
import { dummyLogger } from 'ts-log';
import {
  GetSettingsEvent,
  LogMessageEvent,
  OpenUrlEvent,
  SendToPluginEvent,
  SendToPropertyInspectorEvent,
  SetImageEvent,
  SetSettingsEvent,
  SetTitleEvent,
  Streamdeck,
} from '../src';

describe('Tests that the snippets in the Readme.md dont throw errors', () => {
  test('the main example snippet', () => {
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
  });

  describe('Incoming events', () => {
    const plugin = new Streamdeck().plugin();
    // const pi = new Streamdeck().propertyinspector();
    test('the applicationDidLaunch snippet', () => {
      plugin.on('applicationDidLaunch', ({ application }) => console.log(`${application} was launched!`));
    });
    test('the applicationDidTerminate snippet', () => {
      plugin.on('applicationDidTerminate', ({ application }) => console.log(`${application} was terminated!`));
    });
    test('the deviceDidConnect snippet', () => {
      plugin.on('deviceDidConnect', ({ name }) => console.log(`device ${name} was plugged in`));
    });
    test('the deviceDidDisconnect snippet', () => {
      plugin.on('deviceDidDisconnect', ({ device }) => console.log(`device with id ${device} was unplugged`));
    });
    test('the didReceiveGlobalSettings snippet', () => {
      plugin.on('didReceiveGlobalSettings', ({ settings }) => console.log('got settings', settings));
    });
    test('the didReceiveSettings snippet', () => {
      plugin.on('didReceiveSettings', ({ row, column, settings }) =>
        console.log(`got settings for button ${row} / ${column}`, settings),
      );
    });
    test('the keyDown snippet', () => {
      plugin.on('keyDown', ({ row, column }) => console.log(`key down on ${row} / ${column}`));
    });
    test('the keyUp snippet', () => {
      plugin.on('keyUp', ({ row, column }) => console.log(`key up on ${row} / ${column}`));
    });
    test('the propertyInspectorDidAppear snippet', () => {
      plugin.on('propertyInspectorDidAppear', () => console.log(`the propertyinspector appeared!`));
    });
    test('the propertyInspectorDidAppear snippet', () => {
      plugin.on('propertyInspectorDidDisappear', () => console.log(`the propertyinspector disappeared!`));
    });
    test('the sendToPlugin snippet', () => {
      plugin.on('sendToPlugin', ({ data }) => console.log(`the pi sent some data:`, data));
    });
    test.skip('the sendToPropertyInspector snippet', () => {
      // pi.on('sendToPropertyInspector', ({ data }) => console.log(`the plugin sent some data:`, data));
    });
    test.skip('the systemDidWakeUp snippet', () => {
      // TODO: implement
    });
    test.skip('the titleParametersDidChange snippet', () => {
      // TODO: implement
    });
    test('the websocketOpen snippet', () => {
      plugin.on('websocketOpen', ({ uuid }) => console.log(`websocket opened for uuid/context: ${uuid}`));
    });
    test('the willAppear snippet', () => {
      plugin.on('willAppear', ({ row, column }) => console.log(`the button appeared on ${row} / ${column}`));
    });
    test('the willDisappear snippet', () => {
      plugin.on('willDisappear', ({ row, column }) => console.log(`the button disappeared from ${row} / ${column}`));
    });
  });

  describe('Outgoing events', () => {
    const plugin = new Streamdeck(dummyLogger).plugin();
    const pi = new Streamdeck(dummyLogger).propertyinspector();
    test.skip('the GetGlobalSettingsEvent snippet', () => {
      // TODO: implement
    });
    test('the GetSettingsEvent snippet', () => {
      plugin.sendEvent(new GetSettingsEvent('context'));
    });
    test('the LogMessageEvent snippet', () => {
      plugin.sendEvent(new LogMessageEvent('the message'));
    });
    test('the OpenUrlEvent snippet', () => {
      plugin.sendEvent(new OpenUrlEvent('the url'));
    });
    test('the SendToPluginEvent snippet', () => {
      pi.sendEvent(new SendToPluginEvent('action', 'context', { some: 'data' }));
    });
    test('the SendToPropertyInspectorEvent snippet', () => {
      plugin.sendEvent(new SendToPropertyInspectorEvent('action', 'context', { some: 'data' }));
    });
    test('the SetImageEvent snippet', () => {
      plugin.sendEvent(new SetImageEvent('imagedataAsBase64', 'context'));
    });
    test.skip('the SetGlobalSettingsEvent snippet', () => {
      // TODO: implement
    });
    test('the SetSettingsEvent snippet', () => {
      plugin.sendEvent(new SetSettingsEvent('context', { your: 'new-settings' }));
    });
    test.skip('the SetStateEvent snippet', () => {
      // TODO: implement
    });
    test('the SetTitleEvent snippet', () => {
      plugin.sendEvent(new SetTitleEvent('the new title', 'context'));
    });
    test.skip('the ShowAlertEvent snippet', () => {
      // TODO: implement
    });
    test.skip('the ShowOkEvent snippet', () => {
      // TODO: implement
    });
    test.skip('the SwitchToProfileEvent snippet', () => {
      // TODO: implement
    });
  });
});
