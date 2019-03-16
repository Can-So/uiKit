import * as tslib_1 from "tslib";
import { DEFAULT_SOURCE, } from '@findable/analytics-gas-types';
import { ELEMENTS_CONTEXT } from '@findable/analytics-namespaced-context';
import * as merge from 'lodash.merge';
var extractFieldsFromContext = function (fieldsToPick) { return function (contexts) {
    return contexts
        .map(function (ctx) {
        return fieldsToPick.reduce(function (result, key) {
            var _a;
            return ctx[key] ? merge(result, (_a = {}, _a[key] = ctx[key], _a)) : result;
        }, {});
    })
        .reduce(function (result, item) { return merge(result, item); }, {});
}; };
var fieldExtractor = extractFieldsFromContext([
    'source',
    'objectType',
    'objectId',
    'containerType',
    'containerId',
    ELEMENTS_CONTEXT,
]);
var updatePayloadWithContext = function (event) {
    if (event.context.length === 0) {
        return tslib_1.__assign({ source: DEFAULT_SOURCE }, event.payload);
    }
    var _a = fieldExtractor(event.context), _b = ELEMENTS_CONTEXT, attributes = _a[_b], fields = tslib_1.__rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
    if (attributes) {
        event.payload.attributes = merge(attributes, event.payload.attributes || {});
    }
    return tslib_1.__assign({ source: DEFAULT_SOURCE }, fields, event.payload);
};
var addTag = function (tag, originalTags) {
    var tags = new Set(originalTags || []);
    tags.add(tag);
    return Array.from(tags);
};
export var processEventPayload = function (event, tag) {
    return tslib_1.__assign({}, updatePayloadWithContext(event), { tags: addTag(tag, event.payload.tags) });
};
//# sourceMappingURL=process-event-payload.js.map