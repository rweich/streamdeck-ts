import { Static, Type } from '@sinclair/typebox';

export const SetSettingsSchema = Type.Object({
  event: Type.String({ pattern: '^setSettings$' }),
  context: Type.String(),
  payload: Type.Any(),
});

export type SetSettingsType = Static<typeof SetSettingsSchema>;
