import AbstractOutgoingSetterEvent from "../AbstractOutgoingSetterEvent";
import { OutgoingPropertyinspectorEvents } from "./OutgoingPropertyinspectorEvents";

export default class SendToPluginEvent extends AbstractOutgoingSetterEvent {
  private readonly action: string;
  private readonly eventPayload: object;

  constructor(action: string, context: string, eventPayload: object) {
    super(context);
    this.action = action;
    this.eventPayload = eventPayload;
  }

  public get event(): string {
    return OutgoingPropertyinspectorEvents.SendToPlugin;
  }

  protected get payload(): object {
    return this.eventPayload;
  }

  protected get jsonProps(): string[] {
    return [...super.jsonProps, 'action'];
  }
};
