import { Static } from "@sinclair/typebox";
import AbstractIncomingBaseEvent from "./AbstractIncomingBaseEvent";
import assertType from "./assertType";
import { IncomingEventsEnum } from "./IncomingEventsEnum";
import { DidReceiveGlobalSettingsType } from "./streamdecktypes/SettingsEventType";

export default class DidReceiveGlobalSettingsEvent extends AbstractIncomingBaseEvent {
  protected payload: Static<typeof DidReceiveGlobalSettingsType>;

  constructor(payload: unknown) {
    super(payload);
    assertType(DidReceiveGlobalSettingsType, payload);
    this.payload = payload;
  }

  public get settings() {
    return this.payload.payload.settings;
  }

  protected get eventType(): IncomingEventsEnum {
    return IncomingEventsEnum.DidReceiveGlobalSettings;
  }
};
