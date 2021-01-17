import AbstractOutgoingEvent from "./AbstractOutgoingEvent";
import { OutgoingEventsEnum } from "./OutgoingEventsEnum";

export default class GetSettingsEvent extends AbstractOutgoingEvent {
  constructor(context: string) {
    super(context);
  }

  public get event(): string {
    return OutgoingEventsEnum.GetSettings;
  }
};
