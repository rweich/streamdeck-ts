import { expect } from "chai";
import EventEmitter from "eventemitter3";
import "mocha";
import { dummyLogger } from "ts-log";
import WebSocket from "ws";
import EventFactory from "../src/events/incoming/EventFactory";
import SetTitleEvent from "../src/events/outgoing/plugin/SetTitleEvent";
import Plugin from "../src/Plugin";

describe("Plugin test", () => {
  it("should queue all send events until the websocket got created", (done) => {
    const plugin = new Plugin(new EventEmitter(), new EventFactory(dummyLogger), dummyLogger);
    plugin.sendEvent(new SetTitleEvent("title1", "context"));
    plugin.sendEvent(new SetTitleEvent("title2", "context"));
    const connector = plugin.createStreamdeckConnector();
    const server = new WebSocket.Server({host: "127.0.0.1", port: 23456});
    connector("23456", "uid", "resisterevent", "info");
    server.on("connection", (ws: WebSocket) => {
      const messages: string[] = [];
      ws.on("message", data => {
        messages.push(data.toString());
        if (messages.length === 3) {
          expect(messages[0]).to.match(/resisterevent/);
          expect(messages[1]).to.match(/title1/);
          expect(messages[2]).to.match(/title2/);
          server.close();
          done();
        }
      });
    });
  });
});
