import { expect } from 'chai';
import 'mocha';
import { IncomingPluginEvents } from '../../../../src';
import EventValidationError from '../../../../src/events/incoming/exception/EventValidationError';
import WillDisappearEvent from '../../../../src/events/incoming/plugin/WillDisappearEvent';
import eventInvalidType from '../fixtures/willDisappearEvent.invalid-eventtype.json';
import eventMissingParam from '../fixtures/willDisappearEvent.missing-param.json';
import eventValid from '../fixtures/willDisappearEvent.valid.json';

describe('WillDisappearEvent test', () => {
  it('should create the event when using the correct payload', function () {
    const event = new WillDisappearEvent(eventValid);
    expect(event.event).to.equal(IncomingPluginEvents.WillDisappear);
    expect(event.action).to.equal('dsaaction');
    expect(event.context).to.equal('disacontext');
  });
  it('should throw a validation error on missing parameters', function () {
    expect(() => new WillDisappearEvent(eventMissingParam)).to.throw(
      EventValidationError,
      /required property 'context'/,
    );
  });
  it('should throw a validation error on wrong event type', function () {
    expect(() => new WillDisappearEvent(eventInvalidType)).to.throw(
      EventValidationError,
      /match pattern "\^willDisappear\$"/,
    );
  });
});
