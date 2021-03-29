import AbstractOutgoingSetterEvent from '../AbstractOutgoingSetterEvent';
import { OutgoingPluginEvents } from './OutgoingPluginEvents';
import { TargetEnum } from './TargetEnum';

export default class SetTitleEvent extends AbstractOutgoingSetterEvent {
  public readonly event = OutgoingPluginEvents.SetTitle;
  public readonly title: string;
  public readonly target: TargetEnum;
  public readonly state: number | undefined;

  constructor(title: string, context: string, target: TargetEnum = TargetEnum.Both, state?: number) {
    super(context);
    this.title = title;
    this.target = target;
    this.state = state;
  }

  protected get payload(): unknown {
    let payload: Record<string, unknown> = {
      title: this.title,
      target: this.target,
    };
    if (this.state !== undefined) {
      payload = { ...payload, state: this.state };
    }
    return payload;
  }
}
