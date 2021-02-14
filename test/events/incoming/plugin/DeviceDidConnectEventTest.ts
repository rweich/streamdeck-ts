import { expect } from 'chai';
import 'mocha';
import { DeviceType, IncomingPluginEvents } from '../../../../src';
import EventValidationError from '../../../../src/events/incoming/exception/EventValidationError';
import DeviceDidConnectEvent from '../../../../src/events/incoming/plugin/DeviceDidConnectEvent';
import eventInvalidType from '../fixtures/deviceDidConnectEvent.invalid-eventtype.json';
import eventMissingParam from '../fixtures/deviceDidConnectEvent.missing-param.json';
import eventValid from '../fixtures/deviceDidConnectEvent.valid.json';

describe('DeviceDidConnectEvent test', () => {
  it('should create the event when using the correct payload', function () {
    const event = new DeviceDidConnectEvent(eventValid);
    expect(event.device).to.equal('dededededded');
    expect(event.name).to.equal('Stream Deck XL');
    expect(event.type).to.equal(DeviceType.StreamDeckXL);
    expect(event.columns).to.equal(8);
    expect(event.rows).to.equal(4);
    expect(event.event).to.equal(IncomingPluginEvents.DeviceDidConnect);
  });
  it('should throw a validation error on missing parameters', function () {
    expect(() => new DeviceDidConnectEvent(eventMissingParam)).to.throw(
      EventValidationError,
      /required property 'type'/,
    );
  });
  it('should throw a validation error on wrong event type', function () {
    expect(() => new DeviceDidConnectEvent(eventInvalidType)).to.throw(
      EventValidationError,
      /match pattern .*deviceDidConnect/,
    );
  });
});
