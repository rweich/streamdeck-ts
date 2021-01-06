import { Static } from "@sinclair/typebox";
import AbstractIncomingBaseEvent from "./AbstractIncomingBaseEvent";
import assertType from "./assertType";
import { IncomingEventsEnum } from "./IncomingEventsEnum";
import { IncomingPluginEventsEnum } from "./plugin/IncomingPluginEventsEnum";
import { IncomingPropertyinspectorEventsEnum } from "./propertyinspector/IncomingPropertyinspectorEventsEnum";
import { ExtendedEventType } from "./streamdecktypes/ExtendedEventType";

export default abstract class AbstractIncomingExtendedEvent extends AbstractIncomingBaseEvent {
  protected readonly payload: Static<typeof ExtendedEventType>;

  protected constructor(payload: unknown) {
    super(payload);
    assertType(ExtendedEventType, payload);
    this.payload = payload;
  }

  public get action() {
    return this.payload.action;
  }

  public get context() {
    return this.payload.context;
  }

  public get device() {
    return this.payload.device;
  }

  protected abstract get eventType(): IncomingEventsEnum | IncomingPluginEventsEnum | IncomingPropertyinspectorEventsEnum;
};
