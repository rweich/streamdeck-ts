import { IncomingEventsTypes } from '../AbstractIncomingBaseEvent';
import assertType from '../assertType';
import { ApplicationDidLaunchEventType } from '../streamdecktypes/ApplicationEventType';
import AbstractApplicationEvent from './AbstractApplicationEvent';
import { IncomingPluginEvents } from './IncomingPluginEvents';

export default class ApplicationDidLaunchEvent extends AbstractApplicationEvent {
  public constructor(payload: unknown) {
    super(payload);
    assertType(ApplicationDidLaunchEventType, payload);
  }

  protected get eventType(): IncomingEventsTypes {
    return IncomingPluginEvents.ApplicationDidLaunch;
  }
}
