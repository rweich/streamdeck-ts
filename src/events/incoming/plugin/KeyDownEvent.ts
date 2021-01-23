import assertType from "../assertType";
import { KeyDownEventType } from "../streamdecktypes/KeyEventType";
import AbstractKeyEvent from "./AbstractKeyEvent";
import { IncomingPluginEvents } from "./IncomingPluginEvents";

export default class KeyDownEvent extends AbstractKeyEvent {
  public constructor(payload: unknown) {
    super(payload);
    assertType(KeyDownEventType, payload);
  }

  protected get eventType(): IncomingPluginEvents {
    return IncomingPluginEvents.KeyDown;
  }
};
