import AbstractIncomingExtendedEvent from '../AbstractIncomingExtendedEvent';
import assertType from '../assertType';
import { PropertyInspectorDidAppearEventType } from '../streamdecktypes/PropertyInspectorEventType';

export default class PropertyInspectorDidAppearEvent extends AbstractIncomingExtendedEvent {
  constructor(payload: unknown) {
    super(payload);
    assertType(PropertyInspectorDidAppearEventType, payload);
  }
}
