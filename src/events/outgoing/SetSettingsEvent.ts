import AbstractOutgoingSetterEvent from './AbstractOutgoingSetterEvent';
import { OutgoingEvents } from './OutgoingEvents';

export default class SetSettingsEvent extends AbstractOutgoingSetterEvent {
  private readonly eventPayload: unknown;

  constructor(context: string, eventPayload: unknown) {
    super(context);
    this.eventPayload = eventPayload;
  }

  public get event(): string {
    return OutgoingEvents.SetSettings;
  }

  protected get payload(): unknown {
    return this.eventPayload;
  }
}
