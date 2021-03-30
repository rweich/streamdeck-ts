import { Static } from '@sinclair/typebox';
import AbstractIncomingBaseEvent from './AbstractIncomingBaseEvent';
import assertType from './assertType';
import { ExtendedEventType } from './streamdecktypes/ExtendedEventType';

export default abstract class AbstractIncomingExtendedEvent extends AbstractIncomingBaseEvent {
  protected readonly eventPayload: Static<typeof ExtendedEventType>;

  protected constructor(payload: unknown) {
    super(payload);
    assertType(ExtendedEventType, payload);
    this.eventPayload = payload;
  }

  public get action(): string {
    return this.eventPayload.action;
  }

  public get context(): string {
    return this.eventPayload.context;
  }

  public get device(): string {
    return this.eventPayload.device;
  }
}
