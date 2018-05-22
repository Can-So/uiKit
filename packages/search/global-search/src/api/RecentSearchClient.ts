import { Result, ResultType, AnalyticsType } from '../model/Result';
import {
  RequestServiceOptions,
  ServiceConfig,
  utils,
} from '@atlaskit/util-service-support';

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
  private serviceConfig: ServiceConfig;
  private cloudId: string;
  private getRecentRequestPromise: Promise<RecentItemsResponse>;

  constructor(url: string, cloudId: string) {
    this.serviceConfig = { url: url };
    this.cloudId = cloudId;
  }

  public async getRecentItems(): Promise<Result[]> {
    const recentItems = await this.fetchRecentItems();
    return recentItems.map(recentItemToResult);
  }

  public async search(query: string): Promise<Result[]> {
    const recentItems = await this.fetchRecentItems();
    const filteredRecentItems = this.filterItems(recentItems, query);

    return filteredRecentItems.map(recentItemToResult);
  }

  private filterItems(items: RecentItem[], query: string): RecentItem[] {
    if (query.length === 0) {
      return [];
    }

    query = query.toLowerCase();
    return items.filter(item => {
      return item.name.toLowerCase().indexOf(query) > -1;
    });
  }

  private async fetchRecentItems(): Promise<RecentItem[]> {
    if (!this.getRecentRequestPromise) {
      const options: RequestServiceOptions = {
        path: 'api/client/recent',
        queryParams: {
          cloudId: this.cloudId,
        },
      };

      this.getRecentRequestPromise = utils.requestService(
        this.serviceConfig,
        options,
      );
    }

    const response = await this.getRecentRequestPromise;
    return response.data;
  }
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
export function splitIssueKeyAndName(name: string) {
  const issueKeyMatcher = /^[A-Z]{1,10}-\d+/;
  const matches = name.match(issueKeyMatcher);

  let objectKey: string | undefined;
  let nameWithoutIssueKey = name;

  if (matches !== null && matches.length > 0) {
    objectKey = matches[0];
    nameWithoutIssueKey = name.substring(objectKey.length).trim();
  }

  return {
    name: nameWithoutIssueKey,
    objectKey: objectKey,
  };
}

function maybeSplitIssueKeyAndName(recentItem: RecentItem) {
  if (recentItem.provider === 'jira') {
    return splitIssueKeyAndName(recentItem.name);
  } else {
    return {
      name: recentItem.name,
      objectKey: undefined,
    };
  }
}

function recentItemToResult(recentItem: RecentItem): Result {
  const { name, objectKey } = maybeSplitIssueKeyAndName(recentItem);

  return {
    resultType: ResultType.Object,
    resultId: 'recent-' + recentItem.objectId,
    avatarUrl: recentItem.iconUrl,
    name: name,
    href: recentItem.url,
    containerName: recentItem.container,
    objectKey: objectKey,
    analyticsType:
      recentItem.provider === 'jira'
        ? AnalyticsType.RecentJira
        : AnalyticsType.RecentConfluence,
  };
}
