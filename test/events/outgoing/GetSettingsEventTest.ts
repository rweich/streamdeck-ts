import { expect, use } from 'chai';
import jsonschema from 'chai-json-schema';
import 'mocha';
import GetSettingsEvent from '../../../src/events/outgoing/GetSettingsEvent';
import { GetSettingsSchema } from './types';

use(jsonschema);

describe('GetSettingsEventTest test', () => {
  it('validates the event against the json schema', () => {
    const event = new GetSettingsEvent('context');
    expect(JSON.parse(JSON.stringify(event))).to.be.jsonSchema(GetSettingsSchema);
  });
  it('returns the right values for the event', () => {
    const event = new GetSettingsEvent('context');
    expect(JSON.parse(JSON.stringify(event)).context).to.equal('context');
  });
});
