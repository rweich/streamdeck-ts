import { expect } from 'chai';
import EventEmitter from 'eventemitter3';
import 'mocha';
import { dummyLogger } from 'ts-log';
import WebSocket from 'ws';
import {
  assertType,
  GetSettingsEvent,
  OpenUrlEvent,
  SendToPropertyInspectorEvent,
  SetImageEvent,
  SetSettingsEvent,
} from '../src';
import EventFactory from '../src/events/incoming/EventFactory';
import LogMessageEvent from '../src/events/outgoing/LogMessageEvent';
import SetTitleEvent from '../src/events/outgoing/plugin/SetTitleEvent';
import Plugin from '../src/Plugin';
import {
  GetSettingsSchema,
  OpenUrlSchema,
  SendToPropertyInspectorSchema,
  SetImageSchema,
  SetSettingsSchema,
  SetTitleSchema,
} from './events/outgoing/types';
import { LogMessageSchema } from './events/outgoing/types/LogMessageType';

describe('Plugin test', () => {
  it('should queue all send events until the websocket got created', (done) => {
    const plugin = new Plugin(new EventEmitter(), new EventFactory(dummyLogger), dummyLogger);
    plugin.sendEvent(new SetTitleEvent('title1', 'context'));
    plugin.sendEvent(new SetTitleEvent('title2', 'context'));
    const connector = plugin.createStreamdeckConnector();
    const server = new WebSocket.Server({ host: '127.0.0.1', port: 23456 });
    connector('23456', 'uid', 'resisterevent', 'info');
    server.on('connection', (ws: WebSocket) => {
      const messages: string[] = [];
      ws.on('message', (data) => {
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

  describe('sendEvent', () => {
    let plugin: Plugin;
    let server: WebSocket.Server;
    let ws: WebSocket;
    before('prepare websocket', (done) => {
      plugin = new Plugin(new EventEmitter(), new EventFactory(dummyLogger), dummyLogger);
      server = new WebSocket.Server({ host: '127.0.0.1', port: 23456 });
      server.on('connection', (pws: WebSocket) => {
        ws = pws;
        ws.once('message', () => done());
      });
      plugin.createStreamdeckConnector()('23456', 'uid', 'regpropevent', 'info');
    });
    after('shutdown websocket', () => {
      server.close();
    });

    it('should send the GetSettingsEvent', (done) => {
      ws.once('message', (data) => {
        data = JSON.parse(data.toString());
        assertType(GetSettingsSchema, data);
        expect(data.event).to.equal('getSettings');
        expect(data.context).to.equal('PluginGetSettingsEventContext');
        done();
      });
      plugin.sendEvent(new GetSettingsEvent('PluginGetSettingsEventContext'));
    });
    it('should send the LogMessageEvent', (done) => {
      ws.once('message', (data) => {
        data = JSON.parse(data.toString());
        assertType(LogMessageSchema, data);
        expect(data.event).to.equal('logMessage');
        expect(data.payload.message).to.equal('a message to log');
        done();
      });
      plugin.sendEvent(new LogMessageEvent('a message to log'));
    });
    it('should send the OpenUrlEvent', (done) => {
      ws.once('message', (data) => {
        data = JSON.parse(data.toString());
        assertType(OpenUrlSchema, data);
        expect(data.event).to.equal('openUrl');
        expect(data.payload.url).to.equal('the plugin url');
        done();
      });
      plugin.sendEvent(new OpenUrlEvent('the plugin url'));
    });
    it('should send the SendToPropertyInspectorEvent', (done) => {
      ws.once('message', (data) => {
        data = JSON.parse(data.toString());
        assertType(SendToPropertyInspectorSchema, data);
        expect(data.event).to.equal('sendToPropertyInspector');
        expect(data.action).to.equal('actionspte');
        expect(data.context).to.equal('contextt');
        expect(data.payload.the).to.equal('payload');
        done();
      });
      plugin.sendEvent(new SendToPropertyInspectorEvent('actionspte', 'contextt', { the: 'payload' }));
    });
    it('should send the SetImageEvent', (done) => {
      ws.once('message', (data) => {
        data = JSON.parse(data.toString());
        assertType(SetImageSchema, data);
        expect(data.event).to.equal('setImage');
        expect(data.payload.image).to.equal('imagebase64');
        expect(data.context).to.equal('imagecontext');
        done();
      });
      plugin.sendEvent(new SetImageEvent('imagebase64', 'imagecontext'));
    });
    it('should send the SetSettingsEvent', (done) => {
      ws.once('message', (data) => {
        data = JSON.parse(data.toString());
        assertType(SetSettingsSchema, data);
        expect(data.event).to.equal('setSettings');
        expect(data.context).to.equal('PluginSetSettingsEventContext');
        expect(data.payload.my).to.equal('pluginpayload');
        done();
      });
      plugin.sendEvent(new SetSettingsEvent('PluginSetSettingsEventContext', { my: 'pluginpayload' }));
    });
    it('should send the SetTitleEvent', (done) => {
      ws.once('message', (data) => {
        data = JSON.parse(data.toString());
        assertType(SetTitleSchema, data);
        expect(data.event).to.equal('setTitle');
        expect(data.payload.title).to.equal('footitle');
        expect(data.context).to.equal('foocontext');
        done();
      });
      plugin.sendEvent(new SetTitleEvent('footitle', 'foocontext'));
    });
  });
});
