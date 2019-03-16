import { ABTest } from '../api/CrossProductSearchClient';
import { FormattedMessage } from 'react-intl';
export declare enum ResultType {
    JiraObjectResult = "jira-object-result",
    JiraProjectResult = "jira-project-result",
    GenericContainerResult = "generic-container-result",
    PersonResult = "person-result",
    ConfluenceObjectResult = "confluence-object-result"
}
export declare enum JiraProjectType {
    Software = "software",
    ServiceDesk = "service_desk",
    Business = "business",
    Ops = "ops"
}
export interface Result {
    resultId: string;
    name: string;
    href: string;
    avatarUrl?: string;
    analyticsType: AnalyticsType;
    resultType: ResultType;
    containerId?: string;
    experimentId?: string;
    contentType: ContentType;
    key?: string;
}
/**
 * Map of String keys and Array of results value, but can be empty as well
 */
export interface GenericResultMap<T = Result> {
    [key: string]: T[];
}
export declare type ResultsWithTiming = {
    results: GenericResultMap;
    timings?: {
        [key: string]: number | string;
    };
    abTest?: ABTest;
};
export interface ConfluenceResultsMap extends GenericResultMap {
    people: Result[];
    objects: Result[];
    spaces: Result[];
}
export interface JiraResultsMap extends GenericResultMap {
    issues: Result[];
    boards: Result[];
    projects: Result[];
    filters: Result[];
}
export interface ConfluenceObjectResult extends Result {
    containerName: string;
    containerId: string;
    contentType: ContentType;
    resultType: ResultType.ConfluenceObjectResult;
    iconClass?: string;
}
export declare type ResultsGroup = {
    items: Result[];
    key: string;
    title: FormattedMessage.MessageDescriptor;
};
export interface JiraResult extends Result {
    objectKey?: string;
    containerName?: string;
    projectType?: JiraProjectType;
    resultType: ResultType.JiraObjectResult | ResultType.JiraProjectResult;
    contentType: ContentType;
}
export interface ContainerResult extends Result {
    resultType: ResultType.GenericContainerResult;
    contentType: ContentType.ConfluenceSpace;
}
export interface PersonResult extends Result {
    mentionName: string;
    presenceMessage: string;
    resultType: ResultType.PersonResult;
}
export declare enum ContentType {
    ConfluencePage = "confluence-page",
    ConfluenceBlogpost = "confluence-blogpost",
    ConfluenceAttachment = "confluence-attachment",
    ConfluenceSpace = "confluence-space",
    JiraIssue = "jira-issue",
    JiraBoard = "jira-board",
    JiraFilter = "jira-filter",
    JiraProject = "jira-project",
    Person = "person"
}
export declare enum AnalyticsType {
    RecentJira = "recent-jira",
    ResultJira = "result-jira",
    RecentConfluence = "recent-confluence",
    ResultConfluence = "result-confluence",
    RecentPerson = "recent-person",
    ResultPerson = "result-person",
    AdvancedSearchConfluence = "advanced-search-confluence",
    AdvancedSearchJira = "advanced-search-jira",
    TopLinkPreQueryAdvancedSearchJira = "top-link-prequery-advanced-search-jira",
    AdvancedSearchPeople = "advanced-search-people"
}
