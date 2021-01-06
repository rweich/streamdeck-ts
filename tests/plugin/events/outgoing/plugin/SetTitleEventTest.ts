import { Type } from "@sinclair/typebox";
import { expect } from "chai";
import "mocha";
import SetTitleEvent from "../../../../../src/streamdeck/events/outgoing/plugin/SetTitleEvent";
import { TargetEnum } from "../../../../../src/streamdeck/events/outgoing/plugin/TargetEnum";

const chai = require("chai");
chai.use(require("chai-json-schema"));

const schema = Type.Object({
  event: Type.String({pattern: "setTitle"}),
  context: Type.String(),
  payload: Type.Object({
    title: Type.String(),
    target: Type.Number({minimum: 0, maximum: 2}),
    state: Type.Optional(Type.Number())
  })
});

describe("SetTitleEvent test", () => {
  it("validates a basic title event against the json schema", () => {
    const event = new SetTitleEvent("new title", "context");
    expect(JSON.parse(JSON.stringify(event))).to.be.jsonSchema(schema);
  });
  it("validates a targetted event against the json schema", () => {
    const event = new SetTitleEvent("new title", "context", TargetEnum.Hardware);
    expect(JSON.parse(JSON.stringify(event))).to.be.jsonSchema(schema);
  });
  it("validates an event with the sate set against the json schema", () => {
    const event = new SetTitleEvent("new title", "context", TargetEnum.Software, 1);
    expect(JSON.parse(JSON.stringify(event))).to.be.jsonSchema(schema);
  });
  it("returns the right values for a basic event", () => {
    const event = new SetTitleEvent("new title", "context");
    expect(JSON.parse(JSON.stringify(event)).payload.title).to.equal("new title");
    expect(JSON.parse(JSON.stringify(event)).payload.state).to.be.undefined;
  });
  it("returns the right values for a targetted event", () => {
    const event = new SetTitleEvent("new title2", "context", TargetEnum.Software);
    expect(JSON.parse(JSON.stringify(event)).payload.title).to.equal("new title2");
    expect(JSON.parse(JSON.stringify(event)).payload.target).to.equal(TargetEnum.Software);
  });
  it("returns the right values for an event with a specified state", () => {
    const event = new SetTitleEvent("new title3", "context", TargetEnum.Hardware, 1);
    expect(JSON.parse(JSON.stringify(event)).payload.title).to.equal("new title3");
    expect(JSON.parse(JSON.stringify(event)).payload.target).to.equal(TargetEnum.Hardware);
    expect(JSON.parse(JSON.stringify(event)).payload.state).to.equal(1);
  });
});
