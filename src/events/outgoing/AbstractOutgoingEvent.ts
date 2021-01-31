import AbstractEvent from './AbstractEvent';
import OutgoingEventInterface from './OutgoingEventInterface';

export default abstract class AbstractOutgoingEvent extends AbstractEvent implements OutgoingEventInterface {
  public readonly context: string;

  protected constructor(context: string) {
    super();
    this.context = context;
  }

  protected get jsonProps(): string[] {
    return [...super.jsonProps, 'context'];
  }
}
