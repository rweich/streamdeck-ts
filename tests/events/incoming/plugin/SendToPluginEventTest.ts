import { expect } from "chai";
import "mocha";
import EventValidationError from "../../../../src/events/incoming/exception/EventValidationError";
import { IncomingPluginEvents } from "../../../../src/events/incoming/plugin/IncomingPluginEvents";
import SendToPluginIncomingEvent from "../../../../src/events/incoming/plugin/SendToPluginIncomingEvent";

describe("SendToPluginEvent test", () => {
  it("should create the event when using the correct payload", function () {
    const recievedEvent = require("../fixtures/sendToPluginEvent.valid.json");
    const event = new SendToPluginIncomingEvent(recievedEvent);
    expect(event.event).to.equal(IncomingPluginEvents.SendToPlugin);
    expect(event.action).to.equal("com.elgato.example.action1");
    expect(event.context).to.equal("opaqueValue312");
  });
  it("should throw a validation error on missing parameters", function () {
    const recievedEvent = require("../fixtures/sendToPluginEvent.missing-param.json");
    expect(() => new SendToPluginIncomingEvent(recievedEvent)).to.throw(EventValidationError, /required property .*payload/);
  });
  it("should throw a validation error on wrong event type", function () {
    const recievedEvent = require("../fixtures/sendToPluginEvent.invalid-eventtype.json");
    expect(() => new SendToPluginIncomingEvent(recievedEvent)).to.throw(EventValidationError, /match pattern .*sendToPlugin/);
  });
});
