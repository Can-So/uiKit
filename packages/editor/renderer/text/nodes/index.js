import blockquote from './blockquote';
import bulletList from './bulletList';
import decisionItem from './decisionItem';
import hardBreak from './hardBreak';
import heading from './heading';
import listItem from './listItem';
import mediaGroup from './mediaGroup';
import orderedList from './orderedList';
import panel from './panel';
import paragraph from './paragraph';
import rule from './rule';
import table from './table';
import taskItem from './taskItem';
import unknown from './unknown';
export var reduce = function (node, schema) {
    var reducer = nodeToReducerMapping[node.type.name] || nodeToReducerMapping.unknown;
    return reducer(node, schema);
};
export var nodeToReducerMapping = {
    blockquote: blockquote,
    bulletList: bulletList,
    decisionItem: decisionItem,
    hardBreak: hardBreak,
    heading: heading,
    listItem: listItem,
    mediaGroup: mediaGroup,
    orderedList: orderedList,
    panel: panel,
    paragraph: paragraph,
    rule: rule,
    table: table,
    taskItem: taskItem,
    unknown: unknown,
};
//# sourceMappingURL=index.js.map