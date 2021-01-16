import { Type } from "@sinclair/typebox";

export const SettingsType = Type.Object({
  format1stLine: Type.String(),
  format2ndLine: Type.String(),
});
