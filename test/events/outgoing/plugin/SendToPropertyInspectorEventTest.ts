import { expect, use } from 'chai';
import jsonschema from 'chai-json-schema';
import 'mocha';
import SendToPropertyInspectorEvent from '../../../../src/events/outgoing/plugin/SendToPropertyInspectorEvent';
import { SendToPropertyInspectorSchema } from '../types';

use(jsonschema);

describe('SendToPropertyInspectorEventTest test', () => {
  it('validates the event against the json schema', () => {
    const event = new SendToPropertyInspectorEvent('action', 'context', { foo: 'bar' });
    expect(JSON.parse(JSON.stringify(event))).to.be.jsonSchema(SendToPropertyInspectorSchema);
  });
  it('returns the right values for the event', () => {
    const event = new SendToPropertyInspectorEvent('action', 'context', { foo: 'bar' });
    expect(JSON.parse(JSON.stringify(event)).context).to.equal('context');
    expect(JSON.parse(JSON.stringify(event)).payload.foo).to.equal('bar');
  });
});
