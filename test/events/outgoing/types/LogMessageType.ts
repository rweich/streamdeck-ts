import { Static, Type } from '@sinclair/typebox';

export const LogMessageSchema = Type.Object({
  event: Type.String({ pattern: '^logMessage$' }),
  payload: Type.Object({
    message: Type.String(),
  }),
});

export type LogMessageType = Static<typeof LogMessageSchema>;
