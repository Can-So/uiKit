import { Node as PMNode, Schema, Slice } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { MediaState } from '../types';
import { Selection } from 'prosemirror-state';
export interface MediaSingleState extends MediaState {
    dimensions: {
        width: number;
        height: number;
    };
    scaleFactor?: number;
}
export declare const insertMediaAsMediaSingle: (view: EditorView<any>, node: PMNode<any>) => boolean;
export declare const insertMediaSingleNode: (view: EditorView<any>, mediaState: MediaState, collection?: string | undefined) => boolean;
export declare const createMediaSingleNode: (schema: Schema<any, any>, collection: string) => (mediaState: MediaSingleState) => PMNode<Schema<any, any>>;
export declare function transformSliceForMedia(slice: Slice, schema: Schema): (selection: Selection<any>) => Slice<any>;
