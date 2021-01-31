import { Static } from '@sinclair/typebox';
import AbstractIncomingBaseEvent, { IncomingEventsTypes } from '../AbstractIncomingBaseEvent';
import assertType from '../assertType';
import { SendToPluginEventType } from '../streamdecktypes/SendToEventType';
import { IncomingPluginEvents } from './IncomingPluginEvents';

export default class SendToPluginIncomingEvent extends AbstractIncomingBaseEvent {
  protected readonly payload: Static<typeof SendToPluginEventType>;

  constructor(payload: unknown) {
    super(payload);
    assertType(SendToPluginEventType, payload);
    this.payload = payload;
  }

  public get action(): string {
    return this.payload.action;
  }

  public get context(): string {
    return this.payload.context;
  }

  public get data(): unknown {
    return this.payload.payload;
  }

  protected get eventType(): IncomingEventsTypes {
    return IncomingPluginEvents.SendToPlugin;
  }
}
