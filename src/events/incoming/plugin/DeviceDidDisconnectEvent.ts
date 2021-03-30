import { Static } from '@sinclair/typebox';
import AbstractIncomingBaseEvent from '../AbstractIncomingBaseEvent';
import assertType from '../assertType';
import { DeviceDidDisconnectType } from '../streamdecktypes/DeviceEventType';

export default class DeviceDidDisconnectEvent extends AbstractIncomingBaseEvent {
  protected readonly eventPayload: Static<typeof DeviceDidDisconnectType>;

  public constructor(payload: unknown) {
    super(payload);
    assertType(DeviceDidDisconnectType, payload);
    this.eventPayload = payload;
  }

  public get device(): string {
    return this.eventPayload.device;
  }
}
