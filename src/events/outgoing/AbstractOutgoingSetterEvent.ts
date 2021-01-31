import AbstractOutgoingEvent from './AbstractOutgoingEvent';

export default abstract class AbstractOutgoingSetterEvent extends AbstractOutgoingEvent {
  protected abstract get payload(): unknown;

  protected get jsonProps(): string[] {
    return [...super.jsonProps, 'payload'];
  }
}
