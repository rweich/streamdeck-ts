import AbstractEvent from './AbstractEvent';
import { OutgoingEvents } from './OutgoingEvents';

export default class LogMessageEvent extends AbstractEvent {
  public readonly event = OutgoingEvents.LogMessage;
  private readonly message: string;

  constructor(message: string) {
    super();
    this.message = message;
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
