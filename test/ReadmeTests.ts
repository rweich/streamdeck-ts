import { describe, test } from 'mocha';
import { dummyLogger } from 'ts-log';

import { Streamdeck } from '../src';

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
    const pi = new Streamdeck(dummyLogger).propertyinspector();
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
    test('the dialPress snippet', () => {
      plugin.on('dialPress', ({ pressed }) => {
        console.log(`a dial was ${pressed ? 'pressed' : 'released'}`);
      });
    });
    test('the dialRotate snippet', () => {
      plugin.on('dialRotate', ({ ticks, pressed }) => {
        console.log(`a dial was rotated ${ticks} ticks. It ${pressed ? 'was' : 'was not'} pressed.`);
      });
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
    test('the sendToPropertyInspector snippet', () => {
      pi.on('sendToPropertyInspector', ({ payload }) => console.log(`the plugin sent some data:`, payload));
    });
    test('the systemDidWakeUp snippet', () => {
      plugin.on('systemDidWakeUp', () => console.log(`system did wake up!`));
    });
    test('the titleParametersDidChange snippet', () => {
      plugin.on('titleParametersDidChange', ({ fontSize }) => console.log(`new title/params with size ${fontSize}!`));
    });
    test('the touchTap snippet', () => {
      plugin.on('touchTap', ({ hold, tapPos }) => {
        console.log(`touch screen tapped at (${tapPos[0]}, ${tapPos[1]}), ${hold ? 'was' : 'was not'} held!`);
      });
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
    test('the GetGlobalSettingsEvent snippet', () => {
      plugin.getGlobalSettings('context');
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
    test('the SetFeedbackEvent snippet', () => {
      plugin.setFeedback({ title: 'Hello, world!' }, 'context');
    });
    test('the SetFeedbackLayout snippet', () => {
      plugin.setFeedbackLayout('layouts/layoutv2.json', 'context');
    });
    test('the SetImageEvent snippet', () => {
      plugin.setImage('imagedataAsBase64', 'context');
    });
    test('the SetGlobalSettingsEvent snippet', () => {
      plugin.setGlobalSettings('context', { your: 'new-global-settings' });
    });
    test('the SetSettingsEvent snippet', () => {
      plugin.setSettings('context', { your: 'new-settings' });
    });
    test('the SetStateEvent snippet', () => {
      plugin.setState(1, 'context');
    });
    test('the SetTitleEvent snippet', () => {
      plugin.setTitle('the new title', 'context');
    });
    test('the ShowAlertEvent snippet', () => {
      plugin.showAlert('context');
    });
    test('the ShowOkEvent snippet', () => {
      plugin.showOk('context');
    });
    test('the SwitchToProfileEvent snippet', () => {
      plugin.switchToProfile('profilename', 'context', 'device');
    });
  });
});
