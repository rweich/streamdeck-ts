import assertType from '../assertType';
import { ApplicationDidTerminatEventType } from '../streamdecktypes/ApplicationEventType';
import AbstractApplicationEvent from './AbstractApplicationEvent';

export default class ApplicationDidTerminateEvent extends AbstractApplicationEvent {
  public constructor(payload: unknown) {
    super(payload);
    assertType(ApplicationDidTerminatEventType, payload);
  }
}
