import assertType from '../assertType';
import { ApplicationDidLaunchEventType } from '../streamdecktypes/ApplicationEventType';
import AbstractApplicationEvent from './AbstractApplicationEvent';

export default class ApplicationDidLaunchEvent extends AbstractApplicationEvent {
  public constructor(payload: unknown) {
    super(payload);
    assertType(ApplicationDidLaunchEventType, payload);
  }
}
