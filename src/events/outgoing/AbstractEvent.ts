// todo: refactor this and the abstractoutgoingevent?
export default abstract class AbstractEvent {
  public abstract get event(): string;

  protected get jsonProps(): string[] {
    return ["event"];
  }

  public toJSON(): object {
    return this.jsonProps.reduce((prev, prop) => Object.assign(prev, {[prop]: this[prop as keyof this]}), {});
  }
};
