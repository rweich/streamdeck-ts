import { expect } from 'chai';
import 'mocha';
import { IncomingPluginEvents } from '../../../../src';
import EventValidationError from '../../../../src/events/incoming/exception/EventValidationError';
import DeviceDidDisconnectEvent from '../../../../src/events/incoming/plugin/DeviceDidDisconnectEvent';
import eventInvalidType from '../fixtures/deviceDidDisconnectEvent.invalid-eventtype.json';
import eventMissingParam from '../fixtures/deviceDidDisconnectEvent.missing-param.json';
import eventValid from '../fixtures/deviceDidDisconnectEvent.valid.json';

describe('DeviceDidDisconnectEvent test', () => {
  it('should create the event when using the correct payload', function () {
    const event = new DeviceDidDisconnectEvent(eventValid);
    expect(event.device).to.equal('opaqueValue');
    expect(event.event).to.equal(IncomingPluginEvents.DeviceDidDisconnect);
  });
  it('should throw a validation error on missing parameters', function () {
    expect(() => new DeviceDidDisconnectEvent(eventMissingParam)).to.throw(
      EventValidationError,
      /required property 'device'/,
    );
  });
  it('should throw a validation error on wrong event type', function () {
    expect(() => new DeviceDidDisconnectEvent(eventInvalidType)).to.throw(
      EventValidationError,
      /match pattern .*deviceDidDisconnect/,
    );
  });
});
