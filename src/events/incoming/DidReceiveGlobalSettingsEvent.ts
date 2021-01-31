import { Static } from '@sinclair/typebox';
import AbstractIncomingBaseEvent from './AbstractIncomingBaseEvent';
import assertType from './assertType';
import { IncomingEvents } from './IncomingEvents';
import { DidReceiveGlobalSettingsType } from './streamdecktypes/SettingsEventType';

export default class DidReceiveGlobalSettingsEvent extends AbstractIncomingBaseEvent {
  protected payload: Static<typeof DidReceiveGlobalSettingsType>;

  constructor(payload: unknown) {
    super(payload);
    assertType(DidReceiveGlobalSettingsType, payload);
    this.payload = payload;
  }

  public get settings(): unknown {
    return this.payload.payload.settings;
  }

  protected get eventType(): IncomingEvents {
    return IncomingEvents.DidReceiveGlobalSettings;
  }
}
