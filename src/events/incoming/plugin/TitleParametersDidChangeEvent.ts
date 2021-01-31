import AbstractIncomingExtendedEvent from '../AbstractIncomingExtendedEvent';
import { assertType } from '../index';
import { TitleParametersDidChangeEventType } from '../streamdecktypes/TitleParametersDidChangeEventType';
import { IncomingPluginEvents } from './IncomingPluginEvents';

export default class TitleParametersDidChangeEvent extends AbstractIncomingExtendedEvent {
  constructor(payload: unknown) {
    super(payload);
    assertType(TitleParametersDidChangeEventType, payload);
  }

  protected get eventType(): IncomingPluginEvents {
    return IncomingPluginEvents.TitleParametersDidChange;
  }
}
