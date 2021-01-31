import assertType from '../assertType';
import { KeyUpEventType } from '../streamdecktypes/KeyEventType';
import AbstractKeyEvent from './AbstractKeyEvent';
import { IncomingPluginEvents } from './IncomingPluginEvents';

export default class KeyUpEvent extends AbstractKeyEvent {
  public constructor(payload: unknown) {
    super(payload);
    assertType(KeyUpEventType, payload);
  }

  protected get eventType(): IncomingPluginEvents {
    return IncomingPluginEvents.KeyUp;
  }
}
