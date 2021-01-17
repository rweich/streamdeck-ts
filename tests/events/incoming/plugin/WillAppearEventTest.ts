import { expect } from "chai";
import "mocha";
import EventValidationError from "../../../../src/events/incoming/exception/EventValidationError";
import { IncomingPluginEventsEnum } from "../../../../src/events/incoming/plugin/IncomingPluginEventsEnum";
import WillAppearEvent from "../../../../src/events/incoming/plugin/WillAppearEvent";

describe("WillAppearEvent test", () => {
  it("should create the event when using the correct payload", function () {
    const recievedEvent = require("../fixtures/willAppearEvent.valid.json");
    const event = new WillAppearEvent(recievedEvent);
    expect(event.event).to.equal(IncomingPluginEventsEnum.WillAppear);
    expect(event.action).to.equal("my.willappear.action");
    expect(event.context).to.equal("willappearcontext");
  });
  it("should throw a validation error on missing parameters", function () {
    const recievedEvent = require("../fixtures/willAppearEvent.missing-param.json");
    expect(() => new WillAppearEvent(recievedEvent)).to.throw(EventValidationError, /required property 'device'/);
  });
  it("should throw a validation error on wrong event type", function () {
    const recievedEvent = require("../fixtures/willAppearEvent.invalid-eventtype.json");
    expect(() => new WillAppearEvent(recievedEvent)).to.throw(EventValidationError, /match pattern "\^willAppear\$"/);
  });
});
