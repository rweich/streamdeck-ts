import { expect } from 'chai';
import 'mocha';
import { IncomingPluginEvents } from '../../../../src';
import EventValidationError from '../../../../src/events/incoming/exception/EventValidationError';
import WillAppearEvent from '../../../../src/events/incoming/plugin/WillAppearEvent';
import eventInvalidType from '../fixtures/willAppearEvent.invalid-eventtype.json';
import eventMissingParam from '../fixtures/willAppearEvent.missing-param.json';
import eventValid from '../fixtures/willAppearEvent.valid.json';

describe('WillAppearEvent test', () => {
  it('should create the event when using the correct payload', function () {
    const event = new WillAppearEvent(eventValid);
    expect(event.event).to.equal(IncomingPluginEvents.WillAppear);
    expect(event.action).to.equal('my.willappear.action');
    expect(event.context).to.equal('willappearcontext');
  });
  it('should throw a validation error on missing parameters', function () {
    expect(() => new WillAppearEvent(eventMissingParam)).to.throw(EventValidationError, /required property 'device'/);
  });
  it('should throw a validation error on wrong event type', function () {
    expect(() => new WillAppearEvent(eventInvalidType)).to.throw(
      EventValidationError,
      /match pattern "\^willAppear\$"/,
    );
  });
});
