import EventEmitter from "eventemitter3";
import { Logger } from "ts-log";
import EventFactory from "./events/incoming/EventFactory";
import Plugin from "./Plugin";
import PropertyInspector from "./PropertyInspector";

export default class StreamdeckFactory {
  public createPlugin() {
    const logger = this.createLogger();
    return new Plugin(new EventEmitter(), new EventFactory(logger), logger);
  }

  public createPropertyinspector() {
    const logger = this.createLogger();
    return new PropertyInspector(new EventEmitter(), new EventFactory(logger), logger);
  }

  private createLogger(): Logger {
    return console;
  }
};
