import { Static } from '@sinclair/typebox';
import AbstractIncomingBaseEvent from '../AbstractIncomingBaseEvent';
import assertType from '../assertType';
import { ApplicationEventType } from '../streamdecktypes/ApplicationEventType';

export default abstract class AbstractApplicationEvent extends AbstractIncomingBaseEvent {
  protected readonly eventPayload: Static<typeof ApplicationEventType>;

  protected constructor(payload: unknown) {
    super(payload);
    assertType(ApplicationEventType, payload);
    this.eventPayload = payload;
  }

  public get application(): string {
    return this.eventPayload.payload.application;
  }
}
