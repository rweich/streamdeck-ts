import { Type } from '@sinclair/typebox';
import { expect, use } from 'chai';
import jsonschema from 'chai-json-schema';
import 'mocha';
import RegisterEvent from '../../../src/events/outgoing/RegisterEvent';

use(jsonschema);

const schema = Type.Object({
  event: Type.String(),
  uuid: Type.String(),
});

describe('RegisterEvent test', () => {
  it('validates against the json schema', () => {
    const event = new RegisterEvent('eventname', 'uuid');
    expect(JSON.parse(JSON.stringify(event))).to.be.jsonSchema(schema);
  });
  it('returns the right values', () => {
    const event = new RegisterEvent('eventname', 'theuuid');
    const obj = JSON.parse(JSON.stringify(event));
    expect(obj.event).to.equal('eventname');
    expect(obj.uuid).to.equal('theuuid');
  });
});
