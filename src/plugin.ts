import dayjs from "dayjs";
import { SettingsType } from "./SettingsType";
import assertType from "./streamdeck/events/incoming/assertType";
import { IncomingEventsEnum } from "./streamdeck/events/incoming/IncomingEventsEnum";
import { IncomingPluginEventsEnum } from "./streamdeck/events/incoming/plugin/IncomingPluginEventsEnum";
import GetSettingsEvent from "./streamdeck/events/outgoing/GetSettingsEvent";
import SetTitleEvent from "./streamdeck/events/outgoing/plugin/SetTitleEvent";
import StreamdeckFactory from "./streamdeck/StreamdeckFactory";

const plugin = new StreamdeckFactory().createPlugin();
const intervalCache: Record<string, NodeJS.Timeout> = {};
let format1stLine = "HH:mm";
let format2ndLine = "D/M";

const onTick = (context: string) => {
  plugin.sendEvent(new SetTitleEvent(
    dayjs().format(format1stLine + "\n" + format2ndLine),
    context
  ));
};

plugin.on(IncomingPluginEventsEnum.WillAppear, event => {
  plugin.sendEvent(new GetSettingsEvent(event.context));
  intervalCache[event.context] = setInterval(() => onTick(event.context), 1000);
});
plugin.on(IncomingPluginEventsEnum.WillDisappear, event => {
  clearInterval(intervalCache[event.context]);
});
plugin.on(IncomingEventsEnum.DidReceiveSettings, event => {
  console.log("got settings", event.settings);
  try {
    assertType(SettingsType, event.settings);
    format1stLine = event.settings.format1stLine || format1stLine;
    format2ndLine = event.settings.format2ndLine || format2ndLine;
  } catch (e) {
    // ignore validation error and use default settings
  }
  onTick(event.context);
});

// this makes sure the streamdeck finds our init function (do not remove!)
export default plugin.createStreamdeckConnector();
