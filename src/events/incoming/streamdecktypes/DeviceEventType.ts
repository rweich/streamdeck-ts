import { Type } from '@sinclair/typebox';

export const DeviceDidConnectEventType = Type.Object({
  event: Type.String({ pattern: 'deviceDidConnect' }),
  device: Type.String(),
});

export const DeviceDidDisconnectType = Type.Object({
  event: Type.String({ pattern: 'deviceDidDisconnect' }),
  device: Type.String(),
  deviceInfo: Type.Object({
    name: Type.String(),
    type: Type.Number({ minimum: 0, maximum: 4 }),
    size: Type.Object({
      columns: Type.Number(),
      rows: Type.Number(),
    }),
  }),
});
