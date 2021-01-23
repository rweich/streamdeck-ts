import { Static } from "@sinclair/typebox";
import assertType from "../assertType";
import { DeviceDidDisconnectType } from "../streamdecktypes/DeviceEventType";
import DeviceDidConnectEvent from "./DeviceDidConnectEvent";
import { IncomingPluginEvents } from "./IncomingPluginEvents";

export default class DeviceDidDisconnectEvent extends DeviceDidConnectEvent {
  protected readonly payload: Static<typeof DeviceDidDisconnectType>;

  public constructor(payload: unknown) {
    super(payload);
    assertType(DeviceDidDisconnectType, payload);
    this.payload = payload;
  }

  public get name() {
    return this.payload.deviceInfo.name;
  }

  public get type() {
    return this.payload.deviceInfo.type;
  }

  public get columns() {
    return this.payload.deviceInfo.size.columns;
  }

  public get rows() {
    return this.payload.deviceInfo.size.rows;
  }

  protected get eventType(): IncomingPluginEvents {
    return IncomingPluginEvents.DeviceDidConnect;
  }
};
