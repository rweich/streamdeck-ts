import { expect } from 'chai';
import 'mocha';
import DidReceiveGlobalSettingsEvent from '../../../src/events/incoming/DidReceiveGlobalSettingsEvent';
import EventValidationError from '../../../src/events/incoming/exception/EventValidationError';
import eventInvalidType from './fixtures/didReceiveGlobalSettingsEvent.invalid-eventtype.json';
import eventMissingParam from './fixtures/didReceiveGlobalSettingsEvent.missing-param.json';
import eventValid from './fixtures/didReceiveGlobalSettingsEvent.valid.json';

describe('DidReceiveSettingsEvent test', () => {
  it('should create the event when using the correct payload', function () {
    expect(new DidReceiveGlobalSettingsEvent(eventValid).settings).to.haveOwnProperty('foo');
  });
  it('should throw a validation error on missing parameters', function () {
    expect(() => new DidReceiveGlobalSettingsEvent(eventMissingParam)).to.throw(EventValidationError, /settings/);
  });
  it('should throw a validation error on wrong event type', function () {
    expect(() => new DidReceiveGlobalSettingsEvent(eventInvalidType)).to.throw(
      EventValidationError,
      /didReceiveGlobalSettings/,
    );
  });
});
