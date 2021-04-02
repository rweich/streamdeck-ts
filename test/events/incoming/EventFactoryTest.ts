import { expect } from 'chai';
import { MessageEvent } from 'isomorphic-ws';
import 'mocha';
import { dummyLogger } from 'ts-log';
import EventFactory from '../../../src/events/incoming/EventFactory';
import MissingEventInPayloadError from '../../../src/events/incoming/exception/MissingEventInPayloadError';
import UnknownEventError from '../../../src/events/incoming/exception/UnknownEventError';
import {
  ApplicationDidLaunchEvent,
  ApplicationDidTerminateEvent,
  DeviceDidConnectEvent,
  KeyDownEvent,
  KeyUpEvent,
  SendToPluginIncomingEvent,
  TitleParametersDidChangeEvent,
  WillAppearEvent,
  WillDisappearEvent,
} from '../../../src/events/incoming/plugin';
import { SendToPropertyInspectorIncomingEvent } from '../../../src/events/incoming/propertyinspector';
import eventAppDidLaunch from './fixtures/applicationDidLaunchEvent.valid.json';
import eventAppDidTerminate from './fixtures/applicationDidTerminateEvent.valid.json';
import eventDeviceconnect from './fixtures/deviceDidConnectEvent.valid.json';
import eventKeydown from './fixtures/keyDownEvent.valid.json';
import eventKeyup from './fixtures/keyUpEvent.valid.json';
import eventSendtoplugin from './fixtures/sendToPluginEvent.valid.json';
import eventSendtoPropertyInspector from './fixtures/sendToPropertyInspectorEvent.valid.json';
import eventTitleparamchange from './fixtures/titleParametersDidChangeEvent.valid.json';
import eventWillappear from './fixtures/willAppearEvent.valid.json';
import eventWilldisappear from './fixtures/willDisappearEvent.valid.json';

describe('EventFactory test', () => {
  it('throws an error if no event type is specified', () => {
    const factory = new EventFactory(dummyLogger);
    const event = { data: JSON.stringify({}) } as MessageEvent;
    expect(() => factory.createByMessageEvent(event)).to.throw(MissingEventInPayloadError);
  });

  it('throws an error on an unknown event type', () => {
    const factory = new EventFactory(dummyLogger);
    const event = { data: JSON.stringify({ event: 'hello' }) } as MessageEvent;
    expect(() => factory.createByMessageEvent(event)).to.throw(UnknownEventError);
  });

  it('should return a applicationdidlaunch event', () => {
    const event = { data: JSON.stringify(eventAppDidLaunch) } as MessageEvent;
    expect(new EventFactory(dummyLogger).createByMessageEvent(event)).to.be.instanceOf(ApplicationDidLaunchEvent);
  });

  it('should return a applicationdidterminate event', () => {
    const event = { data: JSON.stringify(eventAppDidTerminate) } as MessageEvent;
    expect(new EventFactory(dummyLogger).createByMessageEvent(event)).to.be.instanceOf(ApplicationDidTerminateEvent);
  });

  it('should return a keydown event', () => {
    const event = { data: JSON.stringify(eventKeydown) } as MessageEvent;
    expect(new EventFactory(dummyLogger).createByMessageEvent(event)).to.be.instanceOf(KeyDownEvent);
  });

  it('should return a keyup event', () => {
    const event = { data: JSON.stringify(eventKeyup) } as MessageEvent;
    expect(new EventFactory(dummyLogger).createByMessageEvent(event)).to.be.instanceOf(KeyUpEvent);
  });

  it('should return a willappear event', () => {
    const event = { data: JSON.stringify(eventWillappear) } as MessageEvent;
    expect(new EventFactory(dummyLogger).createByMessageEvent(event)).to.be.instanceOf(WillAppearEvent);
  });

  it('should return a willdisappear event', () => {
    const event = { data: JSON.stringify(eventWilldisappear) } as MessageEvent;
    expect(new EventFactory(dummyLogger).createByMessageEvent(event)).to.be.instanceOf(WillDisappearEvent);
  });

  it('should return a devicedidconnect event', () => {
    const event = { data: JSON.stringify(eventDeviceconnect) } as MessageEvent;
    expect(new EventFactory(dummyLogger).createByMessageEvent(event)).to.be.instanceOf(DeviceDidConnectEvent);
  });

  it('should return a titelparamchange event', () => {
    const event = { data: JSON.stringify(eventTitleparamchange) } as MessageEvent;
    expect(new EventFactory(dummyLogger).createByMessageEvent(event)).to.be.instanceOf(TitleParametersDidChangeEvent);
  });

  it('should return a sendtoplugin event', () => {
    const event = { data: JSON.stringify(eventSendtoplugin) } as MessageEvent;
    expect(new EventFactory(dummyLogger).createByMessageEvent(event)).to.be.instanceOf(SendToPluginIncomingEvent);
  });

  it('should return a sendtopropertyinspector event', () => {
    const event = { data: JSON.stringify(eventSendtoPropertyInspector) } as MessageEvent;
    expect(new EventFactory(dummyLogger).createByMessageEvent(event)).to.be.instanceOf(
      SendToPropertyInspectorIncomingEvent,
    );
  });
});
