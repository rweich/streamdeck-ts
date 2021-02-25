import { Static, Type } from '@sinclair/typebox';

export const SendToPropertyInspectorSchema = Type.Object({
  action: Type.String(),
  event: Type.String({ pattern: '^sendToPropertyInspector$' }),
  context: Type.String(),
  payload: Type.Any(),
});

export type SendToPropertyInspectorType = Static<typeof SendToPropertyInspectorSchema>;
