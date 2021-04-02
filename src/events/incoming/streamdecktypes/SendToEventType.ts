import { Type } from '@sinclair/typebox';

export const SendToEventType = Type.Object({
  action: Type.String(),
  event: Type.String({ pattern: '^sendToPlugin|sendToPropertyInspector$' }),
  context: Type.String(),
  payload: Type.Object({}),
});

export const SendToPluginEventType = Type.Intersect([
  SendToEventType,
  Type.Object({
    event: Type.String({ pattern: '^sendToPlugin$' }),
  }),
]);

export const SendToPropertyInspectorEventType = Type.Intersect([
  SendToEventType,
  Type.Object({
    event: Type.String({ pattern: '^sendToPropertyInspector$' }),
  }),
]);
