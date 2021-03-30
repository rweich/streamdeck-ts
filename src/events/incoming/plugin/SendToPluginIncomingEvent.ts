import { Static } from '@sinclair/typebox';
import AbstractIncomingBaseEvent from '../AbstractIncomingBaseEvent';
import assertType from '../assertType';
import { SendToPluginEventType } from '../streamdecktypes/SendToEventType';

export default class SendToPluginIncomingEvent extends AbstractIncomingBaseEvent {
  protected readonly eventPayload: Static<typeof SendToPluginEventType>;

  constructor(payload: unknown) {
    super(payload);
    assertType(SendToPluginEventType, payload);
    this.eventPayload = payload;
  }

  public get action(): string {
    return this.eventPayload.action;
  }

  public get context(): string {
    return this.eventPayload.context;
  }

  /** @deprecated - use payload (will be removed with 2.x) */
  public get data(): unknown {
    return this.eventPayload.payload;
  }

  public get payload(): Record<string, unknown> {
    return this.eventPayload.payload;
  }
}
