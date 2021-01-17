import { Type } from "@sinclair/typebox";
import { expect } from "chai";
import "mocha";
import LogMessageEvent from "../../../../../src/streamdeck/events/outgoing/LogMessageEvent";

const chai = require("chai");
chai.use(require("chai-json-schema"));

const schema = Type.Object({
  event: Type.String({pattern: "^logMessage$"}),
  payload: Type.Object({
    message: Type.String(),
  })
});

describe("LogMessageEvent test", () => {
  it("validates the event against the json schema", () => {
    const event = new LogMessageEvent("new title");
    expect(JSON.parse(JSON.stringify(event))).to.be.jsonSchema(schema);
  });
  it("returns the right values for the event", () => {
    const event = new LogMessageEvent("new title");
    expect(JSON.parse(JSON.stringify(event)).payload.message).to.equal("new title");
  });
});
