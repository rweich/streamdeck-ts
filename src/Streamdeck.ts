import EventEmitter from "eventemitter3";
import { Logger } from "ts-log";
import EventFactory from "./events/incoming/EventFactory";
import Plugin from "./Plugin";
import PropertyInspector from "./PropertyInspector";

export default class Streamdeck {
  /**
   * Creates and returns a new plugin instance
   */
  public plugin() {
    const logger = this.createLogger();
    return new Plugin(new EventEmitter(), new EventFactory(logger), logger);
  }

  /**
   * Creates and returns a new propertyinspector instance
   */
  public propertyinspector() {
    const logger = this.createLogger();
    return new PropertyInspector(new EventEmitter(), new EventFactory(logger), logger);
  }

  private createLogger(): Logger {
    return console;
  }
};
