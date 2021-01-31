import { expect } from 'chai';
import 'mocha';
import { IncomingPluginEvents } from '../../../../src';
import EventValidationError from '../../../../src/events/incoming/exception/EventValidationError';
import KeyDownEvent from '../../../../src/events/incoming/plugin/KeyDownEvent';
import eventInvalidType from '../fixtures/keyDownEvent.invalid-eventtype.json';
import eventMissingParam from '../fixtures/keyDownEvent.missing-param.json';
import eventValid from '../fixtures/keyDownEvent.valid.json';

describe('KeyDownEvent test', () => {
  it('should create the event when using the correct payload', function () {
    const event = new KeyDownEvent(eventValid);
    expect(event.action).to.equal('some.action');
    expect(event.context).to.equal('ewrwerwerwerwer');
    expect(event.device).to.equal('xxzxxzxzxzxxzxzxz');
    expect(event.event).to.equal(IncomingPluginEvents.KeyDown);
    expect(event.column).to.equal(1);
    expect(event.row).to.equal(3);
    expect(event.isInMultiAction).to.be.false;
  });
  it('should throw a validation error on missing keydown parameters', function () {
    expect(() => new KeyDownEvent(eventMissingParam)).to.throw(EventValidationError, /required property 'context'/);
  });
  it('should throw a validation error on wrong event type', function () {
    expect(() => new KeyDownEvent(eventInvalidType)).to.throw(EventValidationError, /match pattern .*keyDown/);
  });
});
