import { expect } from 'chai';
import 'mocha';
import { IncomingPropertyinspectorEvents } from '../../../../src';
import EventValidationError from '../../../../src/events/incoming/exception/EventValidationError';
import { SendToPropertyInspectorIncomingEvent } from '../../../../src/events/incoming/propertyinspector';
import eventInvalidType from '../fixtures/sendToPropertyInspectorEvent.invalid-eventtype.json';
import eventMissingParam from '../fixtures/sendToPropertyInspectorEvent.missing-param.json';
import eventValid from '../fixtures/sendToPropertyInspectorEvent.valid.json';

describe('SendToPropertyinspectorEvent test', () => {
  it('should create the event when using the correct payload', function () {
    const event = new SendToPropertyInspectorIncomingEvent(eventValid);
    expect(event.event).to.equal(IncomingPropertyinspectorEvents.SendToPropertyInspector);
    expect(event.action).to.equal('com.elgato.example.action1');
    expect(event.context).to.equal('opaqueValuePI');
  });
  it('should throw a validation error on missing parameters', function () {
    expect(() => new SendToPropertyInspectorIncomingEvent(eventMissingParam)).to.throw(
      EventValidationError,
      /required property .*payload/,
    );
  });
  it('should throw a validation error on wrong event type', function () {
    expect(() => new SendToPropertyInspectorIncomingEvent(eventInvalidType)).to.throw(
      EventValidationError,
      /match pattern .*sendToPropertyInspector/,
    );
  });
  it('should create the event with different valid paylods', function () {
    const payload = eventValid;
    payload.payload = { some: 'payload' };
    expect(new SendToPropertyInspectorIncomingEvent(payload).payload.some).to.equal('payload');
    payload.payload = { some: { inner: 'payload' } };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(new SendToPropertyInspectorIncomingEvent(payload).payload.some.inner).to.equal('payload');
    payload.payload = { a: 'b', c: 'd' };
    expect(new SendToPropertyInspectorIncomingEvent(payload).payload.a).to.equal('b');
    expect(new SendToPropertyInspectorIncomingEvent(payload).payload.c).to.equal('d');
  });
});
