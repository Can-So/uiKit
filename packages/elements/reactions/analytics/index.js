import * as tslib_1 from "tslib";
import { createAndFireEvent } from '@findable/analytics-next';
import { UI_EVENT_TYPE, OPERATIONAL_EVENT_TYPE, } from '@findable/analytics-gas-types';
import { name as packageName, version as packageVersion, } from '../version.json';
export var createAndFireEventInElementsChannel = createAndFireEvent('fabric-elements');
export var createAndFireSafe = function (createAnalyticsEvent, creator) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    if (createAnalyticsEvent) {
        createAndFireEventInElementsChannel(creator.apply(void 0, tslib_1.__spread(args)))(createAnalyticsEvent);
    }
};
var createPayload = function (action, actionSubject, eventType, actionSubjectId) { return function (attributes) { return ({
    action: action,
    actionSubject: actionSubject,
    eventType: eventType,
    actionSubjectId: actionSubjectId,
    attributes: tslib_1.__assign({}, attributes, { packageName: packageName,
        packageVersion: packageVersion }),
}); }; };
var calculateDuration = function (startTime) {
    return startTime ? Date.now() - startTime : undefined;
};
var getPreviousState = function (reaction) {
    if (reaction) {
        if (reaction.reacted) {
            return 'existingReacted';
        }
        return 'existingNotReacted';
    }
    return 'new';
};
export var createReactionsRenderedEvent = function (startTime) {
    return createPayload('rendered', 'reactionView', OPERATIONAL_EVENT_TYPE)({
        duration: calculateDuration(startTime),
    });
};
export var createPickerButtonClickedEvent = function (reactionEmojiCount) {
    return createPayload('clicked', 'reactionPickerButton', UI_EVENT_TYPE)({
        reactionEmojiCount: reactionEmojiCount,
    });
};
export var createPickerCancelledEvent = function (startTime) {
    return createPayload('cancelled', 'reactionPicker', UI_EVENT_TYPE)({
        duration: calculateDuration(startTime),
    });
};
export var createPickerMoreClickedEvent = function (startTime) {
    return createPayload('clicked', 'reactionPicker', UI_EVENT_TYPE, 'more')({
        duration: calculateDuration(startTime),
    });
};
export var createReactionSelectionEvent = function (source, emojiId, reaction, startTime) {
    return createPayload('clicked', 'reactionPicker', UI_EVENT_TYPE, 'emoji')({
        duration: calculateDuration(startTime),
        source: source,
        previousState: getPreviousState(reaction),
        emojiId: emojiId,
    });
};
export var createReactionHoveredEvent = function (startTime) {
    return createPayload('hovered', 'existingReaction', UI_EVENT_TYPE)({
        duration: calculateDuration(startTime),
    });
};
export var createReactionClickedEvent = function (added, emojiId) {
    return createPayload('clicked', 'existingReaction', UI_EVENT_TYPE)({
        added: added,
        emojiId: emojiId,
    });
};
//# sourceMappingURL=index.js.map