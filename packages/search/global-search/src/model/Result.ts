export enum ResultType {
  JiraObjectResult,
  GenericContainerResult,
  PersonResult,
  ConfluenceObjectResult,
}

export interface Result {
  resultId: string;
  // main text to show
  name: string;
  // url to link the result to
  href: string;
  // url to display the avatar from
  avatarUrl?: string;
  // the analytics type to send in the analytics attributes
  analyticsType: AnalyticsType;
  // field to disambiguate between result types
  resultType: ResultType;
}

export interface ConfluenceObjectResult extends Result {
  containerName: string;
  contentType?: ContentType;
  resultType: ResultType.ConfluenceObjectResult;
}

export interface JiraObjectResult extends Result {
  objectKey: string;
  containerName: string;
  resultType: ResultType.JiraObjectResult;
}

export interface ContainerResult extends Result {
  resultType: ResultType.GenericContainerResult;
}

export interface PersonResult extends Result {
  mentionName: string;
  // the message to display underneath the name, unfortuntately named this way ATM.
  presenceMessage: string;
  resultType: ResultType.PersonResult;
}

/**
 * An enum to identify the specific type of content each search result is displaying.
 * It is used to select the appropriate icon to display.
 */
export enum ContentType {
  ConfluencePage = 'confluence-page',
  ConfluenceBlogpost = 'confluence-blogpost',
  ConfluenceAttachment = 'confluence-attachment',
}

export enum AnalyticsType {
  RecentJira = 'recent-jira',
  RecentConfluence = 'recent-confluence',
  ResultJira = 'result-jira',
  ResultConfluence = 'result-confluence',
  ResultPerson = 'result-person',
  AdvancedSearchJira = 'advanced-search-jira',
  AdvancedSearchConfluence = 'advanced-search-confluence',
  AdvancedSearchPeople = 'advanced-search-people',
}
