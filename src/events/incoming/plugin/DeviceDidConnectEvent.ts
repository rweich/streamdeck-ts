import { Static } from '@sinclair/typebox';
import AbstractIncomingBaseEvent from '../AbstractIncomingBaseEvent';
import assertType from '../assertType';
import { DeviceDidConnectType } from '../streamdecktypes/DeviceEventType';
import { DeviceType } from './DeviceType';

export default class DeviceDidConnectEvent extends AbstractIncomingBaseEvent {
  protected readonly eventPayload: Static<typeof DeviceDidConnectType>;

  public constructor(payload: unknown) {
    super(payload);
    assertType(DeviceDidConnectType, payload);
    this.eventPayload = payload;
  }

  public get device(): string {
    return this.eventPayload.device;
  }

  public get name(): string {
    return this.eventPayload.deviceInfo.name;
  }

  public get type(): DeviceType {
    return this.eventPayload.deviceInfo.type;
  }

  public get columns(): number {
    return this.eventPayload.deviceInfo.size.columns;
  }

  public get rows(): number {
    return this.eventPayload.deviceInfo.size.rows;
  }
}
