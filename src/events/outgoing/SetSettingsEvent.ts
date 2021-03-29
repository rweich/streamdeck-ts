import AbstractOutgoingSetterEvent from './AbstractOutgoingSetterEvent';
import { OutgoingEvents } from './OutgoingEvents';

export default class SetSettingsEvent extends AbstractOutgoingSetterEvent {
  public readonly event = OutgoingEvents.SetSettings;
  protected readonly payload: unknown;

  constructor(context: string, payload: unknown) {
    super(context);
    this.payload = payload;
  }
}
