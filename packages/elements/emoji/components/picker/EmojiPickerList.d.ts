import * as PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { EmojiDescription, OnCategory, OnEmojiEvent, ToneSelection, User } from '../../types';
import { EmojiContext } from '../common/internal-types';
import { CategoryId } from './categories';
export interface OnSearch {
    (query: string): void;
}
export interface Props {
    emojis: EmojiDescription[];
    currentUser?: User;
    onEmojiSelected?: OnEmojiEvent;
    onEmojiActive?: OnEmojiEvent;
    onEmojiDelete?: OnEmojiEvent;
    onCategoryActivated?: OnCategory;
    onMouseLeave?: () => void;
    onMouseEnter?: () => void;
    selectedTone?: ToneSelection;
    onSearch?: OnSearch;
    loading?: boolean;
    query?: string;
}
export interface State {
}
export default class EmojiPickerVirtualList extends PureComponent<Props, State> {
    static contextTypes: {
        emoji: PropTypes.Requireable<any>;
    };
    static childContextTypes: {
        emoji: PropTypes.Requireable<any>;
    };
    static defaultProps: {
        onEmojiSelected: () => void;
        onEmojiActive: () => void;
        onEmojiDelete: () => void;
        onCategoryActivated: () => void;
        onSearch: () => void;
    };
    private allEmojiGroups;
    private activeCategoryId;
    private virtualItems;
    private categoryTracker;
    context: EmojiContext;
    constructor(props: Props);
    getChildContext(): EmojiContext;
    componentWillUpdate(nextProps: Props, nextState: State): void;
    private onEmojiMouseEnter;
    private onSearch;
    /**
     * Scrolls to a category in the list view
     */
    reveal(category: CategoryId): void;
    scrollToBottom(): void;
    private buildVirtualItemFromGroup;
    private buildVirtualItems;
    private addToCategoryMap;
    private groupByCategory;
    private buildEmojiGroupedByCategory;
    private repaintList;
    /**
     * Checks if list is showing a new CategoryId
     * to inform selector to change active category
     */
    private checkCategoryIdChange;
    private rowSize;
    private renderRow;
    render(): JSX.Element;
}
