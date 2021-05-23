import 'mocha';

import { Plugin, PropertyInspector, Streamdeck } from '../src';
import sinon, { SinonSandbox } from 'sinon';

import { dummyLogger } from 'ts-log';
import { expect } from 'chai';

describe('Streamdeck', () => {
  let sandbox!: SinonSandbox;
  beforeEach(function () {
    sandbox = sinon.createSandbox();
  });
  afterEach(function () {
    sandbox.restore();
  });

  it('should return a plugin instance', () => {
    const factory = new Streamdeck();
    expect(factory.plugin()).to.be.instanceOf(Plugin);
  });
  it('should return a pi instance', () => {
    const factory = new Streamdeck();
    expect(factory.propertyinspector()).to.be.instanceOf(PropertyInspector);
  });
  it('should use the console as default logger', () => {
    const plugin = new Streamdeck().plugin();
    const stub = sandbox.stub(console, 'debug');
    plugin.setTitle('title', 'context');
    expect(stub.callCount).to.equal(1);
  });
  it('should use the custom and not the console as logger', () => {
    const logger = { ...dummyLogger };
    const plugin = new Streamdeck(logger).plugin();
    const consoleSpy = sandbox.spy(console, 'debug');
    const loggerSpy = sandbox.spy(logger, 'debug');
    plugin.setTitle('title', 'context');
    expect(consoleSpy.callCount).to.equal(0);
    expect(loggerSpy.callCount).to.equal(1);
  });
});
