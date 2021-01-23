import { Static } from "@sinclair/typebox";
import assertType from "./assertType";
import { IncomingEvents } from "./IncomingEvents";
import { IncomingPluginEvents } from "./plugin/IncomingPluginEvents";
import { IncomingPropertyinspectorEvents } from "./propertyinspector/IncomingPropertyinspectorEvents";
import { BaseEventType } from "./streamdecktypes/BaseEventType";

export type IncomingEventsTypes = IncomingEvents | IncomingPluginEvents | IncomingPropertyinspectorEvents;

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
