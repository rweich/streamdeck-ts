import { Type } from '@sinclair/typebox';
import { DeviceType } from '../plugin/DeviceType';

export const DeviceDidDisconnectType = Type.Object({
  event: Type.String({ pattern: '^deviceDidDisconnect' }),
  device: Type.String(),
});

export const DeviceDidConnectType = Type.Object({
  event: Type.String({ pattern: '^deviceDidConnect$$' }),
  device: Type.String(),
  deviceInfo: Type.Object({
    name: Type.String(),
    type: Type.Enum(DeviceType),
    size: Type.Object({
      columns: Type.Number(),
      rows: Type.Number(),
    }),
  }),
});
