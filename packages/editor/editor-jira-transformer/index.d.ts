import { Node as PMNode, Schema } from 'prosemirror-model';
import { Transformer } from '@atlaskit/editor-common';
export declare type CustomEncoder = (userId: string) => string;
export interface JIRACustomEncoders {
    mention?: CustomEncoder;
}
export interface ContextInfo {
    clientId: string;
    baseUrl: string;
    token: string;
    collection: string;
}
export interface MediaContextInfo {
    viewContext?: ContextInfo;
    uploadContext?: ContextInfo;
}
export declare class JIRATransformer implements Transformer<string> {
    private schema;
    private customEncoders;
    private mediaContextInfo?;
    private doc;
    constructor(schema: Schema, customEncoders?: JIRACustomEncoders, mediaContextInfo?: MediaContextInfo);
    encode(node: PMNode): string;
    parse(html: string): PMNode;
    private getContent;
    private encodeNode;
    private makeDocument;
    private encodeFragment;
    private encodeHeading;
    private encodeParagraph;
    private encodeText;
    private encodeHardBreak;
    private encodeHorizontalRule;
    private encodeBulletList;
    private encodeOrderedList;
    private encodeListItem;
    private encodeMention;
    private encodeEmoji;
    private encodeCodeBlock;
    private encodeBlockQuote;
    private encodeMediaGroup;
    private encodeMediaSingle;
    private addDataToNode;
    private buildURLWithContextInfo;
    private isImageMimeType;
    private encodeMedia;
    private encodeTable;
}
