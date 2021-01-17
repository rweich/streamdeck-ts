import AbstractStateEvent from "./AbstractStateEvent";
import { IncomingPluginEventsEnum } from "./IncomingPluginEventsEnum";

export default class WillDisappearEvent extends AbstractStateEvent {
  constructor(payload: unknown) {
    super(payload);
    //todo validate
  }

  protected get eventType(): IncomingPluginEventsEnum {
    return IncomingPluginEventsEnum.WillDisappear;
  }
};
