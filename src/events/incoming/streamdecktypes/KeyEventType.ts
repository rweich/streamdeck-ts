import { Type } from '@sinclair/typebox';
import { CoordinatesPayloadType } from './CoordinatesPayloadType';
import { ExtendedEventType } from './ExtendedEventType';

const basePayload = {
  settings: Type.Any(),
  coordinates: CoordinatesPayloadType,
  isInMultiAction: Type.Boolean(),
};
const multiActionPayload = {
  ...basePayload,
  state: Type.Number(),
  userDesiredState: Type.Number(),
};

export const KeyEventType = Type.Intersect([
  ExtendedEventType,
  Type.Object({
    event: Type.String({ pattern: '^keyDown|keyUp$' }),
    payload: Type.Union([Type.Object(basePayload), Type.Object(multiActionPayload)]),
  }),
]);

export const KeyDownEventType = Type.Intersect([
  KeyEventType,
  Type.Object({
    event: Type.String({ pattern: '^keyDown$' }),
  }),
]);

export const KeyUpEventType = Type.Intersect([
  KeyEventType,
  Type.Object({
    event: Type.String({ pattern: '^keyUp$' }),
  }),
]);
