import { Static, Type } from '@sinclair/typebox';

export const GetSettingsSchema = Type.Object({
  event: Type.String({ pattern: '^getSettings$' }),
  context: Type.String(),
});

export type GetSettingsType = Static<typeof GetSettingsSchema>;
