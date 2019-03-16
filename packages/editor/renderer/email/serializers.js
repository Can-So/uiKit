import blockquote from './nodes/blockquote';
import bulletList from './nodes/bullet-list';
import codeBlock from './nodes/code-block';
import decisionItem from './nodes/decision-item';
import decisionList from './nodes/decision-list';
import emoji from './nodes/emoji';
import hardBreak from './nodes/hard-break';
import heading from './nodes/heading';
import listItem from './nodes/list-item';
import mention from './nodes/mention';
import orderedList from './nodes/ordered-list';
import panel from './nodes/panel';
import paragraph from './nodes/paragraph';
import rule from './nodes/rule';
import table from './nodes/table';
import tableCell from './nodes/table-cell';
import tableHeader from './nodes/table-header';
import tableRow from './nodes/table-row';
import text from './nodes/text';
import unknownBlock from './nodes/unknown-block';
import status from './nodes/status';
import code from './marks/code';
import em from './marks/em';
import link from './marks/link';
import strike from './marks/strike';
import strong from './marks/strong';
import subsup from './marks/subsup';
import textColor from './marks/text-color';
import underline from './marks/underline';
import indentation from './marks/indentation';
import alignment from './marks/alignment';
var renderNothing = function () { return ''; };
export var nodeSerializers = {
    bodiedExtension: renderNothing,
    blockquote: blockquote,
    bulletList: bulletList,
    codeBlock: codeBlock,
    decisionList: decisionList,
    decisionItem: decisionItem,
    emoji: emoji,
    image: renderNothing,
    hardBreak: hardBreak,
    heading: heading,
    listItem: listItem,
    mediaGroup: renderNothing,
    mention: mention,
    orderedList: orderedList,
    panel: panel,
    paragraph: paragraph,
    rule: rule,
    table: table,
    tableCell: tableCell,
    tableHeader: tableHeader,
    tableRow: tableRow,
    taskList: renderNothing,
    text: text,
    unknownBlock: unknownBlock,
    status: status,
};
export var markSerializers = {
    code: code,
    em: em,
    indentation: indentation,
    link: link,
    strike: strike,
    strong: strong,
    subsup: subsup,
    textColor: textColor,
    underline: underline,
    alignment: alignment,
};
//# sourceMappingURL=serializers.js.map