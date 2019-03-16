import * as React from 'react';
import { MentionProvider } from '../../api/MentionResource';
import { PresenceProvider } from '../../api/PresenceResource';
import { MentionDescription, OnMentionEvent } from '../../types';
export interface Props {
    resourceProvider: MentionProvider;
    presenceProvider?: PresenceProvider;
    query?: string;
    onSelection?: OnMentionEvent;
    resourceError?: Error;
}
export interface State {
    resourceError?: Error;
    mentions: MentionDescription[];
}
export default class ResourcedMentionList extends React.PureComponent<Props, State> {
    private subscriberKey;
    private mentionListRef?;
    constructor(props: Props);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: Props): void;
    componentWillUnmount(): void;
    selectNext: () => void;
    selectPrevious: () => void;
    selectIndex: (index: number, callback?: (() => any) | undefined) => void;
    selectId: (id: string, callback?: (() => any) | undefined) => void;
    chooseCurrentSelection: () => void;
    mentionsCount: () => number;
    private subscribeMentionProvider;
    private subscribePresenceProvider;
    private unsubscribeMentionProvider;
    private unsubscribePresenceProvider;
    private applyPropChanges;
    private refreshPresences;
    private filterChange;
    private filterError;
    private presenceUpdate;
    private notifySelection;
    private handleMentionListRef;
    render(): JSX.Element;
}
