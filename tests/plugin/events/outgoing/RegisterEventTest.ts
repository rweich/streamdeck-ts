import { Type } from "@sinclair/typebox";
import { expect } from "chai";
import "mocha";
import RegisterEvent from "../../../../src/streamdeck/events/outgoing/RegisterEvent";

const chai = require("chai");
chai.use(require("chai-json-schema"));

const schema = Type.Object({
  event: Type.String(),
  uuid: Type.String(),
});

describe("RegisterEvent test", () => {
  it("validates against the json schema", () => {
    const event = new RegisterEvent("eventname", "uuid");
    expect(JSON.parse(JSON.stringify(event))).to.be.jsonSchema(schema);
  });
  it("returns the right values", () => {
    const event = new RegisterEvent("eventname", "theuuid");
    let obj: any = JSON.parse(JSON.stringify(event));
    expect(obj.event).to.equal("eventname");
    expect(obj.uuid).to.equal("theuuid");
  });
});
