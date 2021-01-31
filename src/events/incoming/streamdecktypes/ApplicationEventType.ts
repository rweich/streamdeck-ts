import { Type } from '@sinclair/typebox';

export const ApplicationEventType = Type.Object({
  event: Type.String({ pattern: '^applicationDidLaunch|applicationDidTerminate$' }),
  payload: Type.Object({
    application: Type.String(),
  }),
});
export const ApplicationDidLaunchEventType = Type.Intersect([
  ApplicationEventType,
  Type.Object({
    event: Type.String({ pattern: '^applicationDidLaunch$' }),
  }),
]);
export const ApplicationDidTerminatEventType = Type.Intersect([
  ApplicationEventType,
  Type.Object({
    event: Type.String({ pattern: '^applicationDidTerminate$' }),
  }),
]);
