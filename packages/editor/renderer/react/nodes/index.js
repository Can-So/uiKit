import Blockquote from './blockquote';
import BodiedExtension from './bodiedExtension';
import BulletList from './bulletList';
import CodeBlock from './codeBlock';
import DecisionList from './decisionList';
import Doc from './doc';
import Extension from './extension';
import HardBreak from './hardBreak';
import Heading from './heading';
import Image from './image';
import InlineExtension from './inlineExtension';
import LayoutSection from './layoutSection';
import LayoutColumn from './layoutColumn';
import ListItem from './listItem';
import MediaSingle from './mediaSingle';
import OrderedList from './orderedList';
import Panel from './panel';
import Paragraph from './paragraph';
import Placeholder from './placeholder';
import Rule from './rule';
import TaskItem from './taskItem';
import TaskList from './taskList';
import Table from './table';
import TableCell from './tableCell';
import TableHeader from './tableHeader';
import TableRow from './tableRow';
import UnknownBlock from './unknownBlock';
import * as Loadable from 'react-loadable';
var DecisionItem = Loadable({
    loader: function () {
        return import(/* webpackChunkName:"@atlaskit-internal-renderer-node_DecisionItem" */ './decisionItem').then(function (module) { return module.default; });
    },
    loading: function () { return null; },
});
var Date = Loadable({
    loader: function () {
        return import(/* webpackChunkName:"@atlaskit-internal-renderer-node_Date" */ './date').then(function (module) { return module.default; });
    },
    loading: function () { return null; },
});
var Status = Loadable({
    loader: function () {
        return import(/* webpackChunkName:"@atlaskit-internal-renderer-node_Status" */ './status').then(function (module) { return module.default; });
    },
    loading: function () { return null; },
});
var Emoji = Loadable({
    loader: function () {
        return import(/* webpackChunkName:"@atlaskit-internal-renderer-node_Emoji" */ './emoji').then(function (module) { return module.default; });
    },
    loading: function () { return null; },
});
var InlineCard = Loadable({
    loader: function () {
        return import(/* webpackChunkName:"@atlaskit-internal-renderer-node_InlineCard" */ './inlineCard').then(function (module) { return module.default; });
    },
    loading: function () { return null; },
});
var BlockCard = Loadable({
    loader: function () {
        return import(/* webpackChunkName:"@atlaskit-internal-renderer-node_BlockCard" */ './blockCard').then(function (module) { return module.default; });
    },
    loading: function () { return null; },
});
var Media = Loadable({
    loader: function () {
        return import(/* webpackChunkName:"@atlaskit-internal-renderer-node_Media" */ './media').then(function (module) { return module.default; });
    },
    loading: function () { return null; },
});
var MediaGroup = Loadable({
    loader: function () {
        return import(/* webpackChunkName:"@atlaskit-internal-renderer-node_MediaGroup" */ './mediaGroup').then(function (module) { return module.default; });
    },
    loading: function () { return null; },
});
var Mention = Loadable({
    loader: function () {
        return import(/* webpackChunkName:"@atlaskit-internal-renderer-node_Mention" */ './mention').then(function (module) { return module.default; });
    },
    loading: function () { return null; },
});
export var nodeToReact = {
    blockquote: Blockquote,
    bulletList: BulletList,
    blockCard: BlockCard,
    codeBlock: CodeBlock,
    date: Date,
    decisionItem: DecisionItem,
    decisionList: DecisionList,
    doc: Doc,
    emoji: Emoji,
    extension: Extension,
    bodiedExtension: BodiedExtension,
    hardBreak: HardBreak,
    heading: Heading,
    image: Image,
    inlineCard: InlineCard,
    inlineExtension: InlineExtension,
    layoutSection: LayoutSection,
    layoutColumn: LayoutColumn,
    listItem: ListItem,
    media: Media,
    mediaGroup: MediaGroup,
    mediaSingle: MediaSingle,
    mention: Mention,
    orderedList: OrderedList,
    panel: Panel,
    paragraph: Paragraph,
    placeholder: Placeholder,
    rule: Rule,
    status: Status,
    taskItem: TaskItem,
    taskList: TaskList,
    table: Table,
    tableCell: TableCell,
    tableHeader: TableHeader,
    tableRow: TableRow,
    unknownBlock: UnknownBlock,
};
export var toReact = function (node) {
    return nodeToReact[node.type.name];
};
/*
 *  Wraps adjacent textnodes in a textWrapper
 *
 *  Input:
 *  [
 *    {
 *      type: 'text',
 *      text: 'Hello'
 *    },
 *    {
 *      type: 'text',
 *      text: 'World!',
 *      marks: [
 *        {
 *          type: 'strong'
 *        }
 *      ]
 *    }
 *  ]
 *
 *  Output:
 *  [
 *    {
 *      type: 'textWrapper',
 *      content: [
 *        {
 *          type: 'text',
 *          text: 'Hello'
 *        },
 *        {
 *          type: 'text',
 *          text: 'World!',
 *          marks: [
 *            {
 *              type: 'strong'
 *            }
 *          ]
 *        }
 *      ]
 *    }
 *  ]
 */
export var mergeTextNodes = function (nodes) {
    return nodes.reduce(function (acc, current) {
        if (!isText(current.type.name)) {
            acc.push(current);
            return acc;
        }
        // Append node to previous node, if it was a text wrapper
        if (acc.length > 0 && isTextWrapper(acc[acc.length - 1])) {
            acc[acc.length - 1].content.push(current);
        }
        else {
            acc.push({
                type: {
                    name: 'textWrapper',
                },
                content: [current],
            });
        }
        return acc;
    }, []);
};
export var isText = function (type) {
    return type === 'text';
};
export var isTextWrapper = function (node) {
    return node.type.name === 'textWrapper';
};
var whitespaceRegex = /^\s*$/;
/**
 * Detects whether a fragment contains a single paragraph node
 * whose content satisfies the condition for an emoji block
 */
export var isEmojiDoc = function (doc, props) {
    if (props === void 0) { props = {}; }
    if (doc.childCount !== 1) {
        return false;
    }
    var parentNodes = [];
    doc.forEach(function (child) { return parentNodes.push(child); });
    var node = parentNodes[0];
    return node.type.name === 'paragraph' && isEmojiBlock(node.content);
};
var isEmojiBlock = function (pnode) {
    var content = [];
    // Optimisation for long documents - worst case block will be space-emoji-space
    if (pnode.childCount > 7) {
        return false;
    }
    pnode.forEach(function (child) { return content.push(child); });
    var emojiCount = 0;
    for (var i = 0; i < content.length; ++i) {
        var node = content[i];
        switch (node.type.name) {
            case 'text':
                if (node.text && !node.text.match(whitespaceRegex)) {
                    return false;
                }
                continue;
            case 'emoji':
                if (++emojiCount > 3) {
                    return false;
                }
                continue;
            default:
                // Only text and emoji nodes are allowed
                return false;
        }
    }
    return emojiCount > 0;
};
export { Blockquote, BodiedExtension, BulletList, BlockCard, CodeBlock, Date, DecisionItem, DecisionList, Doc, Emoji, Extension, HardBreak, Heading, ListItem, Image, InlineCard, InlineExtension, LayoutSection, LayoutColumn, Media, MediaGroup, MediaSingle, Mention, OrderedList, Panel, Paragraph, Placeholder, Rule, Status, TaskItem, TaskList, Table, TableCell, TableHeader, TableRow, UnknownBlock, };
//# sourceMappingURL=index.js.map