import assertType from '../assertType';
import { KeyUpEventType } from '../streamdecktypes/KeyEventType';
import AbstractKeyEvent from './AbstractKeyEvent';

export default class KeyUpEvent extends AbstractKeyEvent {
  public constructor(payload: unknown) {
    super(payload);
    assertType(KeyUpEventType, payload);
  }
}
