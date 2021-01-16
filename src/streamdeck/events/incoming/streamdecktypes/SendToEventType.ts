import { Type } from "@sinclair/typebox";

export const SendToEventType = Type.Object({
  action: Type.String(),
  event: Type.String({pattern: "^sendToPlugin|sendToPropertyInspector$"}),
  context: Type.String(),
  payload: Type.Any()
});

export const SendToPluginEventType = Type.Intersect([
  SendToEventType,
  Type.Object({
    event: Type.String({pattern: "^sendToPlugin$"}),
  })
]);
