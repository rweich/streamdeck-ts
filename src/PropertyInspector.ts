import AbstractStreamdeckConnector from './AbstractStreamdeckConnector';
import { PIEvents } from './events/Events';

export default class PropertyInspector extends AbstractStreamdeckConnector {
  /** registers the eventlistener to the events the streamdeck sends to us */
  public on<T extends keyof PIEvents>(eventType: T, callback: PIEvents[T]): void {
    this.eventEmitter.on(eventType, callback);
  }

  /**
   * Sends data to the plugin
   * @param {string} context The context / id of the current action / button
   * @param {Record<string, unknown>} payload Whatever data you want to send
   * @param action The actions UUID (has to match the one in the manifest)
   */
  public sendToPlugin(context: string, payload: Record<string, unknown>, action: string): void {
    this.sendToStreamdeck(this.sentEventFactory.sendToPlugin(action, context, payload));
  }
}
