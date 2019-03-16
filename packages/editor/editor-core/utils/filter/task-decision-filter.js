import { filterContentByType, filterSliceByType } from './filter';
var taskDecisionAllowedNodeTypes = new Set([
    'text',
    'emoji',
    'mention',
    'status',
    'date',
    'hardBreak',
]);
export function taskDecisionDocFilter(doc, schema) {
    return filterContentByType(doc, taskDecisionAllowedNodeTypes, schema, true);
}
export function taskDecisionSliceFilter(schema) {
    return function (slice) {
        return filterSliceByType(slice, taskDecisionAllowedNodeTypes, schema, true);
    };
}
//# sourceMappingURL=task-decision-filter.js.map