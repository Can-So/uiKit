import { Schema, Slice } from 'prosemirror-model';
import { JSONDocNode, JSONNode } from '../';
export declare function taskDecisionDocFilter(doc: JSONDocNode, schema?: Schema): JSONNode[];
export declare function taskDecisionSliceFilter(schema: Schema): (slice: Slice) => Slice;
