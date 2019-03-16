export declare const ADVANCED_CONFLUENCE_SEARCH_RESULT_ID = "search_confluence";
export declare const ADVANCED_JIRA_SEARCH_RESULT_ID = "search_jira";
export declare const ADVANCED_PEOPLE_SEARCH_RESULT_ID = "search_people";
export declare enum JiraEntityTypes {
    Projects = "projects",
    Issues = "issues",
    Boards = "boards",
    Filters = "filters",
    People = "people"
}
export declare enum ConfluenceAdvancedSearchTypes {
    Content = "content",
    People = "people"
}
export declare const isAdvancedSearchResult: (resultId: string) => boolean;
export declare function getConfluenceAdvancedSearchLink(query?: string): string;
export declare function getJiraAdvancedSearchUrl(entityType: JiraEntityTypes, query?: string): string;
export declare function redirectToConfluenceAdvancedSearch(query?: string): void;
export declare function redirectToJiraAdvancedSearch(entityType: JiraEntityTypes, query?: string): void;
export declare function take<T>(array: Array<T>, n: number): T[];
export declare function isEmpty<T>(array: Array<T>): boolean;
export declare function objectValues(object: any): any[];
/**
 *
 * Gracefully handle promise catch and returning default value
 * @param promise promise to handle its catch block
 * @param defaultValue value returned by the promise in case of error
 * @param errorHandler function to be called in case of promise rejection
 */
export declare function handlePromiseError<T>(promise: Promise<T>, defaultValue: T, errorHandler?: ((reason: any) => T | void)): Promise<T>;
