import AbstractOutgoingEvent from './AbstractOutgoingEvent';
import { OutgoingEvents } from './OutgoingEvents';

export default class GetSettingsEvent extends AbstractOutgoingEvent {
  public readonly event = OutgoingEvents.GetSettings;

  constructor(context: string) {
    super(context);
  }
}
