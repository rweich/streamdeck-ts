import AbstractStreamdeckConnector from './AbstractStreamdeckConnector';
import ActionInfo from './pi/ActionInfo';
import { PIEvents } from './events/Events';

export default class PropertyInspector extends AbstractStreamdeckConnector {
  private actionInfoParam: ActionInfo | undefined;

  public get actionInfo(): ActionInfo | undefined {
    return this.actionInfoParam;
  }

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

  /** gets called by the streamdeck plugin/propertyinspector register process */
  public connectElgatoStreamDeckSocket(
    inPort: string,
    inPluginUUID: string,
    inRegisterEvent: string,
    inInfo: string,
    inActionInfo: string,
  ): void {
    super.registerStreamdeck(inPort, inPluginUUID, inRegisterEvent, inInfo);
    try {
      this.actionInfoParam = new ActionInfo(inActionInfo);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
