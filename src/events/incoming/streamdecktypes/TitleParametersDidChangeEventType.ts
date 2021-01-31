import { Type } from '@sinclair/typebox';
import { CoordinatesPayloadType } from './CoordinatesPayloadType';

export const TitleParametersDidChangeEventType = Type.Object({
  action: Type.String(),
  event: Type.String({ pattern: '^titleParametersDidChange$' }),
  context: Type.String(),
  device: Type.String(),
  payload: Type.Object({
    settings: Type.Any(),
    state: Type.Number(),
    coordinates: CoordinatesPayloadType,
    title: Type.String(),
    titleParameters: Type.Object({
      fontFamily: Type.String(),
      fontSize: Type.Number(),
      fontStyle: Type.String(),
      fontUnderline: Type.Boolean(),
      showTitle: Type.Boolean(),
      titleAlignment: Type.String({ pattern: '^top|bottom|middle$' }),
      titleColor: Type.String(),
    }),
  }),
});
