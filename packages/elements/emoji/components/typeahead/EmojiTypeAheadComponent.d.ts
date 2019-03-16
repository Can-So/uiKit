import * as PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { EmojiProvider } from '../../api/EmojiResource';
import { EmojiDescription, OnEmojiEvent, ToneSelection } from '../../types';
import { EmojiContext } from '../common/internal-types';
export interface OnLifecycle {
    (): void;
}
export interface EmojiTypeAheadBaseProps {
    onSelection?: OnEmojiEvent;
    query?: string;
    listLimit?: number;
    onOpen?: OnLifecycle;
    onClose?: OnLifecycle;
}
export interface Props extends EmojiTypeAheadBaseProps {
    emojiProvider: EmojiProvider;
}
export interface State {
    visible: boolean;
    emojis: EmojiDescription[];
    loading: boolean;
    selectedTone?: ToneSelection;
}
export default class EmojiTypeAheadComponent extends PureComponent<Props, State> {
    static childContextTypes: {
        emoji: PropTypes.Requireable<any>;
    };
    static defaultProps: {
        onSelection: () => void;
        onOpen: () => void;
        onClose: () => void;
        listLimit: number;
    };
    private emojiListRef;
    constructor(props: Props);
    getChildContext(): EmojiContext;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentWillReceiveProps(nextProps: Props): void;
    selectNext: () => void;
    selectPrevious: () => void;
    chooseCurrentSelection: () => void;
    count: () => number;
    private onSearch;
    private onSearchResult;
    private onProviderChange;
    private onEmojiListRef;
    render(): JSX.Element;
}
