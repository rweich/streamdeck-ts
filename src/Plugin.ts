import AbstractStreamdeckConnector from './AbstractStreamdeckConnector';
import { PluginEvents } from './events/Events';

type SetterTargets = 'hardware' | 'software' | 'both';

export default class Plugin extends AbstractStreamdeckConnector {
  /** registers the eventlistener to the events the streamdeck sends to us */
  public on<T extends keyof PluginEvents>(eventType: T, callback: PluginEvents[T]): void {
    this.eventEmitter.on(eventType, callback);
  }

  /**
   * Sends data to the propertyinspector
   * @param {string} context The context / id of the current action / button
   * @param {Record<string, unknown>} payload Whatever data you want to send
   */
  public sendToPropertyInspector(context: string, payload: Record<string, unknown>): void {
    this.sendToStreamdeck(this.sentEventFactory.sendToPropertyInspector('', context, payload));
  }

  /**
   * Changes the title of the button
   * @param {string} title The new title
   * @param {string} context The context / id of the current action / button
   * @param {object} options Optional params
   * @param {'hardware'|'software'|'both'} options.target Set if only intended for a specified target
   * @param {number} options.state Set if only intended for one state of a multi-action button
   */
  public setTitle(title: string, context: string, options: { target?: SetterTargets; state?: number } = {}): void {
    this.sendToStreamdeck(this.sentEventFactory.setTitle(title, context, options.target, options.state));
  }

  /**
   * Changes the image of the button
   * @param {string} image The new image as base64 encoded string
   * @param {string} context The context / id of the current action / button
   * @param {object} options Optional params
   * @param {'hardware'|'software'|'both'} options.target Set if only intended for a specified target
   * @param {number} options.state Set if only intended for one state of a multi-action button
   */
  public setImage(image: string, context: string, options: { target?: SetterTargets; state?: number } = {}): void {
    this.sendToStreamdeck(this.sentEventFactory.setImage(image, context, options.target, options.state));
  }
}
