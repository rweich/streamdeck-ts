import { Type } from "@sinclair/typebox";
import { expect } from "chai";
import "mocha";
import SendToPluginEvent from "../../../../../src/streamdeck/events/outgoing/propertyinspector/SendToPluginEvent";

const chai = require("chai");
chai.use(require("chai-json-schema"));

const schema = Type.Object({
  action: Type.String(),
  event: Type.String({pattern: "^sendToPlugin$"}),
  context: Type.String(),
  payload: Type.Any()
});

describe("SendToPluginEventTest test", () => {
  it("validates the event against the json schema", () => {
    const event = new SendToPluginEvent("action", "context", {foo: "bar"});
    expect(JSON.parse(JSON.stringify(event))).to.be.jsonSchema(schema);
  });
  it("returns the right values for the event", () => {
    const event = new SendToPluginEvent("action", "context", {foo: "bar"});
    expect(JSON.parse(JSON.stringify(event)).context).to.equal("context");
    expect(JSON.parse(JSON.stringify(event)).payload.foo).to.equal("bar");
  });
});
