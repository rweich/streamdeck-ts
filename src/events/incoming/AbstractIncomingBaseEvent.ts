import { Static } from '@sinclair/typebox';
import assertType from './assertType';
import { BaseEventType } from './streamdecktypes/BaseEventType';

export default abstract class AbstractIncomingBaseEvent {
  protected readonly payload: Static<typeof BaseEventType>;

  protected constructor(payload: unknown) {
    assertType(BaseEventType, payload);
    this.payload = payload;
  }

  public get event(): string {
    return this.payload.event;
  }
}