import { Static } from "@sinclair/typebox";
import assertType from "./assertType";
import { IncomingEventsEnum } from "./IncomingEventsEnum";
import { IncomingPluginEventsEnum } from "./plugin/IncomingPluginEventsEnum";
import { IncomingPropertyinspectorEventsEnum } from "./propertyinspector/IncomingPropertyinspectorEventsEnum";
import { BaseEventType } from "./streamdecktypes/BaseEventType";

export type IncomingEventsTypes = IncomingEventsEnum | IncomingPluginEventsEnum | IncomingPropertyinspectorEventsEnum;

export default abstract class AbstractIncomingBaseEvent {
  protected readonly payload: Static<typeof BaseEventType>;

  protected constructor(payload: unknown) {
    assertType(BaseEventType, payload);
    this.payload = payload;
  }

  public get event() {
    return this.payload.event;
  }

  protected abstract get eventType(): IncomingEventsTypes;
};
