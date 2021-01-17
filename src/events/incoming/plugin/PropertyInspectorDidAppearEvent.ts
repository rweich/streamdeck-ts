import { IncomingEventsTypes } from "../AbstractIncomingBaseEvent";
import AbstractIncomingExtendedEvent from "../AbstractIncomingExtendedEvent";
import assertType from "../assertType";
import { PropertyInspectorDidAppearEventType } from "../streamdecktypes/PropertyInspectorEventType";
import { IncomingPluginEventsEnum } from "./IncomingPluginEventsEnum";

export default class PropertyInspectorDidAppearEvent extends AbstractIncomingExtendedEvent {
  constructor(payload: unknown) {
    super(payload);
    assertType(PropertyInspectorDidAppearEventType, payload);
  }

  protected get eventType(): IncomingEventsTypes {
    return IncomingPluginEventsEnum.PropertyInspectorDidAppear;
  }
};
