import { Static } from '@sinclair/typebox';
import assertType from '../assertType';
import { WillAppearEventType } from '../streamdecktypes/StateEventType';
import AbstractStateEvent from './AbstractStateEvent';

export default class WillAppearEvent extends AbstractStateEvent {
  protected payload: Static<typeof WillAppearEventType>;

  constructor(payload: unknown) {
    super(payload);
    assertType(WillAppearEventType, payload);
    this.payload = payload;
  }
}
