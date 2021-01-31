import { Type } from '@sinclair/typebox';
import { expect, use } from 'chai';
import jsonschema from 'chai-json-schema';
import 'mocha';
import SetSettingsEvent from '../../../src/events/outgoing/SetSettingsEvent';

use(jsonschema);

const schema = Type.Object({
  event: Type.String({ pattern: '^setSettings$' }),
  context: Type.String(),
  payload: Type.Any(),
});

describe('SetSettingsEventTest test', () => {
  it('validates the event against the json schema', () => {
    const event = new SetSettingsEvent('context', { foo: 'bar' });
    expect(JSON.parse(JSON.stringify(event))).to.be.jsonSchema(schema);
  });
  it('returns the right values for the event', () => {
    const event = new SetSettingsEvent('context', { foo: 'bar' });
    expect(JSON.parse(JSON.stringify(event)).context).to.equal('context');
    expect(JSON.parse(JSON.stringify(event)).payload.foo).to.equal('bar');
  });
});
