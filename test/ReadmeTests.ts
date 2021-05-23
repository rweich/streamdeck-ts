import { describe, test } from 'mocha';

import { Streamdeck } from '../src';
import { dummyLogger } from 'ts-log';

describe('Tests that the snippets in the Readme.md dont throw errors', () => {
  test('the main example snippet', () => {
    // Create plugin instance
    const plugin = new Streamdeck().plugin();

    // Add event listeners
    plugin.on('keyDown', ({ row, column }) => {
      console.log(`key pressed on row ${row} and column ${column}`);
    });

    // Send events
    // For most events you'll need a context (the "button-id") to send events to.
    // It's sent with most events received from the streamdeck.
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
      plugin.on('sendToPlugin', ({ payload }) => console.log(`the pi sent some data:`, payload));
    });
    test.skip('the sendToPropertyInspector snippet', () => {
      // pi.on('sendToPropertyInspector', ({ payload }) => console.log(`the plugin sent some data:`, payload));
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
      plugin.getSettings('context');
    });
    test('the LogMessageEvent snippet', () => {
      plugin.logMessage('the message');
    });
    test('the OpenUrlEvent snippet', () => {
      plugin.openUrl('the url');
    });
    test('the SendToPluginEvent snippet', () => {
      pi.sendToPlugin('context', { some: 'data' }, 'action');
    });
    test('the SendToPropertyInspectorEvent snippet', () => {
      plugin.sendToPropertyInspector('context', { some: 'data' });
    });
    test('the SetImageEvent snippet', () => {
      plugin.setImage('imagedataAsBase64', 'context');
    });
    test.skip('the SetGlobalSettingsEvent snippet', () => {
      // TODO: implement
    });
    test('the SetSettingsEvent snippet', () => {
      plugin.setSettings('context', { your: 'new-settings' });
    });
    test.skip('the SetStateEvent snippet', () => {
      // TODO: implement
    });
    test('the SetTitleEvent snippet', () => {
      plugin.setTitle('the new title', 'context');
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
