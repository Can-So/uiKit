import { Result } from '../model/Result';
export interface RecentItemsResponse {
    data: RecentItem[];
}
export interface RecentItem {
    objectId: string;
    name: string;
    iconUrl: string;
    container: string;
    url: string;
    provider: string;
}
export interface RecentSearchClient {
    getRecentItems(): Promise<Result[]>;
    search(query: string): Promise<Result[]>;
}
export default class RecentSearchClientImpl implements RecentSearchClient {
    private serviceConfig;
    private cloudId;
    private getRecentRequestPromise;
    constructor(url: string, cloudId: string);
    getRecentItems(): Promise<Result[]>;
    search(query: string): Promise<Result[]>;
    private filterItems;
    private fetchRecentItems;
}
/**
 * Splits the title of a recent jira item into issue key and title.
 *
 * E.g. "HOME-123 Fix HOT issue" becomes "HOME-123" and "Fix HOT issue".
 *
 * We can use a simplified issue key regex here because we know that the issue will be
 * located at the very beginning of the string (due to the way the /recent API works).
 *
 */
export declare function splitIssueKeyAndName(name: string): {
    name: string;
    objectKey: string | undefined;
};
