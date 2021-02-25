import { Static, Type } from '@sinclair/typebox';

export const SetImageSchema = Type.Object({
  event: Type.String({ pattern: '^setImage$' }),
  context: Type.String(),
  payload: Type.Object({
    image: Type.String(),
    target: Type.Number({ minimum: 0, maximum: 2 }),
    state: Type.Optional(Type.Number()),
  }),
});

export type SetImageType = Static<typeof SetImageSchema>;
