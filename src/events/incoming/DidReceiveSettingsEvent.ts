import assertType from "./assertType";
import { IncomingEvents } from "./IncomingEvents";
import AbstractStateEvent from "./plugin/AbstractStateEvent";
import { DidReceiveSettingsType } from "./streamdecktypes/SettingsEventType";

export default class DidReceiveSettingsEvent extends AbstractStateEvent {
  public constructor(payload: unknown) {
    super(payload);
    assertType(DidReceiveSettingsType, payload);
  }

  protected get eventType(): IncomingEvents {
    return IncomingEvents.DidReceiveSettings;
  }
};
