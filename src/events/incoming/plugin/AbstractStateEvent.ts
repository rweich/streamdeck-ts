import { Static } from '@sinclair/typebox';
import AbstractIncomingExtendedEvent from '../AbstractIncomingExtendedEvent';
import assertType from '../assertType';
import { StateEventType } from '../streamdecktypes/StateEventType';

export default abstract class AbstractStateEvent extends AbstractIncomingExtendedEvent {
  protected eventPayload: Static<typeof StateEventType>;

  protected constructor(payload: unknown) {
    super(payload);
    assertType(StateEventType, payload);
    this.eventPayload = payload;
  }

  public get settings(): unknown {
    return this.eventPayload.payload.settings;
  }

  public get row(): number {
    return this.eventPayload.payload.coordinates.row;
  }

  public get column(): number {
    return this.eventPayload.payload.coordinates.column;
  }

  public get isInMultiAction(): boolean {
    return this.eventPayload.payload.isInMultiAction;
  }

  public get state(): number | undefined {
    return this.eventPayload.payload.state;
  }
}
