import { expect } from "chai";
import "mocha";
import EventValidationError from "../../../../src/events/incoming/exception/EventValidationError";
import { IncomingPluginEvents } from "../../../../src/events/incoming/plugin/IncomingPluginEvents";
import WillDisappearEvent from "../../../../src/events/incoming/plugin/WillDisappearEvent";

describe("WillDisappearEvent test", () => {
  it("should create the event when using the correct payload", function () {
    const recievedEvent = require("../fixtures/willDisappearEvent.valid.json");
    const event = new WillDisappearEvent(recievedEvent);
    expect(event.event).to.equal(IncomingPluginEvents.WillDisappear);
    expect(event.action).to.equal("dsaaction");
    expect(event.context).to.equal("disacontext");
  });
  it("should throw a validation error on missing parameters", function () {
    const recievedEvent = require("../fixtures/willDisappearEvent.missing-param.json");
    expect(() => new WillDisappearEvent(recievedEvent)).to.throw(EventValidationError, /required property 'context'/);
  });
  it("should throw a validation error on wrong event type", function () {
    const recievedEvent = require("../fixtures/willDisappearEvent.invalid-eventtype.json");
    expect(() => new WillDisappearEvent(recievedEvent)).to.throw(EventValidationError, /match pattern "\^willDisappear\$"/);
  });
});
