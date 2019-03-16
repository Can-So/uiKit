import * as React from 'react';
import { CancelableEvent } from '@findable/quick-search';
import configureSearchClients from '../api/configureSearchClients';
export declare type LinkComponent = React.ComponentType<{
    className: string;
    children: React.ReactNode;
    href?: string;
    target?: string;
}>;
export declare type Logger = {
    safeInfo(message?: any, ...optionalParams: any[]): void;
    safeWarn(message?: any, ...optionalParams: any[]): void;
    safeError(message?: any, ...optionalParams: any[]): void;
};
export declare type ReferralContextIdentifiers = {
    searchReferrerId: string;
    currentContentId: string;
};
export declare type AdvancedSearchEvent = {
    /**
     * prevent navigation to advanced search page
     */
    preventDefault: () => void;
    /**
     * query entered by user
     */
    query: string;
    /**
     * if it is jira it can be one of the following ['issues', 'boards', 'projects', 'filters', 'people']
     * if it is confluence it can be one of the following ['content', 'people']
     */
    category: string;
    /**
     * orignial event, this is useful when need to check if the click was to open in new tab or in same tab
     * but if consumer wanna cancel the event {@link preventDefault} should be used
     */
    originalEvent: object;
    /**
     * searchSessionId from the quick search session, it should be used for the advanced search session
     */
    searchSessionId: string;
};
export interface Props {
    /**
     * The cloudId of the site the component is embedded in.
     */
    cloudId: string;
    /**
     * The context for quick-search determines the UX and what kind of entities the component is searching.
     */
    context: 'confluence' | 'home' | 'jira';
    /**
     * For development purposes only: Overrides the URL to the activity service.
     */
    activityServiceUrl?: string;
    /**
     * For development purposes only: Overrides the URL to the search aggregator service.
     */
    searchAggregatorServiceUrl?: string;
    /**
     * For development purposes only: Overrides the URL to the directory service.
     */
    directoryServiceUrl?: string;
    /**
     * The URL for Confluence. Must include the context path.
     */
    confluenceUrl?: string;
    /**
     * The URL for Jira. Must include the context path.
     */
    jiraUrl?: string;
    /**
     * React component to be used for rendering links. It receives a className prop that needs to be applied for
     * proper styling, a children prop that needs to be rendered, and optional href/target props that should be
     * respected.
     */
    linkComponent?: LinkComponent;
    /**
     * An object containing referral IDs, i.e. the searchReferrerId and currentContentId.
     */
    referralContextIdentifiers?: ReferralContextIdentifiers;
    /**
     * Indicates if search terms should be send in analytic events when a search is performed.
     */
    isSendSearchTermsEnabled?: boolean;
    /**
     * Indicates whether or not quick nav should be used for people searches.
     */
    useQuickNavForPeopleResults?: boolean;
    /**
     * Indicates whether or not CPUS should be used for people searches.
     */
    useCPUSForPeopleResults?: boolean;
    /**
     * Indicates whether to add sessionId to jira result query param
     */
    addSessionIdToJiraResult?: boolean;
    /**
     * Indicates whether to disable Jira people search on the pre-query screen
     */
    disableJiraPreQueryPeopleSearch?: boolean;
    /**
     * logger with 3 levels error, warn and info
     */
    logger?: Logger;
    /**
     * call back, to be called when advanced search is clicked
     */
    onAdvancedSearch?: (e: AdvancedSearchEvent) => void;
}
/**
 * Component that exposes the public API for global quick search. Its only purpose is to offer a simple, user-friendly API to the outside and hide the implementation detail of search clients etc.
 */
export default class GlobalQuickSearchWrapper extends React.Component<Props> {
    static defaultProps: {
        logger: Logger;
    };
    memoizedConfigureSearchClients: typeof configureSearchClients;
    private makeConfig;
    private getContainerComponent;
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    onAdvancedSearch: (e: CancelableEvent, entity: string, query: string, searchSessionId: string) => void;
    render(): JSX.Element;
}
