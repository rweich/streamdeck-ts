import { expect } from 'chai';
import 'mocha';
import sinon, { SinonSandbox } from 'sinon';
import { Logger } from 'ts-log';
import { Plugin, PropertyInspector, Streamdeck } from '../src';

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
    const logger: Logger = {
      debug(): void {
        /*noop*/
      },
      info(): void {
        /*noop*/
      },
      trace(): void {
        /*noop*/
      },
      warn(): void {
        /*noop*/
      },
      error(): void {
        /*noop*/
      },
    };
    const plugin = new Streamdeck(logger).plugin();
    const consoleSpy = sandbox.spy(console, 'debug');
    const loggerSpy = sandbox.spy(logger, 'debug');
    plugin.setTitle('title', 'context');
    expect(consoleSpy.callCount).to.equal(0);
    expect(loggerSpy.callCount).to.equal(1);
  });
});
