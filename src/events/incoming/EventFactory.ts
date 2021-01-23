import { MessageEvent } from "isomorphic-ws";
import { Logger } from "ts-log";
import AbstractIncomingBaseEvent from "./AbstractIncomingBaseEvent";
import AbstractIncomingExtendedEvent from "./AbstractIncomingExtendedEvent";
import DidReceiveGlobalSettingsEvent from "./DidReceiveGlobalSettingsEvent";
import DidReceiveSettingsEvent from "./DidReceiveSettingsEvent";
import JsonParseError from "./exception/JsonParseError";
import MissingEventInPayloadError from "./exception/MissingEventInPayloadError";
import UnknownEventError from "./exception/UnknownEventError";
import { IncomingEvents } from "./IncomingEvents";
import {
  DeviceDidConnectEvent,
  DeviceDidDisconnectEvent,
  IncomingPluginEvents,
  KeyDownEvent,
  KeyUpEvent,
  PropertyInspectorDidAppearEvent,
  PropertyInspectorDidDisappearEvent,
  SendToPluginIncomingEvent,
  TitleParametersDidChangeEvent,
  WillAppearEvent,
  WillDisappearEvent
} from "./plugin";

interface BasicIncomingEvent {
  event: IncomingEvents | IncomingPluginEvents;
}

function isBasicIncomingEvent(event: unknown): event is BasicIncomingEvent {
  return (event as BasicIncomingEvent).hasOwnProperty("event") && (event as BasicIncomingEvent)["event"].length > 0;
}

type IncomingEventTypes =
  AbstractIncomingBaseEvent
  | AbstractIncomingExtendedEvent
  | DeviceDidConnectEvent
  | DeviceDidDisconnectEvent
  | SendToPluginIncomingEvent;

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
      case IncomingEvents.DidReceiveSettings:
        return new DidReceiveSettingsEvent(payload);
      case IncomingEvents.DidReceiveGlobalSettings:
        return new DidReceiveGlobalSettingsEvent(payload);
      case IncomingPluginEvents.DeviceDidConnect:
        return new DeviceDidConnectEvent(payload);
      case IncomingPluginEvents.DeviceDidDisconnect:
        return new DeviceDidDisconnectEvent(payload);
      case IncomingPluginEvents.KeyDown:
        return new KeyDownEvent(payload);
      case IncomingPluginEvents.KeyUp:
        return new KeyUpEvent(payload);
      case IncomingPluginEvents.PropertyInspectorDidAppear:
        return new PropertyInspectorDidAppearEvent(payload);
      case IncomingPluginEvents.PropertyInspectorDidDisappear:
        return new PropertyInspectorDidDisappearEvent(payload);
      case IncomingPluginEvents.SendToPlugin:
        return new SendToPluginIncomingEvent(payload);
      case IncomingPluginEvents.TitleParametersDidChange:
        return new TitleParametersDidChangeEvent(payload);
      case IncomingPluginEvents.WillAppear:
        return new WillAppearEvent(payload);
      case IncomingPluginEvents.WillDisappear:
        return new WillDisappearEvent(payload);
      default:
        throw new UnknownEventError("unknown event: " + payload.event + " in data: " + JSON.stringify(payload));
    }
  }
};
