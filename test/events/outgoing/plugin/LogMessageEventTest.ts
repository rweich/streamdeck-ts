import { Type } from '@sinclair/typebox';
import { expect, use } from 'chai';
import jsonschema from 'chai-json-schema';
import 'mocha';
import LogMessageEvent from '../../../../src/events/outgoing/LogMessageEvent';

use(jsonschema);

const schema = Type.Object({
  event: Type.String({ pattern: '^logMessage$' }),
  payload: Type.Object({
    message: Type.String(),
  }),
});

describe('LogMessageEvent test', () => {
  it('validates the event against the json schema', () => {
    const event = new LogMessageEvent('new title');
    expect(JSON.parse(JSON.stringify(event))).to.be.jsonSchema(schema);
  });
  it('returns the right values for the event', () => {
    const event = new LogMessageEvent('new title');
    expect(JSON.parse(JSON.stringify(event)).payload.message).to.equal('new title');
  });
});
