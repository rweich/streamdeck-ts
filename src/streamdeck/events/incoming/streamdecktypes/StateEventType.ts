import { Type } from "@sinclair/typebox";
import { CoordinatesPayloadType } from "./CoordinatesPayloadType";

export const StateEventType = Type.Object({
  action: Type.String(),
  event: Type.String({pattern: "willAppear|willDisappear|didReceiveSettings"}),
  context: Type.String(),
  device: Type.String(),
  payload: Type.Object({
    settings: Type.Any(),
    coordinates: CoordinatesPayloadType,
    isInMultiAction: Type.Boolean(),
    state: Type.Optional(Type.Number())
  }),
});

export const WillAppearEventType = Type.Intersect([
  StateEventType,
  Type.Object({
    event: Type.String({pattern: "willAppear"}),
  })
]);

export const WillDisappearEventType = Type.Intersect([
  StateEventType,
  Type.Object({
    event: Type.String({pattern: "willDisappear"}),
  })
]);
