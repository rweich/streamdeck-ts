import { Type } from "@sinclair/typebox";
import { StateEventType } from "./StateEventType";

export const DidReceiveSettingsType = Type.Intersect([
  StateEventType,
  Type.Object({
    event: Type.String({pattern: "^didReceiveSettings$"}),
  })
]);

export const DidReceiveGlobalSettingsType = Type.Object({
  event: Type.String({pattern: "^didReceiveGlobalSettings$"}),
  payload: Type.Object({
    settings: Type.Any()
  })
});
