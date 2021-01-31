import { IncomingEventsTypes } from '../AbstractIncomingBaseEvent';
import assertType from '../assertType';
import { ApplicationDidTerminatEventType } from '../streamdecktypes/ApplicationEventType';
import AbstractApplicationEvent from './AbstractApplicationEvent';
import { IncomingPluginEvents } from './IncomingPluginEvents';

export default class ApplicationDidTerminateEvent extends AbstractApplicationEvent {
  public constructor(payload: unknown) {
    super(payload);
    assertType(ApplicationDidTerminatEventType, payload);
  }

  protected get eventType(): IncomingEventsTypes {
    return IncomingPluginEvents.ApplicationDidTerminate;
  }
}
