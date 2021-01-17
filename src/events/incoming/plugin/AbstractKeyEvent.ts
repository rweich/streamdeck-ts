import { Static } from "@sinclair/typebox";
import AbstractIncomingExtendedEvent from "../AbstractIncomingExtendedEvent";
import assertType from "../assertType";
import { KeyEventType } from "../streamdecktypes/KeyEventType";

export default abstract class AbstractKeyEvent extends AbstractIncomingExtendedEvent {
  protected readonly payload: Static<typeof KeyEventType>;

  protected constructor(payload: unknown) {
    super(payload);
    assertType(KeyEventType, payload);
    this.payload = payload;
  }

  get row() {
    return this.payload.payload.coordinates.row;
  }

  get column() {
    return this.payload.payload.coordinates.column;
  }

  get isInMultiAction() {
    return this.payload.payload.isInMultiAction;
  }
};
