import { Result, ResultType, ResultContentType } from '../model/Result';
import {
  RequestServiceOptions,
  utils,
  ServiceConfig,
} from '@atlaskit/util-service-support';

const RECENT_ITEMS_PATH: string = '/wiki/rest/recentlyviewed/1.0/recent';
const RECENT_SPACE_PATH: string = '/wiki/rest/recentlyviewed/1.0/recent/spaces';

export interface ConfluenceClient {
  getRecentItems(): Promise<Result[]>;
  getRecentSpaces(): Promise<Result[]>;
}

export interface RecentPage {
  available: boolean;
  contentType: ResultContentType;
  id: string;
  lastSeen: number;
  space: string;
  spaceKey: string;
  title: string;
  type: string;
  url: string;
}

export interface RecentSpace {
  id: string;
  key: string;
  icon: string;
  name: string;
}

export default class ConfluenceClientImpl implements ConfluenceClient {
  private serviceConfig: ServiceConfig;
  private cloudId: string;

  constructor(url: string, cloudId: string) {
    this.serviceConfig = { url: url };
    this.cloudId = cloudId;
  }

  public async getRecentItems(): Promise<Result[]> {
    const recentPages = await this.createRecentRequestPromise<RecentPage>(
      RECENT_ITEMS_PATH,
    );
    return recentPages.map(recentItemToResult);
  }

  public async getRecentSpaces(): Promise<Result[]> {
    const recentSpaces = await this.createRecentRequestPromise<RecentSpace>(
      RECENT_SPACE_PATH,
    );
    return recentSpaces.map(recentSpaceToResult);
  }

  private createRecentRequestPromise<T>(path: string): Promise<Array<T>> {
    const options: RequestServiceOptions = {
      path: path,
      queryParams: {
        cloudId: this.cloudId,
        limit: 10,
      },
    };

    return utils.requestService(this.serviceConfig, options);
  }
}

function recentItemToResult(recentPage: RecentPage): Result {
  return {
    resultId: recentPage.id,
    type: ResultType.Object,
    name: recentPage.title,
    href: recentPage.url,
    avatarUrl: '',
    containerName: recentPage.space,
    contentType: recentPage.contentType,
  };
}

function recentSpaceToResult(recentSpace: RecentSpace): Result {
  return {
    resultId: recentSpace.id,
    type: ResultType.Container,
    name: recentSpace.name,
    href: `/wiki/${recentSpace.key}/overview`,
    avatarUrl: recentSpace.icon,
  };
}
