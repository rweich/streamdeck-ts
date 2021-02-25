import { SendToPluginEvent } from '../propertyinspector';
import { OutgoingPluginEvents } from './index';

export default class SendToPropertyInspectorEvent extends SendToPluginEvent {
  public get event(): string {
    return OutgoingPluginEvents.SendToPropertyInspector;
  }
}
