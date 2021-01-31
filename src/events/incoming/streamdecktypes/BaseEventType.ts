import { Type } from '@sinclair/typebox';

export const BaseEventType = Type.Object({
  event: Type.String(),
});
