import AbstractOutgoingSetterEvent from "../AbstractOutgoingSetterEvent";
import { OutgoingPluginEvents } from "./OutgoingPluginEvents";
import { TargetEnum } from "./TargetEnum";

export default class SetTitleEvent extends AbstractOutgoingSetterEvent {
  public readonly title: string;
  public readonly target: TargetEnum;
  public readonly state: number | undefined;

  constructor(title: string, context: string, target: TargetEnum = TargetEnum.Both, state?: number) {
    super(context);
    this.title = title;
    this.target = target;
    this.state = state;
  }

  public get event(): string {
    return OutgoingPluginEvents.SetTitle;
  }

  protected get payload(): object {
    let payload: object = {
      title: this.title,
      target: this.target
    };
    if (this.state !== undefined) {
      payload = {...payload, state: this.state};
    }
    return payload;
  }
};
