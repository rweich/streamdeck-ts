import { IncomingEventsTypes } from "../AbstractIncomingBaseEvent";
import AbstractIncomingExtendedEvent from "../AbstractIncomingExtendedEvent";
import assertType from "../assertType";
import { PropertyInspectorDidDisppearEventType } from "../streamdecktypes/PropertyInspectorEventType";
import { IncomingPluginEventsEnum } from "./IncomingPluginEventsEnum";

export default class PropertyInspectorDidDisappearEvent extends AbstractIncomingExtendedEvent {
  constructor(payload: unknown) {
    super(payload);
    assertType(PropertyInspectorDidDisppearEventType, payload);
  }

  protected get eventType(): IncomingEventsTypes {
    return IncomingPluginEventsEnum.PropertyInspectorDidDisappear;
  }
};
