import * as React from 'react';
import { Result } from '../../model/Result';
export declare const MAX_PAGES_BLOGS_ATTACHMENTS = 8;
export declare const MAX_SPACES = 3;
export declare const MAX_PEOPLE = 3;
export interface Props {
    query: string;
    recentResults: Result[];
    jiraResults: Result[];
    confluenceResults: Result[];
    peopleResults: Result[];
}
export default class SearchResultsState extends React.Component<Props> {
    render(): (JSX.Element | null)[];
}
