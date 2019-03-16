import { defaultSchema } from '@atlaskit/adf-schema';
import { getValidDocument, getValidNode, } from '@atlaskit/editor-common';
import { Fragment } from 'prosemirror-model';
var SUPPORTS_HIRES_TIMER_API = window.performance && performance.now;
var withStopwatch = function (cb) {
    var startTime = SUPPORTS_HIRES_TIMER_API ? performance.now() : Date.now();
    var output = cb();
    var endTime = SUPPORTS_HIRES_TIMER_API ? performance.now() : Date.now();
    var time = endTime - startTime;
    return { output: output, time: time };
};
export var renderDocument = function (doc, serializer, schema, adfStage) {
    if (schema === void 0) { schema = defaultSchema; }
    if (adfStage === void 0) { adfStage = 'final'; }
    var stat = { sanitizeTime: 0 };
    var _a = withStopwatch(function () {
        return getValidDocument(doc, schema, adfStage);
    }), validDoc = _a.output, sanitizeTime = _a.time;
    // save sanitize time to stats
    stat.sanitizeTime = sanitizeTime;
    if (!validDoc) {
        return { stat: stat, result: null };
    }
    var _b = withStopwatch(function () {
        var pmNode = schema.nodeFromJSON(validDoc);
        pmNode.check();
        return pmNode;
    }), node = _b.output, buildTreeTime = _b.time;
    // save build tree time to stats
    stat.buildTreeTime = buildTreeTime;
    var _c = withStopwatch(function () {
        return serializer.serializeFragment(node.content);
    }), result = _c.output, serializeTime = _c.time;
    // save serialize tree time to stats
    stat.serializeTime = serializeTime;
    return { result: result, stat: stat };
};
export var renderNodes = function (nodes, serializer, schema, target, adfStage) {
    if (schema === void 0) { schema = defaultSchema; }
    if (adfStage === void 0) { adfStage = 'final'; }
    var validNodes = nodes.map(function (n) { return getValidNode(n, schema, adfStage); });
    var pmFragment = Fragment.fromJSON(schema, validNodes);
    return serializer.serializeFragment(pmFragment, {}, target, 'node-0');
};
//# sourceMappingURL=render-document.js.map