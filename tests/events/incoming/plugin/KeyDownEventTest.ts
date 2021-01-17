import { expect } from "chai";
import "mocha";
import EventValidationError from "../../../../src/events/incoming/exception/EventValidationError";
import { IncomingPluginEventsEnum } from "../../../../src/events/incoming/plugin/IncomingPluginEventsEnum";
import KeyDownEvent from "../../../../src/events/incoming/plugin/KeyDownEvent";

describe("KeyDownEvent test", () => {
  it("should create the event when using the correct payload", function () {
    const recievedEvent = require("../fixtures/keyDownEvent.valid.json");
    const event = new KeyDownEvent(recievedEvent);
    expect(event.action).to.equal("some.action");
    expect(event.context).to.equal("ewrwerwerwerwer");
    expect(event.device).to.equal("xxzxxzxzxzxxzxzxz");
    expect(event.event).to.equal(IncomingPluginEventsEnum.KeyDown);
    expect(event.column).to.equal(1);
    expect(event.row).to.equal(3);
    expect(event.isInMultiAction).to.be.false;
  });
  it("should throw a validation error on missing keydown parameters", function () {
    const recievedEvent = require("../fixtures/keyDownEvent.missing-param.json");
    expect(() => new KeyDownEvent(recievedEvent)).to.throw(EventValidationError, /required property 'context'/);
  });
  it("should throw a validation error on wrong event type", function () {
    const recievedEvent = require("../fixtures/keyDownEvent.invalid-eventtype.json");
    expect(() => new KeyDownEvent(recievedEvent)).to.throw(EventValidationError, /match pattern .*keyDown/);
  });
});
