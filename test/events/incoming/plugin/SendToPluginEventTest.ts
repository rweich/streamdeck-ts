import { expect } from 'chai';
import 'mocha';
import { IncomingPluginEvents } from '../../../../src';
import EventValidationError from '../../../../src/events/incoming/exception/EventValidationError';
import SendToPluginIncomingEvent from '../../../../src/events/incoming/plugin/SendToPluginIncomingEvent';
import eventInvalidType from '../fixtures/sendToPluginEvent.invalid-eventtype.json';
import eventMissingParam from '../fixtures/sendToPluginEvent.missing-param.json';
import eventValid from '../fixtures/sendToPluginEvent.valid.json';

describe('SendToPluginEvent test', () => {
  it('should create the event when using the correct payload', function () {
    const event = new SendToPluginIncomingEvent(eventValid);
    expect(event.event).to.equal(IncomingPluginEvents.SendToPlugin);
    expect(event.action).to.equal('com.elgato.example.action1');
    expect(event.context).to.equal('opaqueValue312');
  });
  it('should throw a validation error on missing parameters', function () {
    expect(() => new SendToPluginIncomingEvent(eventMissingParam)).to.throw(
      EventValidationError,
      /required property .*payload/,
    );
  });
  it('should throw a validation error on wrong event type', function () {
    expect(() => new SendToPluginIncomingEvent(eventInvalidType)).to.throw(
      EventValidationError,
      /match pattern .*sendToPlugin/,
    );
  });
  it('should create the event with different valid paylods', function () {
    const payload = eventValid;
    payload.payload = { some: 'payload' };
    expect(new SendToPluginIncomingEvent(payload).payload.some).to.equal('payload');
    payload.payload = { some: { inner: 'payload' } };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(new SendToPluginIncomingEvent(payload).payload.some.inner).to.equal('payload');
    payload.payload = { a: 'b', c: 'd' };
    expect(new SendToPluginIncomingEvent(payload).payload.a).to.equal('b');
    expect(new SendToPluginIncomingEvent(payload).payload.c).to.equal('d');
  });
});
