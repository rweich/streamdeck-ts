import { expect } from "chai";
import "mocha";
import EventValidationError from "../../../../../src/streamdeck/events/incoming/exception/EventValidationError";
import { IncomingPluginEventsEnum } from "../../../../../src/streamdeck/events/incoming/plugin/IncomingPluginEventsEnum";
import SendToPluginEvent from "../../../../../src/streamdeck/events/incoming/plugin/SendToPluginEvent";

describe("SendToPluginEvent test", () => {
  it("should create the event when using the correct payload", function () {
    const recievedEvent = require("../fixtures/sendToPluginEvent.valid.json");
    const event = new SendToPluginEvent(recievedEvent);
    expect(event.event).to.equal(IncomingPluginEventsEnum.SendToPlugin);
    expect(event.action).to.equal("com.elgato.example.action1");
    expect(event.context).to.equal("opaqueValue312");
  });
  it("should throw a validation error on missing keydown parameters", function () {
    const recievedEvent = require("../fixtures/sendToPluginEvent.missing-param.json");
    expect(() => new SendToPluginEvent(recievedEvent)).to.throw(EventValidationError, /required property .*payload/);
  });
  it("should throw a validation error on wrong event type", function () {
    const recievedEvent = require("../fixtures/sendToPluginEvent.invalid-eventtype.json");
    expect(() => new SendToPluginEvent(recievedEvent)).to.throw(EventValidationError, /match pattern .*sendToPlugin/);
  });
});
