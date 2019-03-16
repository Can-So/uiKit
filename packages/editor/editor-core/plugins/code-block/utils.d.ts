import { Slice, Schema } from 'prosemirror-model';
export declare function transformSliceToJoinAdjacentCodeBlocks(slice: Slice): Slice;
export declare const transformSingleLineCodeBlockToCodeMark: (slice: Slice<any>, schema: Schema<any, any>) => Slice<any>;
