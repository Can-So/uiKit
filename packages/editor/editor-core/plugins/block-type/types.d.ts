import { MessageDescriptor } from '../../types';
export declare const messages: {
    blockquote: MessageDescriptor;
    other: MessageDescriptor;
    normal: MessageDescriptor;
    heading1: MessageDescriptor;
    heading2: MessageDescriptor;
    heading3: MessageDescriptor;
    heading4: MessageDescriptor;
    heading5: MessageDescriptor;
    heading6: MessageDescriptor;
    codeblock: MessageDescriptor;
    panel: MessageDescriptor;
    notePanel: MessageDescriptor;
    successPanel: MessageDescriptor;
    warningPanel: MessageDescriptor;
    errorPanel: MessageDescriptor;
};
export declare const NORMAL_TEXT: BlockType;
export declare const HEADING_1: BlockType;
export declare const HEADING_2: BlockType;
export declare const HEADING_3: BlockType;
export declare const HEADING_4: BlockType;
export declare const HEADING_5: BlockType;
export declare const HEADING_6: BlockType;
export declare const BLOCK_QUOTE: BlockType;
export declare const CODE_BLOCK: BlockType;
export declare const PANEL: BlockType;
export declare const OTHER: BlockType;
export declare const TEXT_BLOCK_TYPES: BlockType[];
export declare const WRAPPER_BLOCK_TYPES: BlockType[];
export declare const ALL_BLOCK_TYPES: BlockType[];
export declare const HEADINGS_BY_LEVEL: Record<number, BlockType>;
export declare const HEADINGS_BY_NAME: {
    [blockType: string]: BlockType;
};
export declare type BlockTypeName = 'normal' | 'heading1' | 'heading2' | 'heading3' | 'heading4' | 'heading5' | 'heading6' | 'blockquote' | 'codeblock' | 'panel' | 'notePanel' | 'successPanel' | 'warningPanel' | 'errorPanel' | 'other';
export interface BlockType {
    name: string;
    title: MessageDescriptor;
    nodeName: string;
    tagName?: string;
    level?: number;
}
export declare type HeadingLevels = 0 | 1 | 2 | 3 | 4 | 5 | 6;
