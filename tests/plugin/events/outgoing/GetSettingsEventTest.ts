import { Type } from "@sinclair/typebox";
import { expect } from "chai";
import "mocha";
import GetSettingsEvent from "../../../../src/streamdeck/events/outgoing/GetSettingsEvent";

const chai = require("chai");
chai.use(require("chai-json-schema"));

const schema = Type.Object({
  event: Type.String({pattern: "getSettings"}),
  context: Type.String()
});

describe("GetSettingsEventTest test", () => {
  it("validates the event against the json schema", () => {
    const event = new GetSettingsEvent("context");
    expect(JSON.parse(JSON.stringify(event))).to.be.jsonSchema(schema);
  });
  it("returns the right values for the event", () => {
    const event = new GetSettingsEvent("context");
    expect(JSON.parse(JSON.stringify(event)).context).to.equal("context");
  });
});
