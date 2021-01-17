import { Type } from "@sinclair/typebox";
import { BaseEventType } from "./BaseEventType";

export const ExtendedEventType = Type.Intersect([
  BaseEventType,
  Type.Object({
    action: Type.String(),
    context: Type.String(),
    device: Type.String(),
  })
]);
