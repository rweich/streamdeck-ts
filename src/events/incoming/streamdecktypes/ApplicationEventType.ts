import { Type } from "@sinclair/typebox";

export const ApplicationEventType = Type.Object({
  event: Type.String({pattern: "applicationDidLaunch|applicationDidTerminate"}),
  payload: Type.Object({
    application: Type.String()
  })
});
