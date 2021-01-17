import { Static } from "@sinclair/typebox";
import AbstractIncomingBaseEvent from "../AbstractIncomingBaseEvent";
import assertType from "../assertType";
import { DeviceDidConnectEventType } from "../streamdecktypes/DeviceEventType";
import { IncomingPluginEventsEnum } from "./IncomingPluginEventsEnum";

export default class DeviceDidConnectEvent extends AbstractIncomingBaseEvent {
  protected readonly payload: Static<typeof DeviceDidConnectEventType>;

  public constructor(payload: unknown) {
    super(payload);
    assertType(DeviceDidConnectEventType, payload);
    this.payload = payload;
  }

  public get device() {
    return this.payload.device;
  }

  protected get eventType(): IncomingPluginEventsEnum {
    return IncomingPluginEventsEnum.DeviceDidConnect;
  }
};
