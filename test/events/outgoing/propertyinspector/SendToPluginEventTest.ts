import { expect, use } from 'chai';
import jsonschema from 'chai-json-schema';
import 'mocha';
import SendToPluginEvent from '../../../../src/events/outgoing/propertyinspector/SendToPluginEvent';
import { SendToPluginSchema } from '../types';

use(jsonschema);

describe('SendToPluginEventTest test', () => {
  it('validates the event against the json schema', () => {
    const event = new SendToPluginEvent('action', 'context', { foo: 'bar' });
    expect(JSON.parse(JSON.stringify(event))).to.be.jsonSchema(SendToPluginSchema);
  });
  it('returns the right values for the event', () => {
    const event = new SendToPluginEvent('action', 'context', { foo: 'bar' });
    expect(JSON.parse(JSON.stringify(event)).context).to.equal('context');
    expect(JSON.parse(JSON.stringify(event)).payload.foo).to.equal('bar');
  });
});
