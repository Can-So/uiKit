import {
  PersonResult,
  ResultType,
  AnalyticsType,
  Result,
} from '../model/Result';
import {
  RequestServiceOptions,
  ServiceConfig,
  utils,
} from '@atlaskit/util-service-support';

export interface GraphqlResponse {
  errors?: GraphqlError[];
  data?: {
    AccountCentricUserSearch?: SearchResult[];
    Collaborators?: SearchResult[];
  };
}

export interface SearchResult {
  id: string;
  avatarUrl: string;
  fullName: string;
  department: string;
  title: string;
  nickname: string;
}

export interface GraphqlError {
  category: string;
  message: string;
}

export interface PeopleSearchClient {
  search(query: string): Promise<Result[]>;
  getRecentPeople(): Promise<Result[]>;
}

export default class PeopleSearchClientImpl implements PeopleSearchClient {
  private serviceConfig: ServiceConfig;
  private cloudId: string;

  private readonly RESULT_LIMIT = 5;

  constructor(url: string, cloudId: string) {
    this.serviceConfig = { url: url };
    this.cloudId = cloudId;
  }

  private buildRecentQuery() {
    return {
      query: `query Collaborators(
          $cloudId: String!,
          $limit: Int) {
          Collaborators(cloudId: $cloudId, limit: $limit) {
            id,
            fullName,
            avatarUrl,
            title,
            nickname,
            department
          }
        }`,
      variables: {
        cloudId: this.cloudId,
        limit: 3,
        excludeBots: true,
        excludeInactive: true,
      },
    };
  }

  private buildSearchQuery(query: string) {
    return {
      query: `query Search(
        $cloudId: String!,
        $displayName: String!,
        $first: Int!,
        $offset: Int,
        $excludeInactive: Boolean,
        $excludeBots: Boolean
      ) {
        AccountCentricUserSearch (displayName: $displayName, cloudId: $cloudId, first: $first, offset: $offset,
        filter: { excludeInactive: $excludeInactive, excludeBots: $excludeBots }) {
          id,
          fullName,
          avatarUrl,
          title,
          nickname,
          department
        }
      }`,
      variables: {
        cloudId: this.cloudId,
        displayName: query,
        first: this.RESULT_LIMIT,
        offset: 1,
        excludeInactive: true,
        excludeBots: true,
      },
    };
  }

  private buildRequestOptions(body: object): RequestServiceOptions {
    return {
      path: 'graphql',
      requestInit: {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(body),
      },
    };
  }

  public async getRecentPeople(): Promise<Result[]> {
    const options = this.buildRequestOptions(this.buildRecentQuery());

    const response = await utils.requestService<GraphqlResponse>(
      this.serviceConfig,
      options,
    );

    if (response.errors) {
      // TODO should probably catch and log this
      return [];
    }

    if (!response.data || !response.data.Collaborators) {
      return [];
    }

    return response.data.Collaborators.map(userSearchResultToResult);
  }

  public async search(query: string): Promise<Result[]> {
    const options = this.buildRequestOptions(this.buildSearchQuery(query));

    const response = await utils.requestService<GraphqlResponse>(
      this.serviceConfig,
      options,
    );

    if (response.errors) {
      throw new Error(makeGraphqlErrorMessage(response.errors));
    }

    if (!response.data || !response.data.AccountCentricUserSearch) {
      throw new Error('PeopleSearchClient: Response data missing');
    }

    return response.data.AccountCentricUserSearch.map(userSearchResultToResult);
  }
}

function makeGraphqlErrorMessage(errors: GraphqlError[]) {
  const firstError = errors[0];
  return `${firstError.category}: ${firstError.message}`;
}

function userSearchResultToResult(searchResult: SearchResult): PersonResult {
  const mention = searchResult.nickname || searchResult.fullName;

  return {
    resultType: ResultType.PersonResult,
    resultId: 'people-' + searchResult.id,
    name: searchResult.fullName,
    href: '/people/' + searchResult.id,
    avatarUrl: searchResult.avatarUrl,
    analyticsType: AnalyticsType.ResultPerson,
    mentionName: mention,
    presenceMessage: searchResult.title,
  };
}
