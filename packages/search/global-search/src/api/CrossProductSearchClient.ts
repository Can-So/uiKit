import {
  Result,
  PersonResult,
  ResultType,
  AnalyticsType,
  ContentType,
} from '../model/Result';
import { mapJiraItemToResult } from './JiraItemMapper';
import { mapConfluenceItemToResult } from './ConfluenceItemMapper';
import {
  RequestServiceOptions,
  ServiceConfig,
  utils,
} from '@atlaskit/util-service-support';
import { Scope, ConfluenceItem, JiraItem, PersonItem } from './types';

export type CrossProductSearchResults = {
  results: Map<Scope, Result[]>;
  abTest?: ABTest;
};

export type SearchSession = {
  sessionId: string;
  referrerId?: string;
};

export const EMPTY_CROSS_PRODUCT_SEARCH_RESPONSE: CrossProductSearchResults = {
  results: new Map(),
};

export interface CrossProductSearchResponse {
  scopes: ScopeResult[];
}

export interface CrossProductExperimentResponse {
  scopes: Experiment[];
}

export type SearchItem = ConfluenceItem | JiraItem | PersonItem;

export interface ABTest {
  abTestId: string;
  controlId: string;
  experimentId: string;
}

export interface ScopeResult {
  id: Scope;
  error?: string;
  results: SearchItem[];
  abTest?: ABTest; // in case of an error abTest will be undefined
}

export interface Experiment {
  id: Scope;
  error?: string;
  abTest?: ABTest;
}

export interface CrossProductSearchClient {
  search(
    query: string,
    searchSession: SearchSession,
    scopes: Scope[],
    resultLimit?: Number,
  ): Promise<CrossProductSearchResults>;

  getAbTestData(
    scope: Scope,
    searchSession: SearchSession,
  ): Promise<ABTest | undefined>;
}

export default class CrossProductSearchClientImpl
  implements CrossProductSearchClient {
  private serviceConfig: ServiceConfig;
  private cloudId: string;
  private addSessionIdToJiraResult;

  // result limit per scope
  private readonly RESULT_LIMIT = 10;

  constructor(
    url: string,
    cloudId: string,
    addSessionIdToJiraResult?: boolean,
  ) {
    this.serviceConfig = { url: url };
    this.cloudId = cloudId;
    this.addSessionIdToJiraResult = addSessionIdToJiraResult;
  }

  public async search(
    query: string,
    searchSession: SearchSession,
    scopes: Scope[],
    resultLimit?: Number,
  ): Promise<CrossProductSearchResults> {
    const path = 'quicksearch/v1';
    const body = {
      query: query,
      cloudId: this.cloudId,
      limit: resultLimit || this.RESULT_LIMIT,
      scopes: scopes,
      searchSession,
    };

    const response = await this.makeRequest<CrossProductSearchResponse>(
      path,
      body,
    );
    return this.parseResponse(response, searchSession.sessionId);
  }

  public async getAbTestData(
    scope: Scope,
    searchSession: SearchSession,
  ): Promise<ABTest | undefined> {
    const path = 'experiment/v1';
    const body = {
      cloudId: this.cloudId,
      scopes: [scope],
    };

    const response = await this.makeRequest<CrossProductExperimentResponse>(
      path,
      body,
    );

    const scopeWithAbTest: Experiment | undefined = response.scopes.find(
      s => s.id === scope,
    );

    if (scopeWithAbTest) {
      return Promise.resolve(scopeWithAbTest.abTest);
    }

    return Promise.resolve(undefined);
  }

  private async makeRequest<T>(path: string, body: object): Promise<T> {
    const options: RequestServiceOptions = {
      path,
      requestInit: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    };

    return utils.requestService<T>(this.serviceConfig, options);
  }

  /**
   * Converts the raw xpsearch-aggregator response into a CrossProductSearchResults object containing
   * the results set and the experimentId that generated them.
   *
   * @param response
   * @param searchSessionId
   * @returns a CrossProductSearchResults object
   */
  private parseResponse(
    response: CrossProductSearchResponse,
    searchSessionId: string,
  ): CrossProductSearchResults {
    let abTest: ABTest | undefined;
    const results: Map<Scope, Result[]> = response.scopes
      .filter(scope => scope.results)
      .reduce((resultsMap, scopeResult) => {
        resultsMap.set(
          scopeResult.id,
          scopeResult.results.map(result =>
            mapItemToResult(
              scopeResult.id as Scope,
              result,
              searchSessionId,
              scopeResult.abTest && scopeResult.abTest!.experimentId,
              this.addSessionIdToJiraResult,
            ),
          ),
        );

        if (!abTest) {
          abTest = scopeResult.abTest;
        }
        return resultsMap;
      }, new Map());

    return { results, abTest };
  }
}

function mapPersonItemToResult(item: PersonItem): PersonResult {
  const mention = item.nickname || item.name;

  return {
    resultType: ResultType.PersonResult,
    resultId: 'people-' + item.account_id,
    name: item.name,
    href: '/people/' + item.account_id,
    avatarUrl: item.picture,
    contentType: ContentType.Person,
    analyticsType: AnalyticsType.ResultPerson,
    mentionName: mention,
    presenceMessage: item.job_title || '',
  };
}

function mapItemToResult(
  scope: Scope,
  item: SearchItem,
  searchSessionId: string,
  experimentId?: string,
  addSessionIdToJiraResult?: boolean,
): Result {
  if (scope.startsWith('confluence')) {
    return mapConfluenceItemToResult(
      scope,
      item as ConfluenceItem,
      searchSessionId,
      experimentId,
    );
  }
  if (scope.startsWith('jira')) {
    return mapJiraItemToResult(
      item as JiraItem,
      searchSessionId,
      addSessionIdToJiraResult,
    );
  }

  if (scope === Scope.People) {
    return mapPersonItemToResult(item as PersonItem);
  }

  throw new Error(`Non-exhaustive match for scope: ${scope}`);
}
