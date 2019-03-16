import * as tslib_1 from "tslib";
import { createAndFireEvent } from '@findable/analytics-next';
import * as uuid from 'uuid/v4';
import { name as packageName, version as packageVersion } from './version.json';
import { UserType, } from './types';
export var startSession = function () { return ({
    id: uuid(),
    start: Date.now(),
    inputChangeTime: Date.now(),
    upCount: 0,
    downCount: 0,
    lastKey: undefined,
}); };
export var createAndFireEventInElementsChannel = createAndFireEvent('fabric-elements');
var createEvent = function (eventType, action, actionSubject, attributes) {
    if (attributes === void 0) { attributes = {}; }
    return ({
        eventType: eventType,
        action: action,
        actionSubject: actionSubject,
        attributes: tslib_1.__assign({ packageName: packageName,
            packageVersion: packageVersion }, attributes),
    });
};
var optionData2Analytics = function (_a) {
    var id = _a.id, type = _a.type;
    return ({
        id: id,
        type: type || UserType,
    });
};
var buildValueForAnalytics = function (value) {
    if (value) {
        var valueToConvert = Array.isArray(value) ? value : [value];
        return valueToConvert.map(function (_a) {
            var data = _a.data;
            return optionData2Analytics(data);
        });
    }
    return [];
};
export var focusEvent = function (props, state, session) {
    return createEvent('ui', 'focused', 'userPicker', {
        sessionId: sessionId(session),
        values: buildValueForAnalytics(state.value),
        pickerType: pickerType(props),
    });
};
export var clearEvent = function (props, state, session) {
    return createEvent('ui', 'cleared', 'userPicker', {
        pickerType: pickerType(props),
        pickerOpen: state.menuIsOpen,
        sessionId: sessionId(session),
        values: values(state),
    });
};
export var deleteEvent = function (_, state, session) {
    var args = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        args[_i - 3] = arguments[_i];
    }
    return createEvent('ui', 'deleted', 'userPickerItem', {
        sessionId: sessionId(session),
        value: optionData2Analytics(args[0]),
        pickerOpen: state.menuIsOpen,
    });
};
export var cancelEvent = function (props, _, session) {
    var args = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        args[_i - 3] = arguments[_i];
    }
    return createEvent('ui', 'cancelled', 'userPicker', {
        sessionId: sessionId(session),
        sessionDuration: sessionDuration(session),
        queryLength: queryLength(args[0]),
        spaceInQuery: spaceInQuery(args[0]),
        upKeyCount: upKeyCount(session),
        downKeyCount: downKeyCount(session),
        pickerType: pickerType(props),
    });
};
export var selectEvent = function (props, state, session) {
    var args = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        args[_i - 3] = arguments[_i];
    }
    return createEvent('ui', selectEventType(session), 'userPicker', {
        sessionId: sessionId(session),
        pickerType: pickerType(props),
        sessionDuration: sessionDuration(session),
        position: position(state, args[0]),
        queryLength: queryLength(state),
        spaceInQuery: spaceInQuery(state),
        upKeyCount: upKeyCount(session),
        downKeyCount: downKeyCount(session),
        result: result(args[0]),
    });
};
export var searchedEvent = function (props, state, session) {
    return createEvent('operational', 'searched', 'userPicker', {
        sessionId: sessionId(session),
        sessionDuration: sessionDuration(session),
        durationSinceInputChange: durationSinceInputChange(session),
        queryLength: queryLength(state),
        isLoading: isLoading(props, state),
        results: results(state),
        pickerType: pickerType(props),
    });
};
export var failedEvent = function (props, _, session) {
    return createEvent('operational', 'failed', 'userPicker', {
        pickerType: pickerType(props),
        sessionId: sessionId(session),
    });
};
function queryLength(state) {
    return state.inputValue.length;
}
function selectEventType(session) {
    return session && session.lastKey === 13 ? 'pressed' : 'clicked';
}
function upKeyCount(session) {
    return session ? session.upCount : null;
}
function downKeyCount(session) {
    return session ? session.downCount : null;
}
function spaceInQuery(state) {
    return state.inputValue.indexOf(' ') !== -1;
}
function sessionDuration(session) {
    return session ? Date.now() - session.start : null;
}
function durationSinceInputChange(session) {
    return session ? Date.now() - session.inputChangeTime : null;
}
function sessionId(session) {
    return session && session.id;
}
function position(state, value) {
    return value ? state.options.findIndex(function (option) { return option === value.data; }) : -1;
}
function pickerType(props) {
    return props.isMulti ? 'multi' : 'single';
}
function result(option) {
    return option ? optionData2Analytics(option.data) : null;
}
function results(state) {
    return (state.options || []).map(optionData2Analytics);
}
function isLoading(props, state) {
    return state.count > 0 || props.isLoading;
}
function values(state) {
    return state.value
        ? Array.isArray(state.value)
            ? state.value.map(function (option) { return optionData2Analytics(option.data); })
            : [optionData2Analytics(state.value.data)]
        : [];
}
//# sourceMappingURL=analytics.js.map