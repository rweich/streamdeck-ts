export default class OnWebsocketOpenEvent {
  public readonly uuid: string;
  public readonly info: string;
  public readonly event = 'websocketOpen';

  constructor(uuid: string, info: string) {
    this.uuid = uuid;
    this.info = info;
  }
}
