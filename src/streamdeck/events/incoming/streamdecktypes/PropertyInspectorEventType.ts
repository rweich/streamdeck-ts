import { Type } from "@sinclair/typebox";

export const PropertyInspectorEventType = Type.Object({
  action: Type.String(),
  event: Type.String({pattern: "propertyInspectorDidAppear|propertyInspectorDidDisappear"}),
  context: Type.String(),
  device: Type.String()
});
