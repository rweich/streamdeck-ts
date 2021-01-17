import { expect } from "chai";
import "mocha";
import EventValidationError from "../../../../src/events/incoming/exception/EventValidationError";
import { IncomingPluginEventsEnum } from "../../../../src/events/incoming/plugin/IncomingPluginEventsEnum";
import KeyUpEvent from "../../../../src/events/incoming/plugin/KeyUpEvent";

describe("KeyUpEvent test", () => {
  it("should create the event when using the correct payload", function () {
    const recievedEvent = require("../fixtures/keyUpEvent.valid.json");
    const event = new KeyUpEvent(recievedEvent);
    expect(event.action).to.equal("some.up.action");
    expect(event.context).to.equal("zxcvfsda");
    expect(event.device).to.equal("rweqasd");
    expect(event.event).to.equal(IncomingPluginEventsEnum.KeyUp);
    expect(event.column).to.equal(2);
    expect(event.row).to.equal(5);
    expect(event.isInMultiAction).to.be.false;
  });
  it("should throw a validation error on missing keydown parameters", function () {
    const recievedEvent = require("../fixtures/keyUpEvent.missing-param.json");
    expect(() => new KeyUpEvent(recievedEvent)).to.throw(EventValidationError, /required property 'column'/);
  });
  it("should throw a validation error on wrong event type", function () {
    const recievedEvent = require("../fixtures/keyUpEvent.invalid-eventtype.json");
    expect(() => new KeyUpEvent(recievedEvent)).to.throw(EventValidationError, /match pattern .*keyUp/);
  });
});
