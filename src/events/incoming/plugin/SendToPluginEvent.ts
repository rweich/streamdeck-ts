import { Static } from "@sinclair/typebox";
import AbstractIncomingBaseEvent, { IncomingEventsTypes } from "../AbstractIncomingBaseEvent";
import assertType from "../assertType";
import { SendToPluginEventType } from "../streamdecktypes/SendToEventType";
import { IncomingPluginEventsEnum } from "./IncomingPluginEventsEnum";

export default class SendToPluginEvent extends AbstractIncomingBaseEvent {
  protected readonly payload: Static<typeof SendToPluginEventType>;

  constructor(payload: unknown) {
    super(payload);
    assertType(SendToPluginEventType, payload);
    this.payload = payload;
  }

  public get action() {
    return this.payload.action;
  }

  public get context() {
    return this.payload.context;
  }

  public get data() {
    return this.payload.payload;
  }

  protected get eventType(): IncomingEventsTypes {
    return IncomingPluginEventsEnum.SendToPlugin;
  }
};
