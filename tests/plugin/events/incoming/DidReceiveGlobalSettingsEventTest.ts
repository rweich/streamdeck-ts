import { expect } from "chai";
import "mocha";
import DidReceiveGlobalSettingsEvent from "../../../../src/streamdeck/events/incoming/DidReceiveGlobalSettingsEvent";
import EventValidationError from "../../../../src/streamdeck/events/incoming/exception/EventValidationError";

describe("DidReceiveSettingsEvent test", () => {
  it("should create the event when using the correct payload", function () {
    const recievedEvent = require("./fixtures/didReceiveGlobalSettingsEvent.valid.json");
    expect(new DidReceiveGlobalSettingsEvent(recievedEvent).settings).to.haveOwnProperty("foo");
  });
  it("should throw a validation error on missing parameters", function () {
    const recievedEvent = require("./fixtures/didReceiveGlobalSettingsEvent.missing-param.json");
    expect(() => new DidReceiveGlobalSettingsEvent(recievedEvent)).to.throw(EventValidationError, /settings/);
  });
  it("should throw a validation error on wrong event type", function () {
    const recievedEvent = require("./fixtures/didReceiveGlobalSettingsEvent.invalid-eventtype.json");
    expect(() => new DidReceiveGlobalSettingsEvent(recievedEvent)).to.throw(EventValidationError, /didReceiveGlobalSettings/);
  });
});
