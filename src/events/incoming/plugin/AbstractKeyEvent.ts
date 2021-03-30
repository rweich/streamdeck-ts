import { Static } from '@sinclair/typebox';
import AbstractIncomingExtendedEvent from '../AbstractIncomingExtendedEvent';
import assertType from '../assertType';
import { KeyEventType } from '../streamdecktypes/KeyEventType';

export default abstract class AbstractKeyEvent extends AbstractIncomingExtendedEvent {
  protected readonly eventPayload: Static<typeof KeyEventType>;

  protected constructor(payload: unknown) {
    super(payload);
    assertType(KeyEventType, payload);
    this.eventPayload = payload;
  }

  get row(): number {
    return this.eventPayload.payload.coordinates.row;
  }

  get column(): number {
    return this.eventPayload.payload.coordinates.column;
  }

  get isInMultiAction(): boolean {
    return this.eventPayload.payload.isInMultiAction;
  }
}
