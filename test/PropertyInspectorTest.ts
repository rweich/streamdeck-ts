import { expect } from 'chai';
import EventEmitter from 'eventemitter3';
import 'mocha';
import { dummyLogger } from 'ts-log';
import WebSocket from 'ws';
import {
  assertType,
  GetSettingsEvent,
  IncomingEvents,
  OpenUrlEvent,
  SendToPluginEvent,
  SetSettingsEvent,
} from '../src';
import EventFactory from '../src/events/incoming/EventFactory';
import LogMessageEvent from '../src/events/outgoing/LogMessageEvent';
import PropertyInspector from '../src/PropertyInspector';
import { GetSettingsSchema, OpenUrlSchema, SendToPluginSchema, SetSettingsSchema } from './events/outgoing/types';

describe('PropertyInspector test', () => {
  it('should queue all send events until the websocket got created', (done) => {
    const pi = new PropertyInspector(new EventEmitter(), new EventFactory(dummyLogger), dummyLogger);
    pi.sendEvent(new LogMessageEvent('message1'));
    pi.sendEvent(new LogMessageEvent('message2'));
    const connector = pi.createStreamdeckConnector();
    const server = new WebSocket.Server({ host: '127.0.0.1', port: 23456 });
    connector('23456', 'uid', 'regpropevent', 'info');
    server.on('connection', (ws: WebSocket) => {
      const messages: string[] = [];
      ws.on('message', (data) => {
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
  it('should dispatch the connect event after connetion', (done) => {
    const emitter = new EventEmitter();
    const server = new WebSocket.Server({ host: '127.0.0.1', port: 23456 });
    const pi = new PropertyInspector(emitter, new EventFactory(dummyLogger), dummyLogger);
    const connector = pi.createStreamdeckConnector();
    emitter.on(IncomingEvents.OnWebsocketOpen, () => {
      server.close();
      done();
    });
    connector('23456', 'uid', 'register', 'info');
  });

  describe('sendEvent', () => {
    let pi: PropertyInspector;
    let server: WebSocket.Server;
    let ws: WebSocket;
    before('prepare websocket', (done) => {
      pi = new PropertyInspector(new EventEmitter(), new EventFactory(dummyLogger), dummyLogger);
      server = new WebSocket.Server({ host: '127.0.0.1', port: 23456 });
      server.on('connection', (pws: WebSocket) => {
        ws = pws;
        ws.once('message', () => done());
      });
      pi.createStreamdeckConnector()('23456', 'uid', 'regpropevent', 'info');
    });
    after('shutdown websocket', () => {
      server.close();
    });

    it('should send the GetSettingsEvent', (done) => {
      ws.once('message', (data) => {
        data = JSON.parse(data.toString());
        assertType(GetSettingsSchema, data);
        expect(data.event).to.equal('getSettings');
        expect(data.context).to.equal('GetSettingsEventContext');
        done();
      });
      pi.sendEvent(new GetSettingsEvent('GetSettingsEventContext'));
    });
    it('should send the OpenUrlEvent', (done) => {
      ws.once('message', (data) => {
        data = JSON.parse(data.toString());
        assertType(OpenUrlSchema, data);
        expect(data.event).to.equal('openUrl');
        expect(data.payload.url).to.equal('the pi url');
        done();
      });
      pi.sendEvent(new OpenUrlEvent('the pi url'));
    });
    it('should send the SendToPluginEvent', (done) => {
      ws.once('message', (data) => {
        data = JSON.parse(data.toString());
        assertType(SendToPluginSchema, data);
        expect(data.event).to.equal('sendToPlugin');
        expect(data.action).to.equal('pac');
        expect(data.context).to.equal('con');
        expect(data.payload.some).to.equal('payload');
        done();
      });
      pi.sendEvent(new SendToPluginEvent('pac', 'con', { some: 'payload' }));
    });
    it('should send the SetSettingsEvent', (done) => {
      ws.once('message', (data) => {
        data = JSON.parse(data.toString());
        assertType(SetSettingsSchema, data);
        expect(data.event).to.equal('setSettings');
        expect(data.context).to.equal('SetSettingsEventContext');
        expect(data.payload.my).to.equal('payload');
        done();
      });
      pi.sendEvent(new SetSettingsEvent('SetSettingsEventContext', { my: 'payload' }));
    });
  });
});
