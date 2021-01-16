import { is } from "ts-type-guards";
import { SettingsType } from "./SettingsType";
import assertType from "./streamdeck/events/incoming/assertType";
import { IncomingEventsEnum } from "./streamdeck/events/incoming/IncomingEventsEnum";
import GetSettingsEvent from "./streamdeck/events/outgoing/GetSettingsEvent";
import SetSettingsEvent from "./streamdeck/events/outgoing/SetSettingsEvent";
import StreamdeckFactory from "./streamdeck/StreamdeckFactory";

const pi = new StreamdeckFactory().createPropertyinspector();

const default1stLineFormat = "HH:mm";
const default2ndLineFormat = "D/M";

const getInput = (name: string): HTMLInputElement | null => {
  const input = document.querySelector("input[name='" + name + "']");
  if (is(HTMLInputElement)(input)) {
    return input;
  }
  return null;
};

const getInputVal = (name: string): string | null => {
  const input = getInput(name);
  return input ? input.name : null;
};

const setInputVal = (name: string, value: string): void => {
  const input = getInput(name);
  if (input) {
    input.value = value;
  }
};

const onInput = (event: Event): void => {
  console.log("item changed", event.target, "event:", event);
  if (pi.context === null) {
    console.error("pi has no context or action!", pi.context, pi.action);
    return;
  }
  if (!is(HTMLInputElement)(event.target)) {
    return;
  }
  pi.sendEvent(new SetSettingsEvent(pi.context, {
    format1stLine: getInputVal("format1stline") || default1stLineFormat,
    format2ndLine: getInputVal("format2ndline") || default2ndLineFormat
  }));
};

pi.on(IncomingEventsEnum.OnWebsocketOpen, event => {
  // were there any settings saved?
  pi.sendEvent(new GetSettingsEvent(event.uuid));

  // register input event listeners
  Array.from(document.querySelectorAll(".sdpi-item-value")).forEach(input => {
    if (is(HTMLInputElement)(input)) {
      input.addEventListener("input", onInput);
    }
  });
});

pi.on(IncomingEventsEnum.DidReceiveSettings, event => {
  try {
    assertType(SettingsType, event.settings);
    setInputVal("format1stline", event.settings.format1stLine || default1stLineFormat);
    setInputVal("format2ndline", event.settings.format2ndLine || default2ndLineFormat);
  } catch (e) {
    setInputVal("format1stline", default1stLineFormat);
    setInputVal("format2ndline", default2ndLineFormat);
  }
});

// this makes sure the streamdeck finds our init function (do not remove!)
export default pi.createStreamdeckConnector();
