import 'mocha';

import { EventsReceived, EventsSent } from '@rweich/streamdeck-events';
import {
  GetGlobalSettingsType,
  GetSettingsType,
  LogMessageType,
  OpenUrlType,
  SendToPluginType,
  SetGlobalSettingsType,
  SetSettingsType,
} from '@rweich/streamdeck-events/dist/StreamdeckTypes/Received';
import WebSocket, { Server } from 'ws';

import EventEmitter from 'eventemitter3';
import PropertyInspector from '../src/PropertyInspector';
import { dummyLogger } from 'ts-log';
import { expect } from 'chai';

describe('PropertyInspector test', () => {
  it('should queue all send events until the websocket got created', (done) => {
    const pi = new PropertyInspector(new EventEmitter(), new EventsReceived(), new EventsSent(), dummyLogger);
    pi.logMessage('message1');
    pi.logMessage('message2');
    const connector = pi.createStreamdeckConnector();
    const server = new Server({ host: '127.0.0.1', port: 23456 });
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
    const server = new Server({ host: '127.0.0.1', port: 23456 });
    const pi = new PropertyInspector(emitter, new EventsReceived(), new EventsSent(), dummyLogger);
    const connector = pi.createStreamdeckConnector();
    emitter.on('websocketOpen', () => {
      server.close();
      done();
    });
    connector('23456', 'uid', 'register', 'info');
  });
  it('should dispatch the connect event after connetion (new listener)', (done) => {
    const emitter = new EventEmitter();
    const server = new Server({ host: '127.0.0.1', port: 23456 });
    const pi = new PropertyInspector(emitter, new EventsReceived(), new EventsSent(), dummyLogger);
    const connector = pi.createStreamdeckConnector();
    emitter.on('websocketOpen', () => {
      server.close();
      done();
    });
    connector('23456', 'uid', 'register', 'info');
  });

  describe('send events', () => {
    let pi: PropertyInspector;
    let server: Server;
    let ws: WebSocket;
    before('prepare websocket', (done) => {
      pi = new PropertyInspector(new EventEmitter(), new EventsReceived(), new EventsSent(), dummyLogger);
      server = new Server({ host: '127.0.0.1', port: 23456 });
      server.on('connection', (pws: WebSocket) => {
        ws = pws;
        ws.once('message', () => done());
      });
      pi.createStreamdeckConnector()('23456', 'uid', 'regpropevent', 'info');
    });
    after('shutdown websocket', () => {
      server.close();
    });

    it('should send the GetGlobalSettingsEvent', (done) => {
      ws.once('message', (json) => {
        const data: GetGlobalSettingsType = JSON.parse(json.toString());
        expect(data.event).to.equal('getGlobalSettings');
        expect(data.context).to.equal('PiGetGlobalSettingsEventContext');
        done();
      });
      pi.getGlobalSettings('PiGetGlobalSettingsEventContext');
    });
    it('should send the GetSettingsEvent', (done) => {
      ws.once('message', (json) => {
        const data: GetSettingsType = JSON.parse(json.toString());
        expect(data.event).to.equal('getSettings');
        expect(data.context).to.equal('GetSettingsEventContext');
        done();
      });
      pi.getSettings('GetSettingsEventContext');
    });
    it('should send the LogMessageEvent', (done) => {
      ws.once('message', (json) => {
        const data: LogMessageType = JSON.parse(json.toString());
        expect(data.event).to.equal('logMessage');
        expect(data.payload.message).to.equal('a message to log');
        done();
      });
      pi.logMessage('a message to log');
    });
    it('should send the OpenUrlEvent', (done) => {
      ws.once('message', (json) => {
        const data: OpenUrlType = JSON.parse(json.toString());
        expect(data.event).to.equal('openUrl');
        expect(data.payload.url).to.equal('the pi url');
        done();
      });
      pi.openUrl('the pi url');
    });
    it('should send the SendToPluginEvent', (done) => {
      ws.once('message', (json) => {
        const data: SendToPluginType = JSON.parse(json.toString());
        expect(data.event).to.equal('sendToPlugin');
        expect(data.action).to.equal('pac');
        expect(data.context).to.equal('con');
        expect((data.payload as { some: string }).some).to.equal('payload');
        done();
      });
      pi.sendToPlugin('con', { some: 'payload' }, 'pac');
    });
    it('should send the SetGlobalSettingsEvent', (done) => {
      ws.once('message', (json) => {
        const data: SetGlobalSettingsType = JSON.parse(json.toString());
        expect(data.event).to.equal('setGlobalSettings');
        expect(data.context).to.equal('PiSetGlobalSettingsEventContext');
        expect((data.payload as { global: string }).global).to.equal('pipayload');
        done();
      });
      pi.setGlobalSettings('PiSetGlobalSettingsEventContext', { global: 'pipayload' });
    });
    it('should send the SetSettingsEvent', (done) => {
      ws.once('message', (json) => {
        const data: SetSettingsType = JSON.parse(json.toString());
        expect(data.event).to.equal('setSettings');
        expect(data.context).to.equal('SetSettingsEventContext');
        expect((data.payload as { my: string }).my).to.equal('payload');
        done();
      });
      pi.setSettings('SetSettingsEventContext', { my: 'payload' });
    });
  });
});
