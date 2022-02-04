import { ReceivedPluginEventTypes } from '@rweich/streamdeck-events/dist/Events/Received/Plugin/ReceivedPluginEventTypes';
import { ReceivedPropertyInspectorEventTypes } from '@rweich/streamdeck-events/dist/Events/Received/PropertyInspector/ReceivedPropertyInspectorEventTypes';

import OnWebsocketOpenEvent from './OnWebsocketOpenEvent';

type EventMapOfUnion<T extends { event: string }> = {
  [P in T['event']]: (event: Extract<T, { event: P }>) => void;
};
export type PluginEvents = EventMapOfUnion<ReceivedPluginEventTypes | OnWebsocketOpenEvent>;
export type PIEvents = EventMapOfUnion<ReceivedPropertyInspectorEventTypes | OnWebsocketOpenEvent>;
