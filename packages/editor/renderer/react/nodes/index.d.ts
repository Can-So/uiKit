import * as React from 'react';
import { Fragment, Node } from 'prosemirror-model';
import Blockquote from './blockquote';
import BodiedExtension, { Props as BodiedExtensionProps } from './bodiedExtension';
import BulletList from './bulletList';
import CodeBlock from './codeBlock';
import DecisionList from './decisionList';
import Doc from './doc';
import Extension, { Props as ExtensionProps } from './extension';
import HardBreak from './hardBreak';
import Heading from './heading';
import Image from './image';
import InlineExtension, { Props as InlineExtensionProps } from './inlineExtension';
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
declare const DecisionItem: (React.ComponentClass<{}, any> & Loadable.LoadableComponent) | (React.StatelessComponent<{}> & Loadable.LoadableComponent);
declare const Date: (React.ComponentClass<import("./date").Props, any> & Loadable.LoadableComponent) | (React.StatelessComponent<import("./date").Props> & Loadable.LoadableComponent);
declare const Status: (React.ComponentClass<import("./status").Props, any> & Loadable.LoadableComponent) | (React.StatelessComponent<import("./status").Props> & Loadable.LoadableComponent);
declare const Emoji: (React.ComponentClass<import("./emoji").EmojiProps, any> & Loadable.LoadableComponent) | (React.StatelessComponent<import("./emoji").EmojiProps> & Loadable.LoadableComponent);
declare const InlineCard: (React.ComponentClass<{
    url?: string | undefined;
    data?: object | undefined;
    eventHandlers?: import("@atlaskit/editor-common/ui/EventHandlers").EventHandlers | undefined;
}, any> & Loadable.LoadableComponent) | (React.StatelessComponent<{
    url?: string | undefined;
    data?: object | undefined;
    eventHandlers?: import("@atlaskit/editor-common/ui/EventHandlers").EventHandlers | undefined;
}> & Loadable.LoadableComponent);
declare const BlockCard: (React.ComponentClass<{
    url?: string | undefined;
    data?: object | undefined;
    eventHandlers?: import("@atlaskit/editor-common/ui/EventHandlers").EventHandlers | undefined;
}, any> & Loadable.LoadableComponent) | (React.StatelessComponent<{
    url?: string | undefined;
    data?: object | undefined;
    eventHandlers?: import("@atlaskit/editor-common/ui/EventHandlers").EventHandlers | undefined;
}> & Loadable.LoadableComponent);
declare const Media: (React.ComponentClass<import("./media").MediaProps, any> & Loadable.LoadableComponent) | (React.StatelessComponent<import("./media").MediaProps> & Loadable.LoadableComponent);
declare const MediaGroup: (React.ComponentClass<import("./mediaGroup").MediaGroupProps, any> & Loadable.LoadableComponent) | (React.StatelessComponent<import("./mediaGroup").MediaGroupProps> & Loadable.LoadableComponent);
declare const Mention: (React.ComponentClass<import("./mention").Props, any> & Loadable.LoadableComponent) | (React.StatelessComponent<import("./mention").Props> & Loadable.LoadableComponent);
export declare const nodeToReact: {
    [key: string]: React.ComponentType<any>;
};
export declare const toReact: (node: Node<any>) => React.ComponentClass<any, any> | React.StatelessComponent<any>;
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
export declare const mergeTextNodes: (nodes: (Node<any> | NodeSimple)[]) => (Node<any> | TextWrapper | NodeSimple)[];
export declare const isText: (type: string) => type is "text";
export declare const isTextWrapper: (node: Node<any> | TextWrapper | NodeSimple) => node is TextWrapper;
/**
 * Detects whether a fragment contains a single paragraph node
 * whose content satisfies the condition for an emoji block
 */
export declare const isEmojiDoc: (doc: Fragment<any>, props?: any) => boolean;
export { Blockquote, BodiedExtension, BodiedExtensionProps, BulletList, BlockCard, CodeBlock, Date, DecisionItem, DecisionList, Doc, Emoji, Extension, ExtensionProps, HardBreak, Heading, ListItem, Image, InlineCard, InlineExtension, InlineExtensionProps, LayoutSection, LayoutColumn, Media, MediaGroup, MediaSingle, Mention, OrderedList, Panel, Paragraph, Placeholder, Rule, Status, TaskItem, TaskList, Table, TableCell, TableHeader, TableRow, UnknownBlock, };
