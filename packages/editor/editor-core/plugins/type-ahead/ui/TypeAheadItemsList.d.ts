/// <reference types="react" />
import { TypeAheadItem } from '../types';
export declare type TypeAheadItemsListProps = {
    items?: Array<TypeAheadItem>;
    currentIndex: number;
    insertByIndex: (index: number) => void;
    setCurrentIndex: (index: number) => void;
};
export declare function scrollIntoViewIfNeeded(element: HTMLElement): void;
export declare function TypeAheadItemsList({ items, currentIndex, insertByIndex, setCurrentIndex, }: TypeAheadItemsListProps): JSX.Element | null;
