import EventInterface from './EventInterface';

export default interface OutgoingEventInterface extends EventInterface {
  readonly context: string;
}
