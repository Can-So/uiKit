import { PureComponent } from 'react';
import { PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { EmojiTypeAhead as AkEmojiTypeAhead, EmojiProvider } from '@atlaskit/emoji';
import { AnalyticsEventPayload } from '../../../analytics';
export interface Props {
    editorView?: EditorView;
    pluginKey: PluginKey;
    reversePosition?: boolean;
    popupsBoundariesElement?: HTMLElement;
    popupsMountPoint?: HTMLElement;
    popupsScrollableElement?: HTMLElement;
    emojiProvider: Promise<EmojiProvider>;
    dispatchAnalyticsEvent?: (payload: AnalyticsEventPayload) => void;
}
export interface State {
    query?: string;
    anchorElement?: HTMLElement;
    queryActive?: boolean;
    focused?: boolean;
}
export default class EmojiTypeAhead extends PureComponent<Props, State> {
    private pluginState?;
    private openTime;
    private lastKeyTyped?;
    state: State;
    typeAhead?: AkEmojiTypeAhead | null;
    componentWillMount(): void;
    componentWillUpdate(nextProps: Props): void;
    componentWillUnmount(): void;
    private setPluginState;
    private handlePluginStateChange;
    handleEmojiTypeAheadRef: (ref: AkEmojiTypeAhead | null) => void;
    render(): JSX.Element | null;
    private calculateElapsedTime;
    private handleSelectedEmoji;
    private handleSelectPrevious;
    private handleSelectNext;
    private fireTypeAheadSelectedAnalytics;
    handleSpaceTyped: () => void;
    private handleSpaceSelectCurrent;
    private handleSelectCurrent;
    private getEmojisCount;
    handleOnOpen: () => void;
    handleOnClose: () => void;
}
