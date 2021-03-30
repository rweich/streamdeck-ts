import { Static } from '@sinclair/typebox';
import AbstractIncomingBaseEvent from './AbstractIncomingBaseEvent';
import assertType from './assertType';
import { DidReceiveGlobalSettingsType } from './streamdecktypes/SettingsEventType';

export default class DidReceiveGlobalSettingsEvent extends AbstractIncomingBaseEvent {
  protected eventPayload: Static<typeof DidReceiveGlobalSettingsType>;

  constructor(payload: unknown) {
    super(payload);
    assertType(DidReceiveGlobalSettingsType, payload);
    this.eventPayload = payload;
  }

  public get settings(): unknown {
    return this.eventPayload.payload.settings;
  }
}
