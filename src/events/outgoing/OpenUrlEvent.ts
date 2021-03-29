import AbstractEvent from './AbstractEvent';
import { OutgoingEvents } from './OutgoingEvents';

export default class OpenUrlEvent extends AbstractEvent {
  public readonly event = OutgoingEvents.OpenUrl;
  private readonly payload: Record<'url', string>;

  constructor(url: string) {
    super();
    this.payload = { url };
  }

  protected get jsonProps(): string[] {
    return [...super.jsonProps, 'payload'];
  }
}
