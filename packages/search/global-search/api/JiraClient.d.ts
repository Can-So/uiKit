import { JiraResult } from '../model/Result';
export declare type RecentItemsCounts = {
    issues?: number;
    boards?: number;
    filters?: number;
    projects?: number;
};
export declare const DEFAULT_RECENT_ITEMS_COUNT: RecentItemsCounts;
/**
 * Jira client to reterive recent items from jira
 */
export interface JiraClient {
    /**
     * @param searchSessionId string unique for every session id
     * @param recentItemCounts optional number of items to return for every recent
     * @returns a promise which resolves to recent items throws
     */
    getRecentItems(searchSessionId: string, recentItemCounts?: RecentItemsCounts): Promise<JiraResult[]>;
    canSearchUsers(): Promise<boolean>;
}
export default class JiraClientImpl implements JiraClient {
    private serviceConfig;
    private cloudId;
    private addSessionIdToJiraResult;
    private canSearchUsersCache;
    constructor(url: string, cloudId: string, addSessionIdToJiraResult?: boolean);
    getCloudId(): string;
    /**
     *
     * @param searchSessionId unique id for each session
     * @param recentItemCounts number of items to return for every recent item type defaults to {@link #defaultRecentItemCounts}
     * @returns a promise resolved to recent items array throws if any error occurs in reqeust or if parsing or transforming response fails
     */
    getRecentItems(searchSessionId: string, recentItemCounts?: RecentItemsCounts): Promise<JiraResult[]>;
    canSearchUsers(): Promise<boolean>;
    private recentItemGroupToItems;
    private recentItemToResultItem;
    private getContainerId;
    private getTypeSpecificAttributes;
    /**
     * Private method to construct a valid value for the 'counts' query param
     * for the Jira recent API. The format is as follows:
     *
     * ?counts=issues=8,boards=2,projects=2,filters=2
     *
     * @param recentCounts
     */
    private getRecentCountQueryParam;
}
