import { expect, use } from 'chai';
import jsonschema from 'chai-json-schema';
import 'mocha';
import OpenUrlEvent from '../../../src/events/outgoing/OpenUrlEvent';
import { OpenUrlSchema } from './types';

use(jsonschema);

describe('OpenUrlEventTest test', () => {
  it('validates the event against the json schema', () => {
    const event = new OpenUrlEvent('url');
    expect(JSON.parse(JSON.stringify(event))).to.be.jsonSchema(OpenUrlSchema);
  });
  it('returns the right values for the event', () => {
    const event = new OpenUrlEvent('https://example.com');
    expect(JSON.parse(JSON.stringify(event)).payload.url).to.equal('https://example.com');
  });
});
