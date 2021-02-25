import { Static, Type } from '@sinclair/typebox';

export const SetTitleSchema = Type.Object({
  event: Type.String({ pattern: '^setTitle$' }),
  context: Type.String(),
  payload: Type.Object({
    title: Type.String(),
    target: Type.Number({ minimum: 0, maximum: 2 }),
    state: Type.Optional(Type.Number()),
  }),
});

export type SetTitleType = Static<typeof SetTitleSchema>;
