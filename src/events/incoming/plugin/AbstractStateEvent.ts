import { Static } from '@sinclair/typebox';
import AbstractIncomingExtendedEvent from '../AbstractIncomingExtendedEvent';
import assertType from '../assertType';
import { StateEventType } from '../streamdecktypes/StateEventType';

export default abstract class AbstractStateEvent extends AbstractIncomingExtendedEvent {
  protected payload: Static<typeof StateEventType>;

  protected constructor(payload: unknown) {
    super(payload);
    assertType(StateEventType, payload);
    this.payload = payload;
  }

  public get settings(): unknown {
    return this.payload.payload.settings;
  }

  public get row(): number {
    return this.payload.payload.coordinates.row;
  }

  public get column(): number {
    return this.payload.payload.coordinates.column;
  }

  public get isInMultiAction(): boolean {
    return this.payload.payload.isInMultiAction;
  }

  public get state(): number | undefined {
    return this.payload.payload.state;
  }
}
