import assertType from "./assertType";
import { IncomingEventsEnum } from "./IncomingEventsEnum";
import AbstractStateEvent from "./plugin/AbstractStateEvent";
import { DidReceiveSettingsType } from "./streamdecktypes/SettingsEventType";

export default class DidReceiveSettingsEvent extends AbstractStateEvent {
  public constructor(payload: unknown) {
    super(payload);
    assertType(DidReceiveSettingsType, payload);
  }

  protected get eventType(): IncomingEventsEnum {
    return IncomingEventsEnum.DidReceiveSettings;
  }
};
