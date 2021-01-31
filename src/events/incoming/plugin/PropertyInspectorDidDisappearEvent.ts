import { IncomingEventsTypes } from '../AbstractIncomingBaseEvent';
import AbstractIncomingExtendedEvent from '../AbstractIncomingExtendedEvent';
import assertType from '../assertType';
import { PropertyInspectorDidDisppearEventType } from '../streamdecktypes/PropertyInspectorEventType';
import { IncomingPluginEvents } from './IncomingPluginEvents';

export default class PropertyInspectorDidDisappearEvent extends AbstractIncomingExtendedEvent {
  constructor(payload: unknown) {
    super(payload);
    assertType(PropertyInspectorDidDisppearEventType, payload);
  }

  protected get eventType(): IncomingEventsTypes {
    return IncomingPluginEvents.PropertyInspectorDidDisappear;
  }
}
