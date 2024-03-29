import {
  GenericLayoutFeedback,
  LayoutFeedback,
  LayoutFeedbackKey,
} from '@rweich/streamdeck-events/dist/StreamdeckTypes/Received/Feedback/LayoutFeedback';

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
   * Sends a command to the Stream Deck to update the Feedback displayed for a specific dial.
   *
   * Feedback payloads must conform to (at least) the `GenericLayoutFeedback` type for any updates, but stricter types
   * are accepted so long as they also satisfy the requirements of this type.
   *
   * @param payload The feedback object to send to the Stream Deck, based on at least GenericLayoutFeedback
   * @param context The context / id of the current action / button.
   */
  public setFeedback(payload: LayoutFeedback | GenericLayoutFeedback, context: string): void {
    this.sendToStreamdeck(this.sentEventFactory.setFeedback(payload, context));
  }

  /**
   * Sends a command to the Stream Deck to update the Feedback Layout for a specific dial.
   *
   * Layouts may either be a hardcoded layout ID or a path (relative to plugin root) to a layout JSON. This library
   * will perform *no validation* whether a specific layout is valid or not.
   * @param layout A layout key or path to use as the layout for this dial.
   * @param context The context / id of the current action / button.
   */
  public setFeedbackLayout(layout: LayoutFeedbackKey | string, context: string): void {
    this.sendToStreamdeck(this.sentEventFactory.setFeedbackLayout(layout, context));
  }

  /**
   * Changes the state of the button if it supports multiple states
   * @param state - The new state
   * @param context – The context / id of the current action / button
   */
  public setState(state: number, context: string): void {
    this.sendToStreamdeck(this.sentEventFactory.setState(state, context));
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

  /**
   * Shows an alert icon on the button
   * @param context – The context / id of the current action / button
   */
  public showAlert(context: string): void {
    this.sendToStreamdeck(this.sentEventFactory.showAlert(context));
  }

  /**
   * Shows an ok checkmark on the button
   * @param context – The context / id of the current action / button
   */
  public showOk(context: string): void {
    this.sendToStreamdeck(this.sentEventFactory.showOk(context));
  }

  /**
   * Makes the streamdeck switch to the preconfigured readonly profile
   * @param profilename - The name of the profile to switch to
   * @param context – The context / id of the current action / button
   * @param device - A value identifying the device
   */
  public switchToProfile(profilename: string, context: string, device: string): void {
    this.sendToStreamdeck(this.sentEventFactory.switchToProfile(profilename, context, device));
  }

  /** gets called by the streamdeck plugin/propertyinspector register process */
  public connectElgatoStreamDeckSocket(
    inPort: string,
    inPluginUUID: string,
    inRegisterEvent: string,
    inInfo: string,
  ): void {
    super.registerStreamdeck(inPort, inPluginUUID, inRegisterEvent, inInfo);
  }
}
