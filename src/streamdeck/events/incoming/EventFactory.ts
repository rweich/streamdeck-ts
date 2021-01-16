import { MessageEvent } from "isomorphic-ws";
import { Logger } from "ts-log";
import AbstractIncomingBaseEvent from "./AbstractIncomingBaseEvent";
import AbstractIncomingExtendedEvent from "./AbstractIncomingExtendedEvent";
import DidReceiveGlobalSettingsEvent from "./DidReceiveGlobalSettingsEvent";
import DidReceiveSettingsEvent from "./DidReceiveSettingsEvent";
import JsonParseError from "./exception/JsonParseError";
import MissingEventInPayloadError from "./exception/MissingEventInPayloadError";
import UnknownEventError from "./exception/UnknownEventError";
import { IncomingEventsEnum } from "./IncomingEventsEnum";
import DeviceDidConnectEvent from "./plugin/DeviceDidConnectEvent";
import DeviceDidDisconnectEvent from "./plugin/DeviceDidDisconnectEvent";
import { IncomingPluginEventsEnum } from "./plugin/IncomingPluginEventsEnum";
import KeyDownEvent from "./plugin/KeyDownEvent";
import KeyUpEvent from "./plugin/KeyUpEvent";
import PropertyInspectorDidAppearEvent from "./plugin/PropertyInspectorDidAppearEvent";
import PropertyInspectorDidDisappearEvent from "./plugin/PropertyInspectorDidDisappearEvent";
import SendToPluginEvent from "./plugin/SendToPluginEvent";
import TitleParametersDidChangeEvent from "./plugin/TitleParametersDidChangeEvent";
import WillAppearEvent from "./plugin/WillAppearEvent";
import WillDisappearEvent from "./plugin/WillDisappearEvent";

interface BasicIncomingEvent {
  event: IncomingEventsEnum | IncomingPluginEventsEnum;
}

function isBasicIncomingEvent(event: unknown): event is BasicIncomingEvent {
  return (event as BasicIncomingEvent).hasOwnProperty("event") && (event as BasicIncomingEvent)["event"].length > 0;
}

type IncomingEventTypes =
  AbstractIncomingBaseEvent
  | AbstractIncomingExtendedEvent
  | DeviceDidConnectEvent
  | DeviceDidDisconnectEvent
  | SendToPluginEvent;

export default class EventFactory {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  public createByMessageEvent(messageEvent: MessageEvent) {
    this.logger.debug("got message", messageEvent);
    let data;

    try {
      data = JSON.parse(messageEvent.data.toString());
    } catch (e) {
      throw new JsonParseError("error on parsing json: " + e.toString());
    }
    this.logger.debug("event data:", data);
    return this.createEventByPayload(data);
  }

  private createEventByPayload(payload: object): IncomingEventTypes {
    if (!isBasicIncomingEvent(payload)) {
      throw new MissingEventInPayloadError("no event type in received data: " + JSON.stringify(payload));
    }

    switch (payload.event) {
      case IncomingEventsEnum.DidReceiveSettings:
        return new DidReceiveSettingsEvent(payload);
      case IncomingEventsEnum.DidReceiveGlobalSettings:
        return new DidReceiveGlobalSettingsEvent(payload);
      case IncomingPluginEventsEnum.DeviceDidConnect:
        return new DeviceDidConnectEvent(payload);
      case IncomingPluginEventsEnum.DeviceDidDisconnect:
        return new DeviceDidDisconnectEvent(payload);
      case IncomingPluginEventsEnum.KeyDown:
        return new KeyDownEvent(payload);
      case IncomingPluginEventsEnum.KeyUp:
        return new KeyUpEvent(payload);
      case IncomingPluginEventsEnum.PropertyInspectorDidAppear:
        return new PropertyInspectorDidAppearEvent(payload);
      case IncomingPluginEventsEnum.PropertyInspectorDidDisappear:
        return new PropertyInspectorDidDisappearEvent(payload);
      case IncomingPluginEventsEnum.SendToPlugin:
        return new SendToPluginEvent(payload);
      case IncomingPluginEventsEnum.TitleParametersDidChange:
        return new TitleParametersDidChangeEvent(payload);
      case IncomingPluginEventsEnum.WillAppear:
        return new WillAppearEvent(payload);
      case IncomingPluginEventsEnum.WillDisappear:
        return new WillDisappearEvent(payload);
      default:
        throw new UnknownEventError("unknown event: " + payload.event + " in data: " + JSON.stringify(payload));
    }
  }
};
