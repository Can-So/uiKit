import { FireAnalyticsEvent } from '@findable/analytics';
import * as PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { EmojiProvider } from '../../api/EmojiResource';
import { EmojiDescription, EmojiId, OnEmojiEvent, OptionalEmojiDescription, OptionalEmojiDescriptionWithVariations, ToneSelection } from '../../types';
import { EmojiContext } from '../common/internal-types';
import { CategoryId } from './categories';
export interface PickerRefHandler {
    (ref: any): any;
}
export interface Props {
    emojiProvider: EmojiProvider;
    onSelection?: OnEmojiEvent;
    onPickerRef?: PickerRefHandler;
    hideToneSelector?: boolean;
    firePrivateAnalyticsEvent?: FireAnalyticsEvent;
}
export interface State {
    filteredEmojis: EmojiDescription[];
    searchEmojis: EmojiDescription[];
    frequentlyUsedEmojis?: EmojiDescription[];
    selectedEmoji?: EmojiDescription;
    activeCategory?: CategoryId;
    disableCategories?: boolean;
    dynamicCategories: CategoryId[];
    selectedTone?: ToneSelection;
    toneEmoji?: OptionalEmojiDescriptionWithVariations;
    query: string;
    uploadErrorMessage?: FormattedMessage.MessageDescriptor;
    uploadSupported: boolean;
    uploading: boolean;
    emojiToDelete?: EmojiDescription;
    loading: boolean;
    showUploadButton: boolean;
}
export default class EmojiPickerComponent extends PureComponent<Props, State> {
    static childContextTypes: {
        emoji: PropTypes.Requireable<any>;
    };
    static defaultProps: {
        onSelection: () => void;
    };
    constructor(props: Props);
    openTime: number;
    getChildContext(): EmojiContext;
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: Props): void;
    componentDidUpdate(prevProps: Props): void;
    onEmojiActive: (_emojiId: EmojiId, emoji?: OptionalEmojiDescription) => void;
    onCategoryActivated: (category: "FREQUENT" | "PEOPLE" | "NATURE" | "FOODS" | "ACTIVITY" | "PLACES" | "OBJECTS" | "SYMBOLS" | "FLAGS" | "ATLASSIAN" | "CUSTOM" | null) => void;
    onCategorySelected: (categoryId: "FREQUENT" | "PEOPLE" | "NATURE" | "FOODS" | "ACTIVITY" | "PLACES" | "OBJECTS" | "SYMBOLS" | "FLAGS" | "ATLASSIAN" | "CUSTOM" | null) => void;
    onFileChosen: () => void;
    onEmojiPickerMouseLeave: () => void;
    onEmojiPickerMouseEnter: () => void;
    private fireAnalytics;
    private calculateElapsedTime;
    private onUploadSupported;
    private onSearch;
    private onSearchResult;
    private onFrequentEmojiResult;
    /**
     * If there is no user search in the EmojiPicker then it should display all emoji received from the EmojiRepository and should
     * also include a special category of most frequently used emoji (if there are any). This method decides if we are in this 'no search'
     * state and appends the frequent emoji if necessary.
     *
     * @param searchEmoji the emoji last received from the EmojiRepository after a search (may be empty)
     * @param frequentEmoji the frequently used emoji last received from the EmojiRepository (may be empty)
     */
    private buildQuerySpecificEmojiList;
    /**
     * Calculate and set the new state of the component in response to the list of emoji changing for some reason (a search has returned
     * or the frequently used emoji have updated.)
     */
    private setStateAfterEmojiChange;
    private onDynamicCategoryChange;
    private onProviderChange;
    private onToneSelected;
    /**
     * Updates the emoji displayed by the picker. If there is no query specified then we expect to retrieve all emoji for display,
     * by category, in the picker. This differs from when there is a query in which case we expect to receive a sorted result matching
     * the search.
     */
    private updateEmojis;
    private onOpenUpload;
    private onUploadEmoji;
    private onTriggerDelete;
    private onCloseDelete;
    private onDeleteEmoji;
    private scrollToEndOfList;
    private onUploadCancelled;
    private getDynamicCategories;
    private handlePickerRef;
    private onSelectWrapper;
    render(): JSX.Element;
}
