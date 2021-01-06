import EventEmitter from "eventemitter3";
import EventFactory from "./events/incoming/EventFactory";
import Plugin from "./Plugin";
import PropertyInspector from "./PropertyInspector";

export default class StreamdeckFactory {
  public createPlugin() {
    return new Plugin(new EventEmitter(), new EventFactory());
  }

  public createPropertyinspector() {
    return new PropertyInspector(new EventEmitter(), new EventFactory());
  }
};
