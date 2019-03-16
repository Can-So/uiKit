import * as React from 'react';
import { CancelableEvent } from '@atlaskit/quick-search';
import { JiraEntityTypes } from '../SearchResultsUtil';
export interface Props {
    query: string;
    onAdvancedSearch?: (e: CancelableEvent, entity: JiraEntityTypes) => void;
}
export default class NoResultsState extends React.Component<Props> {
    render(): JSX.Element;
}
