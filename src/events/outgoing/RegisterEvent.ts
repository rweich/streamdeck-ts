import AbstractEvent from './AbstractEvent';

export default class RegisterEvent extends AbstractEvent {
  public readonly uuid: string;
  private readonly registerEvent: string;

  constructor(event: string, uuid: string) {
    super();
    this.registerEvent = event;
    this.uuid = uuid;
  }

  get event(): string {
    return this.registerEvent;
  }

  protected get jsonProps(): string[] {
    return [...super.jsonProps, 'uuid'];
  }
}
