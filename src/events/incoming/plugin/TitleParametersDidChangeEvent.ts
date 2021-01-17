import AbstractIncomingExtendedEvent from "../AbstractIncomingExtendedEvent";
import { IncomingPluginEventsEnum } from "./IncomingPluginEventsEnum";

export default class TitleParametersDidChangeEvent extends AbstractIncomingExtendedEvent {
  constructor(payload: unknown) {
    super(payload);
  }

  protected get eventType(): IncomingPluginEventsEnum {
    return IncomingPluginEventsEnum.TitleParametersDidChange;
  }
};
