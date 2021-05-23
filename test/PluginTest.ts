import { EventsReceived, EventsSent } from '@rweich/streamdeck-events';
import {
  GetSettingsType,
  LogMessageType,
  OpenUrlType,
  SendToPropertyInspectorType,
  SetImageType,
  SetSettingsType,
  SetTitleType,
} from '@rweich/streamdeck-events/dist/StreamdeckTypes/Received';
import { expect } from 'chai';
import EventEmitter from 'eventemitter3';
import 'mocha';
import { dummyLogger } from 'ts-log';
import WebSocket from 'ws';
import Plugin from '../src/Plugin';

describe('Plugin test', () => {
  it('should queue all send events until the websocket got created', (done) => {
    const plugin = new Plugin(new EventEmitter(), new EventsReceived(), new EventsSent(), dummyLogger);
    plugin.setTitle('title1', 'context');
    plugin.setTitle('title2', 'context');
    const connector = plugin.createStreamdeckConnector();
    const server = new WebSocket.Server({ host: '127.0.0.1', port: 23456 });
    connector('23456', 'uid', 'resisterevent', '{}');
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
  it('should return the info and pluginUUID', (done) => {
    const plugin = new Plugin(new EventEmitter(), new EventsReceived(), new EventsSent(), dummyLogger);
    expect(Object.keys(plugin.info)).to.be.lengthOf(0);
    const connector = plugin.createStreamdeckConnector();
    const server = new WebSocket.Server({ host: '127.0.0.1', port: 23456 });
    connector('23456', 'uid', 'registering', '{"foo": "bar"}');
    expect(plugin.info.foo).to.equal('bar');
    expect(plugin.pluginUUID).to.equal('uid');
    server.on('connection', () => {
      server.close();
      done();
    });
  });
  it('should log an error if the register info is not valid json', (done) => {
    const server = new WebSocket.Server({ host: '127.0.0.1', port: 23456 });
    const logger = { ...dummyLogger };
    Promise.all([
      new Promise((resolve) => {
        logger.error = (error) => {
          expect(error.message).to.equal('Unexpected token o in JSON at position 1');
          resolve(true);
        };
      }),
      new Promise((resolve) => {
        server.on('connection', () => {
          server.close();
          resolve(true);
        });
      }),
    ]).then(() => done());
    const plugin = new Plugin(new EventEmitter(), new EventsReceived(), new EventsSent(), logger);
    expect(Object.keys(plugin.info)).to.be.lengthOf(0);
    const connector = plugin.createStreamdeckConnector();
    connector('23456', 'uid', 'registering', 'notjson');
    expect(Object.keys(plugin.info)).to.be.lengthOf(0);
  });

  describe('sending events', () => {
    let plugin: Plugin;
    let server: WebSocket.Server;
    let ws: WebSocket;
    before('prepare websocket', (done) => {
      plugin = new Plugin(new EventEmitter(), new EventsReceived(), new EventsSent(), dummyLogger);
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
      ws.once('message', (json) => {
        const data: GetSettingsType = JSON.parse(json.toString());
        expect(data.event).to.equal('getSettings');
        expect(data.context).to.equal('PluginGetSettingsEventContext');
        done();
      });
      plugin.getSettings('PluginGetSettingsEventContext');
    });
    it('should send the LogMessageEvent', (done) => {
      ws.once('message', (json) => {
        const data: LogMessageType = JSON.parse(json.toString());
        expect(data.event).to.equal('logMessage');
        expect(data.payload.message).to.equal('a message to log');
        done();
      });
      plugin.logMessage('a message to log');
    });
    it('should send the OpenUrlEvent', (done) => {
      ws.once('message', (json) => {
        const data: OpenUrlType = JSON.parse(json.toString());
        expect(data.event).to.equal('openUrl');
        expect(data.payload.url).to.equal('the plugin url');
        done();
      });
      plugin.openUrl('the plugin url');
    });
    it('should send the SendToPropertyInspectorEvent', (done) => {
      ws.once('message', (json) => {
        const data: SendToPropertyInspectorType = JSON.parse(json.toString());
        expect(data.event).to.equal('sendToPropertyInspector');
        expect(data.context).to.equal('contextt');
        expect(data.payload.the).to.equal('payload');
        done();
      });
      plugin.sendToPropertyInspector('contextt', { the: 'payload' });
    });
    it('should send the SetImageEvent (without options)', (done) => {
      ws.once('message', (json) => {
        const data: SetImageType = JSON.parse(json.toString());
        expect(data.event).to.equal('setImage');
        expect(data.payload.image).to.equal('imagebase64');
        expect(data.context).to.equal('imagecontext');
        done();
      });
      plugin.setImage('imagebase64', 'imagecontext');
    });
    it('should send the SetImageEvent with the state option', (done) => {
      ws.once('message', (json) => {
        const data: SetImageType = JSON.parse(json.toString());
        expect(data.event).to.equal('setImage');
        expect(data.payload.image).to.equal('imagebase64');
        expect(data.payload.state).to.equal(0);
        expect(data.context).to.equal('imagecontext');
        done();
      });
      plugin.setImage('imagebase64', 'imagecontext', { state: 0 });
    });
    it('should send the SetImageEvent with the target option', (done) => {
      ws.once('message', (json) => {
        const data: SetImageType = JSON.parse(json.toString());
        expect(data.event).to.equal('setImage');
        expect(data.payload.image).to.equal('imagebase64');
        expect(data.payload.target).to.equal(1);
        expect(data.context).to.equal('imagecontext');
        done();
      });
      plugin.setImage('imagebase64', 'imagecontext', { target: 'hardware' });
    });
    it('should send the SetImageEvent with both options', (done) => {
      ws.once('message', (json) => {
        const data: SetImageType = JSON.parse(json.toString());
        expect(data.event).to.equal('setImage');
        expect(data.payload.image).to.equal('imagebase64');
        expect(data.payload.state).to.equal(1);
        expect(data.payload.target).to.equal(0);
        expect(data.context).to.equal('imagecontext');
        done();
      });
      plugin.setImage('imagebase64', 'imagecontext', { state: 1, target: 'both' });
    });
    it('should send the SetSettingsEvent', (done) => {
      ws.once('message', (json) => {
        const data: SetSettingsType = JSON.parse(json.toString());
        expect(data.event).to.equal('setSettings');
        expect(data.context).to.equal('PluginSetSettingsEventContext');
        expect((data.payload as { my: string }).my).to.equal('pluginpayload');
        done();
      });
      plugin.setSettings('PluginSetSettingsEventContext', { my: 'pluginpayload' });
    });
    it('should send the SetTitleEvent without optional params', (done) => {
      ws.once('message', (json) => {
        const data: SetTitleType = JSON.parse(json.toString());
        expect(data.event).to.equal('setTitle');
        expect(data.payload.title).to.equal('footitle');
        expect(data.context).to.equal('foocontext');
        done();
      });
      plugin.setTitle('footitle', 'foocontext');
    });
    it('should send the SetTitleEvent with the state param', (done) => {
      ws.once('message', (json) => {
        const data: SetTitleType = JSON.parse(json.toString());
        expect(data.event).to.equal('setTitle');
        expect(data.payload.title).to.equal('footitle');
        expect(data.payload.state).to.equal(1);
        expect(data.context).to.equal('foocontext');
        done();
      });
      plugin.setTitle('footitle', 'foocontext', { state: 1 });
    });
    it('should send the SetTitleEvent with the target param', (done) => {
      ws.once('message', (json) => {
        const data: SetTitleType = JSON.parse(json.toString());
        expect(data.event).to.equal('setTitle');
        expect(data.payload.title).to.equal('footitle');
        expect(data.payload.target).to.equal(2);
        expect(data.context).to.equal('foocontext');
        done();
      });
      plugin.setTitle('footitle', 'foocontext', { target: 'software' });
    });
    it('should send the SetTitleEvent with both optional params', (done) => {
      ws.once('message', (json) => {
        const data: SetTitleType = JSON.parse(json.toString());
        expect(data.event).to.equal('setTitle');
        expect(data.payload.title).to.equal('footitle');
        expect(data.payload.state).to.equal(0);
        expect(data.payload.target).to.equal(2);
        expect(data.context).to.equal('foocontext');
        done();
      });
      plugin.setTitle('footitle', 'foocontext', { target: 'software', state: 0 });
    });
  });

  describe('receiving events', () => {
    it('should call the registered callback on a sendtopluginevent', (done) => {
      const plugin = new Plugin(new EventEmitter(), new EventsReceived(), new EventsSent(), dummyLogger);
      const connector = plugin.createStreamdeckConnector();
      const server = new WebSocket.Server({ host: '127.0.0.1', port: 23456 });
      plugin.on('sendToPlugin', (event) => {
        expect(event.payload.foo).to.equal('bar');
        server.close();
        done();
      });
      connector('23456', 'uid', 'resisterevent', '{}');
      server.on('connection', (ws: WebSocket) => {
        ws.send(
          JSON.stringify({
            action: 'com.elgato.example.action1',
            event: 'sendToPlugin',
            context: 'opaqueValue312',
            payload: {
              foo: 'bar',
            },
          }),
        );
      });
    });
    it('should log an error on invalid (non) json data', (done) => {
      const logger = { ...dummyLogger };
      logger.error = (error) => {
        expect(error.message).to.include('error on parsing json');
        done();
      };
      const plugin = new Plugin(new EventEmitter(), new EventsReceived(), new EventsSent(), logger);
      const connector = plugin.createStreamdeckConnector();
      const server = new WebSocket.Server({ host: '127.0.0.1', port: 23456 });
      connector('23456', 'uid', 'resisterevent', '{}');
      server.on('connection', (ws: WebSocket) => {
        ws.send('foo');
        server.close();
      });
    });
    it('should log an error on invalid json payload', (done) => {
      const logger = { ...dummyLogger };
      logger.error = () => done();
      const plugin = new Plugin(new EventEmitter(), new EventsReceived(), new EventsSent(), logger);
      const connector = plugin.createStreamdeckConnector();
      const server = new WebSocket.Server({ host: '127.0.0.1', port: 23456 });
      connector('23456', 'uid', 'resisterevent', '{}');
      server.on('connection', (ws: WebSocket) => {
        ws.send(
          JSON.stringify({
            invalid: 'data',
          }),
        );
        server.close();
      });
    });
  });
});
