import AbstractOutgoingSetterEvent from '../AbstractOutgoingSetterEvent';
import { OutgoingPluginEvents } from './';

export default class SendToPropertyInspectorEvent extends AbstractOutgoingSetterEvent {
  public readonly event = OutgoingPluginEvents.SendToPropertyInspector;
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
