import { expect } from 'chai';
import 'mocha';
import { IncomingEvents } from '../../../src';
import DidReceiveSettingsEvent from '../../../src/events/incoming/DidReceiveSettingsEvent';
import EventValidationError from '../../../src/events/incoming/exception/EventValidationError';
import eventInvalidType from './fixtures/didReceiveSettingsEvent.invalid-eventtype.json';
import eventMissingParam from './fixtures/didReceiveSettingsEvent.missing-param.json';
import eventValid from './fixtures/didReceiveSettingsEvent.valid.json';

describe('DidReceiveSettingsEvent test', () => {
  it('should create the event when using the correct payload', function () {
    const event = new DidReceiveSettingsEvent(eventValid);
    expect(event.action).to.equal('com.elgato.example.action1');
    expect(event.context).to.equal('aopaqueValue');
    expect(event.device).to.equal('adevice');
    expect(event.event).to.equal(IncomingEvents.DidReceiveSettings);
    expect(event.column).to.equal(3);
    expect(event.row).to.equal(1);
    expect(event.isInMultiAction).to.be.false;
  });
  it('should throw a validation error on missing parameters', function () {
    expect(() => new DidReceiveSettingsEvent(eventMissingParam)).to.throw(EventValidationError, /device/);
  });
  it('should throw a validation error on wrong event type', function () {
    expect(() => new DidReceiveSettingsEvent(eventInvalidType)).to.throw(EventValidationError, /didReceiveSettings/);
  });
});
