import AbstractOutgoingEvent from "./AbstractOutgoingEvent";

export default abstract class AbstractOutgoingSetterEvent extends AbstractOutgoingEvent {
  protected abstract get payload(): object;

  protected get jsonProps(): string[] {
    return [...super.jsonProps, "payload"];
  }
}
