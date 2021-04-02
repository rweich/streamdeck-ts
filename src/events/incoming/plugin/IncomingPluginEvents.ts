/** @deprecated - use the event name strings directly */
export enum IncomingPluginEvents {
  ApplicationDidLaunch = 'applicationDidLaunch',
  ApplicationDidTerminate = 'applicationDidTerminate',
  DeviceDidConnect = 'deviceDidConnect',
  DeviceDidDisconnect = 'deviceDidDisconnect',
  KeyDown = 'keyDown',
  KeyUp = 'keyUp',
  PropertyInspectorDidAppear = 'propertyInspectorDidAppear',
  PropertyInspectorDidDisappear = 'propertyInspectorDidDisappear',
  SendToPlugin = 'sendToPlugin',
  SendToPropertyInspector = 'sendToPropertyInspector',
  SystemDidWakeUp = 'systemDidWakeUp',
  TitleParametersDidChange = 'titleParametersDidChange',
  WillAppear = 'willAppear',
  WillDisappear = 'willDisappear',
}
