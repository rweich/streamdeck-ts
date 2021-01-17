import { expect } from "chai";
import "mocha";
import DidReceiveSettingsEvent from "../../../../src/events/incoming/DidReceiveSettingsEvent";
import EventValidationError from "../../../../src/events/incoming/exception/EventValidationError";
import { IncomingEventsEnum } from "../../../../src/events/incoming/IncomingEventsEnum";

describe("DidReceiveSettingsEvent test", () => {
  it("should create the event when using the correct payload", function () {
    const recievedEvent = require("./fixtures/didReceiveSettingsEvent.valid.json");
    const event = new DidReceiveSettingsEvent(recievedEvent);
    expect(event.action).to.equal("com.elgato.example.action1");
    expect(event.context).to.equal("aopaqueValue");
    expect(event.device).to.equal("adevice");
    expect(event.event).to.equal(IncomingEventsEnum.DidReceiveSettings);
    expect(event.column).to.equal(3);
    expect(event.row).to.equal(1);
    expect(event.isInMultiAction).to.be.false;
  });
  it("should throw a validation error on missing parameters", function () {
    const recievedEvent = require("./fixtures/didReceiveSettingsEvent.missing-param.json");
    expect(() => new DidReceiveSettingsEvent(recievedEvent)).to.throw(EventValidationError, /device/);
  });
  it("should throw a validation error on wrong event type", function () {
    const recievedEvent = require("./fixtures/didReceiveSettingsEvent.invalid-eventtype.json");
    expect(() => new DidReceiveSettingsEvent(recievedEvent)).to.throw(EventValidationError, /didReceiveSettings/);
  });
});
