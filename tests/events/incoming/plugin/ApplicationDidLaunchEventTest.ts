import { expect } from 'chai';
import 'mocha';
import { IncomingPluginEvents } from '../../../../src';
import EventValidationError from '../../../../src/events/incoming/exception/EventValidationError';
import ApplicationDidLaunchEvent from '../../../../src/events/incoming/plugin/ApplicationDidLaunchEvent';
import eventInvalidType from '../fixtures/applicationDidLaunchEvent.invalid-eventtype.json';
import eventMissingParam from '../fixtures/applicationDidLaunchEvent.missing-param.json';
import eventValid from '../fixtures/applicationDidLaunchEvent.valid.json';

describe('ApplicationDidLaunchEvent test', () => {
  it('should create the event when using the correct payload', function () {
    const event = new ApplicationDidLaunchEvent(eventValid);
    expect(event.event).to.equal(IncomingPluginEvents.ApplicationDidLaunch);
    expect(event.application).to.equal('com.apple.mail');
  });
  it('should throw a validation error on missing parameters', function () {
    expect(() => new ApplicationDidLaunchEvent(eventMissingParam)).to.throw(
      EventValidationError,
      /required property 'application'/,
    );
  });
  it('should throw a validation error on wrong event type', function () {
    expect(() => new ApplicationDidLaunchEvent(eventInvalidType)).to.throw(
      EventValidationError,
      /match pattern .*applicationDidLaunch/,
    );
  });
});
