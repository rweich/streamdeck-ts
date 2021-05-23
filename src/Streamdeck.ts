import { EventsReceived, EventsSent } from '@rweich/streamdeck-events';

import EventEmitter from 'eventemitter3';
import { Logger } from 'ts-log';
import Plugin from './Plugin';
import PropertyInspector from './PropertyInspector';

export default class Streamdeck {
  private readonly logger: Logger;

  constructor(logger?: Logger) {
    this.logger = logger || console;
  }

  /**
   * Creates and returns a new plugin instance
   */
  public plugin(): Plugin {
    return new Plugin(new EventEmitter(), new EventsReceived(), new EventsSent(), this.logger);
  }

  /**
   * Creates and returns a new propertyinspector instance
   */
  public propertyinspector(): PropertyInspector {
    return new PropertyInspector(new EventEmitter(), new EventsReceived(), new EventsSent(), this.logger);
  }
}
