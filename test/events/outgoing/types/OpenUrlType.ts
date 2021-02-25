import { Static, Type } from '@sinclair/typebox';

export const OpenUrlSchema = Type.Object({
  event: Type.String({ pattern: '^openUrl$' }),
  payload: Type.Object({
    url: Type.String(),
  }),
});

export type OpenUrlType = Static<typeof OpenUrlSchema>;
