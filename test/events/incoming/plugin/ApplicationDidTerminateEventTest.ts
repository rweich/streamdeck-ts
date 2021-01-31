import { expect } from 'chai';
import 'mocha';
import { IncomingPluginEvents } from '../../../../src';
import EventValidationError from '../../../../src/events/incoming/exception/EventValidationError';
import ApplicationDidTerminateEvent from '../../../../src/events/incoming/plugin/ApplicationDidTerminateEvent';
import eventInvalidType from '../fixtures/applicationDidTerminateEvent.invalid-eventtype.json';
import eventMissingParam from '../fixtures/applicationDidTerminateEvent.missing-param.json';
import eventValid from '../fixtures/applicationDidTerminateEvent.valid.json';

describe('ApplicationDidTerminateEvent test', () => {
  it('should create the event when using the correct payload', function () {
    const event = new ApplicationDidTerminateEvent(eventValid);
    expect(event.event).to.equal(IncomingPluginEvents.ApplicationDidTerminate);
    expect(event.application).to.equal('com.apple.mails');
  });
  it('should throw a validation error on missing parameters', function () {
    expect(() => new ApplicationDidTerminateEvent(eventMissingParam)).to.throw(
      EventValidationError,
      /required property 'application'/,
    );
  });
  it('should throw a validation error on wrong event type', function () {
    expect(() => new ApplicationDidTerminateEvent(eventInvalidType)).to.throw(
      EventValidationError,
      /match pattern .*applicationDidTerminate/,
    );
  });
});
