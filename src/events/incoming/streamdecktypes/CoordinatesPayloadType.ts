import { Type } from '@sinclair/typebox';

export const CoordinatesPayloadType = Type.Object({
  column: Type.Number(),
  row: Type.Number(),
});
