import AbstractEvent from './AbstractEvent';
import { OutgoingEvents } from './OutgoingEvents';

export default class OpenUrlEvent extends AbstractEvent {
  private readonly payload: Record<'url', string>;

  constructor(url: string) {
    super();
    this.payload = { url };
  }

  public get event(): string {
    return OutgoingEvents.OpenUrl;
  }

  protected get jsonProps(): string[] {
    return [...super.jsonProps, 'payload'];
  }
}
