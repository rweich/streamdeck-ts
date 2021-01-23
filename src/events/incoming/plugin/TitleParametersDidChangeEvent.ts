import AbstractIncomingExtendedEvent from "../AbstractIncomingExtendedEvent";
import { IncomingPluginEvents } from "./IncomingPluginEvents";

export default class TitleParametersDidChangeEvent extends AbstractIncomingExtendedEvent {
  constructor(payload: unknown) {
    super(payload);
  }

  protected get eventType(): IncomingPluginEvents {
    return IncomingPluginEvents.TitleParametersDidChange;
  }
};
