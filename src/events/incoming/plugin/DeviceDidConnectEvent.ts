import { Static } from '@sinclair/typebox';
import AbstractIncomingBaseEvent from '../AbstractIncomingBaseEvent';
import assertType from '../assertType';
import { DeviceDidConnectType } from '../streamdecktypes/DeviceEventType';
import { IncomingPluginEvents } from './IncomingPluginEvents';

export default class DeviceDidConnectEvent extends AbstractIncomingBaseEvent {
  protected readonly payload: Static<typeof DeviceDidConnectType>;

  public constructor(payload: unknown) {
    super(payload);
    assertType(DeviceDidConnectType, payload);
    this.payload = payload;
  }

  public get device(): string {
    return this.payload.device;
  }

  public get name(): string {
    return this.payload.deviceInfo.name;
  }

  public get type(): number {
    return this.payload.deviceInfo.type;
  }

  public get columns(): number {
    return this.payload.deviceInfo.size.columns;
  }

  public get rows(): number {
    return this.payload.deviceInfo.size.rows;
  }

  protected get eventType(): IncomingPluginEvents {
    return IncomingPluginEvents.DeviceDidConnect;
  }
}
