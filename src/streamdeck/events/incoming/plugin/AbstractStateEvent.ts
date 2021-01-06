import { Static } from "@sinclair/typebox";
import AbstractIncomingExtendedEvent from "../AbstractIncomingExtendedEvent";
import assertType from "../assertType";
import { StateEventType } from "../streamdecktypes/StateEventType";

export default abstract class AbstractStateEvent extends AbstractIncomingExtendedEvent {
  protected payload: Static<typeof StateEventType>;

  protected constructor(payload: unknown) {
    super(payload);
    assertType(StateEventType, payload);
    this.payload = payload;
  }

  public get settings() {
    return this.payload.payload.settings;
  }

  public get row() {
    return this.payload.payload.coordinates.row;
  }

  public get column() {
    return this.payload.payload.coordinates.column;
  }

  public get isInMultiAction() {
    return this.payload.payload.isInMultiAction;
  }

  public get state() {
    return this.payload.payload.state;
  }
};
