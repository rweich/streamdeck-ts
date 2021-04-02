import { Static } from '@sinclair/typebox';
import AbstractIncomingBaseEvent from './AbstractIncomingBaseEvent';
import { assertType } from './index';
import { SendToEventType } from './streamdecktypes/SendToEventType';

export default abstract class AbstractSendToEvent extends AbstractIncomingBaseEvent {
  protected readonly eventPayload: Static<typeof SendToEventType>;

  protected constructor(payload: unknown) {
    super(payload);
    assertType(SendToEventType, payload);
    this.eventPayload = payload;
  }

  public get action(): string {
    return this.eventPayload.action;
  }

  public get context(): string {
    return this.eventPayload.context;
  }

  public get payload(): Record<string, unknown> {
    return this.eventPayload.payload;
  }
}
