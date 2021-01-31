import AbstractEvent from './AbstractEvent';
import { OutgoingEvents } from './OutgoingEvents';

export default class LogMessageEvent extends AbstractEvent {
  private readonly message: string;

  constructor(message: string) {
    super();
    this.message = message;
  }

  public get event(): string {
    return OutgoingEvents.LogMessage;
  }

  protected get payload(): unknown {
    return {
      message: this.message,
    };
  }

  protected get jsonProps(): string[] {
    return [...super.jsonProps, 'payload'];
  }
}
