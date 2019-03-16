import { sendEvent } from '../analytics-web-client-wrapper';
import { processEventPayload } from './process-event-payload';
export var handleEvent = function (event, tag, logger, client) {
    if (!event.payload) {
        return;
    }
    var payload = processEventPayload(event, tag);
    sendEvent(logger, client)(payload);
};
//# sourceMappingURL=handle-event.js.map