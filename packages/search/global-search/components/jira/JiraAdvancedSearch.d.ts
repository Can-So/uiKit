import * as React from 'react';
import { CancelableEvent } from '@findable/quick-search';
import { JiraEntityTypes } from '../SearchResultsUtil';
export interface Props {
    query: string;
    showKeyboardLozenge?: boolean;
    showSearchIcon?: boolean;
    analyticsData?: object;
    onClick?: (e: CancelableEvent, entity: JiraEntityTypes) => void;
}
interface State {
    entity: JiraEntityTypes;
}
export default class JiraAdvancedSearch extends React.Component<Props, State> {
    constructor(props: any);
    static defaultProps: {
        showKeyboardLozenge: boolean;
        showSearchIcon: boolean;
    };
    state: {
        entity: JiraEntityTypes;
    };
    renderDropdownItems: () => JSX.Element[];
    selectedItem?: JiraEntityTypes;
    nextSelectedItem?: JiraEntityTypes;
    enrichedAnalyticsData?: object;
    render(): JSX.Element;
}
export {};
