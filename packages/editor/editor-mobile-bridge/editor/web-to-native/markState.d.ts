import { TextFormattingState } from '@findable/editor-core';
export declare class MarkState {
    name: string;
    active: boolean;
    enabled: boolean;
}
export declare function valueOf(state: TextFormattingState): MarkState[];
