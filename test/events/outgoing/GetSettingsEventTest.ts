import { Type } from '@sinclair/typebox';
import { expect, use } from 'chai';
import jsonschema from 'chai-json-schema';
import 'mocha';
import GetSettingsEvent from '../../../src/events/outgoing/GetSettingsEvent';

use(jsonschema);

const schema = Type.Object({
  event: Type.String({ pattern: '^getSettings$' }),
  context: Type.String(),
});

describe('GetSettingsEventTest test', () => {
  it('validates the event against the json schema', () => {
    const event = new GetSettingsEvent('context');
    expect(JSON.parse(JSON.stringify(event))).to.be.jsonSchema(schema);
  });
  it('returns the right values for the event', () => {
    const event = new GetSettingsEvent('context');
    expect(JSON.parse(JSON.stringify(event)).context).to.equal('context');
  });
});
