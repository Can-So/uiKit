import * as React from 'react';
import { MentionDescription, OnMentionEvent } from '../../types';
import MentionItem from '../MentionItem';
export interface Props {
    mentions: MentionDescription[];
    resourceError?: Error;
    onSelection?: OnMentionEvent;
}
export interface State {
    selectedKey?: string;
    selectedIndex: number;
}
export interface Items {
    [index: string]: MentionItem;
}
export default class MentionList extends React.PureComponent<Props, State> {
    private lastMousePosition;
    private scrollable?;
    private items;
    constructor(props: Props);
    componentWillReceiveProps(nextProps: Props): void;
    componentDidUpdate(): void;
    selectNext: () => void;
    selectPrevious: () => void;
    selectIndex: (index: number, callback?: (() => any) | undefined) => void;
    selectId: (id: string, callback?: (() => any) | undefined) => void;
    chooseCurrentSelection: () => void;
    mentionsCount: () => number;
    private revealItem;
    /**
     * The default selection state is to chose index 0 and not have any particular key selected
     */
    private setDefaultSelectionState;
    private selectIndexOnHover;
    private itemSelected;
    private renderItems;
    private isSelectedMention;
    private handleScrollableRef;
    render(): JSX.Element;
}
