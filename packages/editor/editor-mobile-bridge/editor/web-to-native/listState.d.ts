import { ListsState } from '@atlaskit/editor-core';
export declare class ListState {
    name: string;
    active: boolean;
    enabled: boolean;
}
export declare function valueOf(state: ListsState): ListState[];
