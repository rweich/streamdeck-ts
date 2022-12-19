import { ControllerType } from '@rweich/streamdeck-events/dist/Events/Received/Plugin/ControllerType';
import { Static, Type } from '@sinclair/typebox';

import assertType from '../helper/AssertType';

const ActionInfoType = Type.Object({
  action: Type.String(),
  context: Type.String(),
  device: Type.String(),
  payload: Type.Object({
    controller: Type.Optional(Type.Enum(ControllerType)),
    coordinates: Type.Optional(
      Type.Object({
        column: Type.Number(),
        row: Type.Number(),
      }),
    ),
    settings: Type.Unknown(),
  }),
});
type ActionInfoType = Static<typeof ActionInfoType>;

export default class ActionInfo {
  private readonly actionInfo: ActionInfoType;

  constructor(jsonPayload: string) {
    const parsed: unknown = JSON.parse(jsonPayload);
    assertType(ActionInfoType, parsed);
    this.actionInfo = parsed;
  }

  public get action(): string {
    return this.actionInfo.action;
  }

  public get context(): string {
    return this.actionInfo.context;
  }

  public get device(): string {
    return this.actionInfo.device;
  }

  /**
   * Return the controller type associated with this specific property inspector. Can be used to determine if this PI
   * controls a standard button or a rotary dial. This will not change during the PI's lifecycle.
   *
   * For plugins running on API v5, this will always return "Keypad".
   * @returns {ControllerType} The controller type (either "Keypad" or "Encoder") of this action's event.
   */
  public get controller(): ControllerType {
    return this.actionInfo.payload.controller ?? ControllerType.Keypad;
  }

  public get column(): number | undefined {
    return this.actionInfo.payload.coordinates?.column;
  }

  public get row(): number | undefined {
    return this.actionInfo.payload.coordinates?.row;
  }

  public get settings(): unknown {
    return this.actionInfo.payload.settings;
  }
}
