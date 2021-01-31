import { expect } from 'chai';
import 'mocha';
import { IncomingPluginEvents } from '../../../../src';
import EventValidationError from '../../../../src/events/incoming/exception/EventValidationError';
import KeyUpEvent from '../../../../src/events/incoming/plugin/KeyUpEvent';
import eventInvalidType from '../fixtures/keyUpEvent.invalid-eventtype.json';
import eventMissingParam from '../fixtures/keyUpEvent.missing-param.json';
import eventValid from '../fixtures/keyUpEvent.valid.json';

describe('KeyUpEvent test', () => {
  it('should create the event when using the correct payload', function () {
    const event = new KeyUpEvent(eventValid);
    expect(event.action).to.equal('some.up.action');
    expect(event.context).to.equal('zxcvfsda');
    expect(event.device).to.equal('rweqasd');
    expect(event.event).to.equal(IncomingPluginEvents.KeyUp);
    expect(event.column).to.equal(2);
    expect(event.row).to.equal(5);
    expect(event.isInMultiAction).to.be.false;
  });
  it('should throw a validation error on missing keydown parameters', function () {
    expect(() => new KeyUpEvent(eventMissingParam)).to.throw(EventValidationError, /required property 'column'/);
  });
  it('should throw a validation error on wrong event type', function () {
    expect(() => new KeyUpEvent(eventInvalidType)).to.throw(EventValidationError, /match pattern .*keyUp/);
  });
});
