import * as tslib_1 from "tslib";
import { logError } from '../../util/logger';
var MAX_CHANNELS_PER_FETCH_CALL = 500;
var MAX_MESSAGES_IN_CHANNEL_PER_FETCH_CALL = 25;
var HistoryFetcher = /** @class */ (function () {
    function HistoryFetcher(config) {
        var _this = this;
        this.historyFetched = function (status, response) {
            var e_1, _a;
            if (status.error) {
                logError('Error fetching history,', status.statusCode);
                return;
            }
            if (!_this.pubNubClient) {
                return;
            }
            var channelsWithMoreMessages = [];
            for (var channel in response.channels) {
                var messages = response.channels[channel];
                try {
                    for (var messages_1 = tslib_1.__values(messages), messages_1_1 = messages_1.next(); !messages_1_1.done; messages_1_1 = messages_1.next()) {
                        var message = messages_1_1.value;
                        _this.messageHandler(message);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (messages_1_1 && !messages_1_1.done && (_a = messages_1.return)) _a.call(messages_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                if (messages.length === MAX_MESSAGES_IN_CHANNEL_PER_FETCH_CALL) {
                    // We potentially have more messages to load
                    channelsWithMoreMessages.push({
                        channelName: channel,
                        timeToken: messages[messages.length - 1].timetoken,
                    });
                }
            }
            if (channelsWithMoreMessages.length > 0) {
                _this.tooMuchHistoryHandler();
            }
        };
        this.pubNubClient = config.pubNubClient;
        this.messageHandler = config.messageHandler;
        this.tooMuchHistoryHandler = config.tooMuchHistoryHandler;
    }
    HistoryFetcher.prototype.fetch = function (channels, sinceTimetoken) {
        for (var i = 0; i < channels.length; i += MAX_CHANNELS_PER_FETCH_CALL) {
            var currentSlice = channels.slice(i, i + MAX_CHANNELS_PER_FETCH_CALL);
            this.pubNubClient.fetchMessages({
                channels: currentSlice,
                count: MAX_MESSAGES_IN_CHANNEL_PER_FETCH_CALL,
                end: sinceTimetoken,
            }, this.historyFetched);
        }
    };
    return HistoryFetcher;
}());
export default HistoryFetcher;
//# sourceMappingURL=pubNubHistoryFetcher.js.map