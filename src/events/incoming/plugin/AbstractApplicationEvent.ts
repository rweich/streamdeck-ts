import { Static } from '@sinclair/typebox';
import AbstractIncomingBaseEvent from '../AbstractIncomingBaseEvent';
import assertType from '../assertType';
import { ApplicationEventType } from '../streamdecktypes/ApplicationEventType';

export default abstract class AbstractApplicationEvent extends AbstractIncomingBaseEvent {
  protected readonly payload: Static<typeof ApplicationEventType>;

  public constructor(payload: unknown) {
    super(payload);
    assertType(ApplicationEventType, payload);
    this.payload = payload;
  }

  public get application(): string {
    return this.payload.payload.application;
  }
}
