import assertType from '../assertType';
import { KeyDownEventType } from '../streamdecktypes/KeyEventType';
import AbstractKeyEvent from './AbstractKeyEvent';

export default class KeyDownEvent extends AbstractKeyEvent {
  public constructor(payload: unknown) {
    super(payload);
    assertType(KeyDownEventType, payload);
  }
}
