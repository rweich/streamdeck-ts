import AbstractOutgoingSetterEvent from '../AbstractOutgoingSetterEvent';
import { OutgoingPropertyinspectorEvents } from './OutgoingPropertyinspectorEvents';

export default class SendToPluginEvent extends AbstractOutgoingSetterEvent {
  public readonly event = OutgoingPropertyinspectorEvents.SendToPlugin;
  protected readonly payload: unknown;
  private readonly action: string;

  constructor(action: string, context: string, payload: unknown) {
    super(context);
    this.action = action;
    this.payload = payload;
  }

  protected get jsonProps(): string[] {
    return [...super.jsonProps, 'action'];
  }
}
