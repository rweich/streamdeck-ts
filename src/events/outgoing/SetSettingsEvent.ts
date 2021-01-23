import AbstractOutgoingSetterEvent from "./AbstractOutgoingSetterEvent";
import { OutgoingEvents } from "./OutgoingEvents";

export default class SetSettingsEvent extends AbstractOutgoingSetterEvent {
  private readonly eventPayload: object;

  constructor(context: string, eventPayload: object) {
    super(context);
    this.eventPayload = eventPayload;
  }

  public get event(): string {
    return OutgoingEvents.SetSettings;
  }

  protected get payload(): object {
    return this.eventPayload;
  }
};
