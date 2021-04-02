import AbstractSendToEvent from '../AbstractSendToEvent';
import assertType from '../assertType';
import { SendToPropertyInspectorEventType } from '../streamdecktypes/SendToEventType';

export default class SendToPropertyInspectorIncomingEvent extends AbstractSendToEvent {
  constructor(payload: unknown) {
    super(payload);
    assertType(SendToPropertyInspectorEventType, payload);
  }
}
