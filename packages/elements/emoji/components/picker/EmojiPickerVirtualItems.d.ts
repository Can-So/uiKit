import { ReactNode } from 'react';
import { Props as CategoryHeadingProps } from './EmojiPickerCategoryHeading';
import { Props as EmojiRowProps } from './EmojiPickerEmojiRow';
import { Props as SearchProps } from './EmojiPickerListSearch';
export interface RenderItem {
    (context?: VirtualRenderContext): ReactNode;
}
export interface VirtualItem<P> {
    height: number;
    props: P;
    renderItem: RenderItem;
}
export declare abstract class AbstractItem<P> implements VirtualItem<P> {
    readonly height: number;
    readonly props: P;
    constructor(props: P, height: number);
    abstract renderItem: RenderItem;
}
export declare class SearchItem extends AbstractItem<SearchProps> {
    constructor(props: SearchProps);
    renderItem: () => JSX.Element;
}
export declare class EmojisRowItem extends AbstractItem<EmojiRowProps> {
    constructor(props: EmojiRowProps);
    renderItem: () => JSX.Element;
}
export declare class LoadingItem extends AbstractItem<{}> {
    constructor();
    renderItem: () => JSX.Element;
}
export declare class CategoryHeadingItem extends AbstractItem<CategoryHeadingProps> {
    constructor(props: CategoryHeadingProps);
    renderItem: () => JSX.Element;
}
/**
 * These are the values provided by react-virtualized.
 */
export interface VirtualRenderContext {
    index: number;
    isScrolling: boolean;
    isVisible: boolean;
    key: any;
    parent: any;
    style: any;
}
export declare const virtualItemRenderer: (rows: VirtualItem<any>[], context: VirtualRenderContext) => JSX.Element;
