import { MessageEvent } from "isomorphic-ws";
import AbstractIncomingExtendedEvent from "./AbstractIncomingExtendedEvent";
import JsonParseError from "./exception/JsonParseError";
import MissingEventInPayloadError from "./exception/MissingEventInPayloadError";
import UnknownEventError from "./exception/UnknownEventError";
import DeviceDidConnectEvent from "./plugin/DeviceDidConnectEvent";
import DeviceDidDisconnectEvent from "./plugin/DeviceDidDisconnectEvent";
import { IncomingPluginEventsEnum } from "./plugin/IncomingPluginEventsEnum";
import KeyDownEvent from "./plugin/KeyDownEvent";
import KeyUpEvent from "./plugin/KeyUpEvent";
import TitleParametersDidChangeEvent from "./plugin/TitleParametersDidChangeEvent";
import WillAppearEvent from "./plugin/WillAppearEvent";
import WillDisappearEvent from "./plugin/WillDisappearEvent";

interface BasicIncomingEvent {
  event: IncomingPluginEventsEnum;
}

function isBasicIncomingEvent(event: unknown): event is BasicIncomingEvent {
  return (event as BasicIncomingEvent).hasOwnProperty("event") && (event as BasicIncomingEvent)["event"].length > 0;
}

export default class EventFactory {
  public createByMessageEvent(messageEvent: MessageEvent) {
    console.log("got message", messageEvent);
    let data;

    try {
      data = JSON.parse(messageEvent.data.toString());
    } catch (e) {
      throw new JsonParseError("error on parsing json: " + e.toString());
    }
    console.log("event data:", data);
    return this.createEventByPayload(data);
  }

  private createEventByPayload(payload: object): AbstractIncomingExtendedEvent | DeviceDidConnectEvent | DeviceDidDisconnectEvent {
    if (!isBasicIncomingEvent(payload)) {
      throw new MissingEventInPayloadError("no event type in received data: " + JSON.stringify(payload));
    }

    switch (payload.event) {
      case IncomingPluginEventsEnum.KeyUp:
        return new KeyUpEvent(payload);
      case IncomingPluginEventsEnum.KeyDown:
        return new KeyDownEvent(payload);
      case IncomingPluginEventsEnum.WillAppear:
        return new WillAppearEvent(payload);
      case IncomingPluginEventsEnum.WillDisappear:
        return new WillDisappearEvent(payload);
      case IncomingPluginEventsEnum.DeviceDidConnect:
        return new DeviceDidConnectEvent(payload);
      case IncomingPluginEventsEnum.DeviceDidDisconnect:
        return new DeviceDidDisconnectEvent(payload);
      case IncomingPluginEventsEnum.TitleParametersDidChange:
        return new TitleParametersDidChangeEvent(payload);
      default:
        throw new UnknownEventError("unknown event: " + payload.event + " in data: " + JSON.stringify(payload));
    }
  }
};
