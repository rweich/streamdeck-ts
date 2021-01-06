import { IncomingPropertyinspectorEventsEnum } from "./streamdeck/events/incoming/propertyinspector/IncomingPropertyinspectorEventsEnum";
import StreamdeckFactory from "./streamdeck/StreamdeckFactory";

const pi = new StreamdeckFactory().createPropertyinspector();

pi.on(IncomingPropertyinspectorEventsEnum.SendToPropertyInspector, e => {
  console.log("the plugin sent us something..");
});

// this makes sure the streamdeck finds our init function (important stuff!)
export default pi.createStreamdeckConnector();
