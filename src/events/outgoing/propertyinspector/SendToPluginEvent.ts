import AbstractOutgoingSetterEvent from '../AbstractOutgoingSetterEvent';
import { OutgoingPropertyinspectorEvents } from './OutgoingPropertyinspectorEvents';

export default class SendToPluginEvent extends AbstractOutgoingSetterEvent {
  private readonly action: string;
  private readonly eventPayload: unknown;

  constructor(action: string, context: string, eventPayload: unknown) {
    super(context);
    this.action = action;
    this.eventPayload = eventPayload;
  }

  public get event(): string {
    return OutgoingPropertyinspectorEvents.SendToPlugin;
  }

  protected get payload(): unknown {
    return this.eventPayload;
  }

  protected get jsonProps(): string[] {
    return [...super.jsonProps, 'action'];
  }
}
