import { expect } from "chai";
import EventEmitter from "eventemitter3";
import "mocha";
import { dummyLogger } from "ts-log";
import WebSocket from "ws";
import EventFactory from "../../src/streamdeck/events/incoming/EventFactory";
import LogMessageEvent from "../../src/streamdeck/events/outgoing/LogMessageEvent";
import PropertyInspector from "../../src/streamdeck/PropertyInspector";

describe("StreamdeckPlugin test", () => {
  it("should queue all send events until the websocket got created", (done) => {
    const pi = new PropertyInspector(new EventEmitter(), new EventFactory(dummyLogger), dummyLogger);
    pi.sendEvent(new LogMessageEvent("message1"));
    pi.sendEvent(new LogMessageEvent("message2"));
    const connector = pi.createStreamdeckConnector();
    const server = new WebSocket.Server({host: "127.0.0.1", port: 23456});
    connector("23456", "uid", "regpropevent", "info");
    server.on("connection", (ws: WebSocket) => {
      const messages: string[] = [];
      ws.on("message", data => {
        messages.push(data.toString());
        if (messages.length === 3) {
          expect(messages[0]).to.match(/regpropevent/);
          expect(messages[1]).to.match(/message1/);
          expect(messages[2]).to.match(/message2/);
          server.close();
          done();
        }
      });
    });
  });
});
