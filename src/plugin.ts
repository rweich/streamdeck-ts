import dayjs from "dayjs";
import { IncomingPluginEventsEnum } from "./streamdeck/events/incoming/plugin/IncomingPluginEventsEnum";
import SetTitleEvent from "./streamdeck/events/outgoing/plugin/SetTitleEvent";
import StreamdeckFactory from "./streamdeck/StreamdeckFactory";

const plugin = new StreamdeckFactory().createPlugin();
const intervalCache: Record<string, NodeJS.Timeout> = {};

const onTick = (context: string) => {
  plugin.sendEvent(new SetTitleEvent(
    dayjs().format("HH:mm\nDD.MM."),
    context
  ));
};

plugin.on(IncomingPluginEventsEnum.WillAppear, e => {
  onTick(e.context);
  intervalCache[e.context] = setInterval(() => onTick(e.context), 1000);
});
plugin.on(IncomingPluginEventsEnum.WillDisappear, e => {
  clearInterval(intervalCache[e.context]);
});

// this makes sure the streamdeck finds our init function (important stuff!)
export default plugin.createStreamdeckConnector();
