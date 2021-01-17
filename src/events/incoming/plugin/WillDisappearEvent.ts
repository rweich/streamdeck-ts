import { Static } from "@sinclair/typebox";
import assertType from "../assertType";
import { WillDisappearEventType } from "../streamdecktypes/StateEventType";
import AbstractStateEvent from "./AbstractStateEvent";
import { IncomingPluginEventsEnum } from "./IncomingPluginEventsEnum";

export default class WillDisappearEvent extends AbstractStateEvent {
  protected payload: Static<typeof WillDisappearEventType>;

  constructor(payload: unknown) {
    super(payload);
    assertType(WillDisappearEventType, payload);
    this.payload = payload;
  }

  protected get eventType(): IncomingPluginEventsEnum {
    return IncomingPluginEventsEnum.WillDisappear;
  }
};
