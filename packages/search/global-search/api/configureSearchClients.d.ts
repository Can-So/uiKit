import { RecentSearchClient } from './RecentSearchClient';
import { CrossProductSearchClient } from './CrossProductSearchClient';
import { PeopleSearchClient } from './PeopleSearchClient';
import { ConfluenceClient } from './ConfluenceClient';
import { JiraClient } from './JiraClient';
export interface SearchClients {
    recentSearchClient: RecentSearchClient;
    crossProductSearchClient: CrossProductSearchClient;
    peopleSearchClient: PeopleSearchClient;
    confluenceClient: ConfluenceClient;
    jiraClient: JiraClient;
}
export interface Config {
    activityServiceUrl: string;
    searchAggregatorServiceUrl: string;
    directoryServiceUrl: string;
    confluenceUrl: string;
    jiraUrl: string;
    addSessionIdToJiraResult?: boolean;
}
export default function configureSearchClients(cloudId: string, partialConfig: Partial<Config>): SearchClients;
