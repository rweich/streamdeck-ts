import AbstractOutgoingSetterEvent from '../AbstractOutgoingSetterEvent';
import { OutgoingPluginEvents } from './OutgoingPluginEvents';
import { TargetEnum } from './TargetEnum';

export default class SetImageEvent extends AbstractOutgoingSetterEvent {
  public readonly event = OutgoingPluginEvents.SetImage;
  public readonly image: string;
  public readonly target: TargetEnum;
  public readonly state: number | undefined;

  constructor(image: string, context: string, target: TargetEnum = TargetEnum.Both, state?: number) {
    super(context);
    this.image = image;
    this.target = target;
    this.state = state;
  }

  protected get payload(): unknown {
    let payload: Record<string, unknown> = {
      image: this.image,
      target: this.target,
    };
    if (this.state !== undefined) {
      payload = { ...payload, state: this.state };
    }
    return payload;
  }
}
