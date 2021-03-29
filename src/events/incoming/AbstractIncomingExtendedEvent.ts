import { Static } from '@sinclair/typebox';
import AbstractIncomingBaseEvent from './AbstractIncomingBaseEvent';
import assertType from './assertType';
import { ExtendedEventType } from './streamdecktypes/ExtendedEventType';

export default abstract class AbstractIncomingExtendedEvent extends AbstractIncomingBaseEvent {
  protected readonly payload: Static<typeof ExtendedEventType>;

  protected constructor(payload: unknown) {
    super(payload);
    assertType(ExtendedEventType, payload);
    this.payload = payload;
  }

  public get action(): string {
    return this.payload.action;
  }

  public get context(): string {
    return this.payload.context;
  }

  public get device(): string {
    return this.payload.device;
  }
}
