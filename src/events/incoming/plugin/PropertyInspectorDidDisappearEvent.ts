import AbstractIncomingExtendedEvent from '../AbstractIncomingExtendedEvent';
import assertType from '../assertType';
import { PropertyInspectorDidDisppearEventType } from '../streamdecktypes/PropertyInspectorEventType';

export default class PropertyInspectorDidDisappearEvent extends AbstractIncomingExtendedEvent {
  constructor(payload: unknown) {
    super(payload);
    assertType(PropertyInspectorDidDisppearEventType, payload);
  }
}
