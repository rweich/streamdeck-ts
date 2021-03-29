import AbstractIncomingExtendedEvent from '../AbstractIncomingExtendedEvent';
import { assertType } from '../index';
import { TitleParametersDidChangeEventType } from '../streamdecktypes/TitleParametersDidChangeEventType';

export default class TitleParametersDidChangeEvent extends AbstractIncomingExtendedEvent {
  constructor(payload: unknown) {
    super(payload);
    assertType(TitleParametersDidChangeEventType, payload);
  }
}
