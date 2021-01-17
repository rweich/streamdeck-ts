import AbstractEvent from "./AbstractEvent";
import { OutgoingEventsEnum } from "./OutgoingEventsEnum";

export default class LogMessageEvent extends AbstractEvent {
  private readonly message: string;

  constructor(message: string) {
    super();
    this.message = message;
  }

  public get event(): string {
    return OutgoingEventsEnum.LogMessage;
  }

  protected get payload(): object {
    return {
      message: this.message
    };
  };

  protected get jsonProps(): string[] {
    return [...super.jsonProps, "payload"];
  }
};
