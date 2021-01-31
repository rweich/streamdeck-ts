import AbstractOutgoingEvent from './AbstractOutgoingEvent';
import { OutgoingEvents } from './OutgoingEvents';

export default class GetSettingsEvent extends AbstractOutgoingEvent {
  constructor(context: string) {
    super(context);
  }

  public get event(): string {
    return OutgoingEvents.GetSettings;
  }
}
