import { Static } from '@sinclair/typebox';
import AbstractSendToEvent from '../AbstractSendToEvent';
import assertType from '../assertType';
import { SendToPluginEventType } from '../streamdecktypes/SendToEventType';

export default class SendToPluginIncomingEvent extends AbstractSendToEvent {
  protected readonly eventPayload: Static<typeof SendToPluginEventType>;

  constructor(payload: unknown) {
    super(payload);
    assertType(SendToPluginEventType, payload);
    this.eventPayload = payload;
  }

  /** @deprecated - use payload (will be removed with 2.x) */
  public get data(): unknown {
    return this.eventPayload.payload;
  }
}
