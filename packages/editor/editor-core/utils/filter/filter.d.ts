import { Schema, Slice } from 'prosemirror-model';
import { JSONDocNode, JSONNode } from '@atlaskit/editor-json-transformer';
export declare const filterContentByType: (doc: JSONDocNode, types: Set<string>, schema?: Schema<any, any> | undefined, breakBetweenBlocks?: boolean | undefined) => JSONNode[];
export declare const filterSliceByType: (slice: Slice<any>, types: Set<string>, schema: Schema<any, any>, breakBetweenBlocks?: boolean | undefined) => Slice<any>;
