import { Static, Type } from '@sinclair/typebox';

export const SendToPluginSchema = Type.Object({
  action: Type.String(),
  event: Type.String({ pattern: '^sendToPlugin$' }),
  context: Type.String(),
  payload: Type.Any(),
});

export type SendToPluginType = Static<typeof SendToPluginSchema>;
