import AbstractEvent from "./AbstractEvent";
import { OutgoingPluginEventsEnum } from "./plugin/OutgoingPluginEventsEnum";

export default class LogMessageEvent extends AbstractEvent {
  private readonly message: string;

  constructor(message: string) {
    super();
    this.message = message;
  }

  public get event(): string {
    return OutgoingPluginEventsEnum.LogMessage;
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
