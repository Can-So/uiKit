import * as React from 'react';
import { Fragment, Node } from 'prosemirror-model';

import { AppCardViewProps } from './applicationCard';
import Blockquote from './blockquote';
import BodiedExtension, {
  Props as BodiedExtensionProps,
} from './bodiedExtension';
import BulletList from './bulletList';
import CodeBlock from './codeBlock';
import { Props as DecisionItemProps } from './decisionItem';
import DecisionList from './decisionList';
import Doc from './doc';
import Extension, { Props as ExtensionProps } from './extension';
import HardBreak from './hardBreak';
import Heading from './heading';
import Image from './image';
import InlineExtension, {
  Props as InlineExtensionProps,
} from './inlineExtension';
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

const ApplicationCard = Loadable({
  loader: () =>
    import(/* webpackChunkName:"@atlaskit-internal-renderer-node_ApplicationCard" */
    './applicationCard').then(module => module.default),
  loading: () => null,
});

const DecisionItem = Loadable({
  loader: () =>
    import(/* webpackChunkName:"@atlaskit-internal-renderer-node_DecisionItem" */
    './decisionItem').then(module => module.default),
  loading: () => null,
});

const Date = Loadable({
  loader: () =>
    import(/* webpackChunkName:"@atlaskit-internal-renderer-node_Date" */
    './date').then(module => module.default),
  loading: () => null,
});

const Status = Loadable({
  loader: () =>
    import(/* webpackChunkName:"@atlaskit-internal-renderer-node_Status" */
    './status').then(module => module.default),
  loading: () => null,
});

const Emoji = Loadable({
  loader: () =>
    import(/* webpackChunkName:"@atlaskit-internal-renderer-node_Emoji" */
    './emoji').then(module => module.default),
  loading: () => null,
});

const InlineCard = Loadable({
  loader: () =>
    import(/* webpackChunkName:"@atlaskit-internal-renderer-node_InlineCard" */
    './inlineCard').then(module => module.default),
  loading: () => null,
});

const BlockCard = Loadable({
  loader: () =>
    import(/* webpackChunkName:"@atlaskit-internal-renderer-node_BlockCard" */
    './blockCard').then(module => module.default),
  loading: () => null,
});

const Media = Loadable({
  loader: () =>
    import(/* webpackChunkName:"@atlaskit-internal-renderer-node_Media" */
    './media').then(module => module.default),
  loading: () => null,
});

const MediaGroup = Loadable({
  loader: () =>
    import(/* webpackChunkName:"@atlaskit-internal-renderer-node_MediaGroup" */
    './mediaGroup').then(module => module.default),
  loading: () => null,
});

const Mention = Loadable({
  loader: () =>
    import(/* webpackChunkName:"@atlaskit-internal-renderer-node_Mention" */
    './mention').then(module => module.default),
  loading: () => null,
});

import { bigEmojiHeight } from '../../utils';

export const nodeToReact = {
  applicationCard: ApplicationCard,
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

export const toReact = (node: Node): React.ComponentClass<any> => {
  return nodeToReact[node.type.name];
};

export interface TextWrapper {
  type: {
    name: 'textWrapper';
  };
  content: Node[];
}

export interface NodeSimple {
  type: {
    name: string;
  };
  attrs?: any;
  text?: string;
}

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
export const mergeTextNodes = (nodes: (Node | NodeSimple)[]) => {
  return nodes.reduce<(TextWrapper | Node | NodeSimple)[]>((acc, current) => {
    if (!isText(current.type.name)) {
      acc.push(current);
      return acc;
    }

    // Append node to previous node, if it was a text wrapper
    if (acc.length > 0 && isTextWrapper(acc[acc.length - 1].type.name)) {
      (acc[acc.length - 1] as TextWrapper).content!.push(current as Node);
    } else {
      acc.push({
        type: {
          name: 'textWrapper',
        },
        content: [current],
      } as TextWrapper);
    }

    return acc;
  }, []);
};

export const isText = (type: string): type is 'text' => {
  return type === 'text';
};

export const isTextWrapper = (type: string): type is 'textWrapper' => {
  return type === 'textWrapper';
};

const whitespaceRegex = /^\s*$/;

/**
 * Detects whether a fragment contains a single paragraph node
 * whose content satisfies the condition for an emoji block
 */
export const isEmojiDoc = (doc: Fragment, props: any = {}): boolean => {
  // Previously calculated to be true so pass prop down
  // from paragraph node to emoji node
  if (props.fitToHeight === bigEmojiHeight) {
    return true;
  }
  if (doc.childCount !== 1) {
    return false;
  }
  const parentNodes: Node[] = [];
  doc.forEach(child => parentNodes.push(child));
  const node = parentNodes[0];
  return node.type.name === 'paragraph' && isEmojiBlock(node.content);
};

const isEmojiBlock = (pnode: Fragment): boolean => {
  const content: Node[] = [];
  // Optimisation for long documents - worst case block will be space-emoji-space
  if (pnode.childCount > 7) {
    return false;
  }
  pnode.forEach(child => content.push(child));
  let emojiCount = 0;
  for (let i = 0; i < content.length; ++i) {
    const node = content[i];
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

export {
  AppCardViewProps,
  ApplicationCard,
  Blockquote,
  BodiedExtension,
  BodiedExtensionProps,
  BulletList,
  BlockCard,
  CodeBlock,
  Date,
  DecisionItem,
  DecisionItemProps,
  DecisionList,
  Doc,
  Emoji,
  Extension,
  ExtensionProps,
  HardBreak,
  Heading,
  ListItem,
  Image,
  InlineCard,
  InlineExtension,
  InlineExtensionProps,
  LayoutSection,
  LayoutColumn,
  Media,
  MediaGroup,
  MediaSingle,
  Mention,
  OrderedList,
  Panel,
  Paragraph,
  Placeholder,
  Rule,
  Status,
  TaskItem,
  TaskList,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  UnknownBlock,
};
