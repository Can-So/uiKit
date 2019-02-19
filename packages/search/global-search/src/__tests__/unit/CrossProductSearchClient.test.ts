import CrossProductSearchClient, {
  CrossProductSearchResponse,
  SearchSession,
  ScopeResult,
  ABTest,
  CrossProductExperimentResponse,
} from '../../api/CrossProductSearchClient';
import { Scope, ConfluenceItem, PersonItem } from '../../api/types';
import 'whatwg-fetch';
import * as fetchMock from 'fetch-mock';
import {
  AnalyticsType,
  ConfluenceObjectResult,
  ResultType,
  ContentType,
  ContainerResult,
  JiraResult,
  PersonResult,
} from '../../model/Result';
import {
  generateRandomJiraBoard,
  generateRandomJiraFilter,
  generateRandomJiraProject,
} from '../../../example-helpers/mockJira';

const DEFAULT_XPSEARCH_OPTS = {
  method: 'post',
  name: 'xpsearch',
};

function apiWillReturn(state: CrossProductSearchResponse) {
  fetchMock.mock('localhost/quicksearch/v1', state, DEFAULT_XPSEARCH_OPTS);
}

function experimentApiWillReturn(state: CrossProductExperimentResponse) {
  fetchMock.mock('localhost/experiment/v1', state, DEFAULT_XPSEARCH_OPTS);
}

const abTest: ABTest = {
  abTestId: 'abTestId',
  controlId: 'controlId',
  experimentId: 'experimentId',
};

const searchSession: SearchSession = {
  referrerId: 'referal-id',
  sessionId: 'test_uuid',
};

describe('CrossProductSearchClient', () => {
  let searchClient: CrossProductSearchClient;

  beforeEach(() => {
    searchClient = new CrossProductSearchClient('localhost', '123');
  });

  afterEach(fetchMock.restore);

  describe('Confluence', () => {
    it('should return confluence pages', async () => {
      apiWillReturn({
        scopes: [
          {
            id: 'confluence.page,blogpost' as Scope,
            results: [
              {
                title: '@@@hl@@@page@@@endhl@@@ name',
                baseUrl: 'http://baseUrl/wiki',
                url: '/url',
                container: {
                  title: 'containerTitle',
                },
                content: {
                  id: '123',
                  type: 'page',
                },
              } as ConfluenceItem,
            ],
          },
        ],
      });

      const result = await searchClient.search('query', searchSession, [
        Scope.ConfluencePageBlog,
      ]);
      expect(result.results.get(Scope.ConfluencePageBlog)).toHaveLength(1);

      const item = result.results.get(
        Scope.ConfluencePageBlog,
      )![0] as ConfluenceObjectResult;
      expect(item.resultId).toEqual('123');
      expect(item.name).toEqual('page name');
      expect(item.href).toEqual('/wiki/url?search_id=test_uuid');
      expect(item.containerName).toEqual('containerTitle');
      expect(item.analyticsType).toEqual(AnalyticsType.ResultConfluence);
      expect(item.resultType).toEqual(ResultType.ConfluenceObjectResult);
      expect(item.contentType).toEqual(ContentType.ConfluencePage);
    });

    it('should return confluence spaces', async () => {
      apiWillReturn({
        scopes: [
          {
            id: 'confluence.space' as Scope,
            abTest,
            results: [
              {
                title: 'abc',
                url: 'url',
                baseUrl: 'https://baseUrl/wiki',
                container: {
                  title: 'containerTitle',
                  displayUrl: '/displayUrl',
                },
                space: {
                  key: 'key',
                  icon: {
                    path: '/spaceIconPath',
                  },
                },
                iconCssClass: 'aui-iconfont-space-default',
              } as ConfluenceItem,
            ],
          },
        ],
      });

      const result = await searchClient.search('query', searchSession, [
        Scope.ConfluenceSpace,
      ]);
      expect(result.results.get(Scope.ConfluenceSpace)).toHaveLength(1);
      expect(result.abTest!.experimentId).toBe('experimentId');

      const item = result.results.get(
        Scope.ConfluenceSpace,
      )![0] as ContainerResult;
      expect(item.resultId).toEqual('space-key');
      expect(item.avatarUrl).toEqual('https://baseUrl/wiki/spaceIconPath');
      expect(item.name).toEqual('containerTitle');
      expect(item.href).toEqual('/wiki/displayUrl?search_id=test_uuid');
      expect(item.analyticsType).toEqual(AnalyticsType.ResultConfluence);
      expect(item.resultType).toEqual(ResultType.GenericContainerResult);
    });
  });

  describe('Jira', () => {
    it('should return jira result items', async () => {
      apiWillReturn({
        scopes: [
          {
            id: 'jira.issue' as Scope,
            abTest,
            results: [
              {
                key: 'key-1',
                fields: {
                  summary: 'summary',
                  project: {
                    name: 'projectName',
                  },
                  issuetype: {
                    iconUrl: 'iconUrl',
                  },
                },
              },
            ],
          },
        ],
      });

      const result = await searchClient.search('query', searchSession, [
        Scope.JiraIssue,
      ]);
      expect(result.results.get(Scope.JiraIssue)).toHaveLength(1);
      expect(result.abTest!.experimentId).toBe('experimentId');

      const item = result.results.get(Scope.JiraIssue)![0] as JiraResult;
      expect(item.name).toEqual('summary');
      expect(item.avatarUrl).toEqual('iconUrl');
      expect(item.href).toEqual('/browse/key-1');
      expect(item.containerName).toEqual('projectName');
      expect(item.objectKey).toEqual('key-1');
      expect(item.analyticsType).toEqual(AnalyticsType.ResultJira);
      expect(item.resultType).toEqual(ResultType.JiraObjectResult);
    });

    it('should not break with error scopes', async () => {
      const jiraScopes = [Scope.JiraIssue, Scope.JiraBoardProjectFilter];

      const issueErrorScope: ScopeResult = {
        id: Scope.JiraIssue,
        error: 'something wrong',
        results: [],
      };

      const containerCorrectScope = {
        id: Scope.JiraBoardProjectFilter,
        results: [
          generateRandomJiraBoard(),
          generateRandomJiraFilter(),
          generateRandomJiraProject(),
        ],
      };

      apiWillReturn({
        scopes: [issueErrorScope, containerCorrectScope],
      });

      const result = await searchClient.search(
        'query',
        searchSession,
        jiraScopes,
      );
      expect(result.results.get(Scope.JiraIssue)).toHaveLength(0);
      expect(result.results.get(Scope.JiraBoardProjectFilter)).toHaveLength(3);
    });
  });

  describe('People', () => {
    it('should return people results', async () => {
      apiWillReturn({
        scopes: [
          {
            id: 'cpus.user' as Scope,
            results: [
              {
                account_id: 'account_id',
                name: 'name',
                nickname: 'nickname',
                job_title: 'job_title',
                picture: 'picture',
              } as PersonItem,
            ],
          },
        ],
      });

      const result = await searchClient.search(
        'query',
        { sessionId: 'sessionId' },
        [Scope.People],
      );
      expect(result.results.get(Scope.People)).toHaveLength(1);

      const item = result.results.get(Scope.People)![0] as PersonResult;
      expect(item.resultId).toEqual('people-account_id');
      expect(item.name).toEqual('name');
      expect(item.href).toEqual('/people/account_id');
      expect(item.analyticsType).toEqual(AnalyticsType.ResultPerson);
      expect(item.resultType).toEqual(ResultType.PersonResult);
      expect(item.avatarUrl).toEqual('picture');
      expect(item.mentionName).toEqual('nickname');
      expect(item.presenceMessage).toEqual('job_title');
    });

    it('should have fall back for optional properties like title and nickname', async () => {
      apiWillReturn({
        scopes: [
          {
            id: 'cpus.user' as Scope,
            results: [
              {
                account_id: 'account_id',
                name: 'name',
                picture: 'picture',
              } as PersonItem,
            ],
          },
        ],
      });

      const result = await searchClient.search(
        'query',
        { sessionId: 'sessionId' },
        [Scope.People],
      );

      const item = result.results.get(Scope.People)![0] as PersonResult;
      expect(item.mentionName).toEqual('name');
      expect(item.presenceMessage).toEqual('');
    });
  });

  it('should return partial results when one scope has an error', async () => {
    apiWillReturn({
      scopes: [
        {
          id: 'jira.issue' as Scope,
          results: [
            {
              key: 'key-1',
              fields: {
                summary: 'summary',
                project: {
                  name: 'name',
                },
                issuetype: {
                  iconUrl: 'iconUrl',
                },
              },
            },
          ],
        },
        {
          id: 'confluence.page,blogpost' as Scope,
          error: 'TIMEOUT',
          results: [],
        },
      ],
    });

    const result = await searchClient.search('query', searchSession, [
      Scope.ConfluencePageBlog,
      Scope.ConfluenceSpace,
    ]);

    expect(result.results.get(Scope.JiraIssue)).toHaveLength(1);
    expect(result.results.get(Scope.ConfluencePageBlog)).toHaveLength(0);
  });

  it('should send the right body', async () => {
    apiWillReturn({
      scopes: [],
    });
    // @ts-ignore
    const result = await searchClient.search('query', searchSession, [
      Scope.ConfluencePageBlog,
      Scope.JiraIssue,
    ]);
    const call = fetchMock.calls('xpsearch')[0];
    // @ts-ignore
    const body = JSON.parse(call[1].body);

    expect(body.query).toEqual('query');
    expect(body.cloudId).toEqual('123');
    expect(body.limit).toEqual(10);
    expect(body.scopes).toEqual(
      expect.arrayContaining(['jira.issue', 'confluence.page,blogpost']),
    );
  });

  describe('ABTest', () => {
    it('should get the ab test data', async () => {
      const abTest = {
        abTestId: 'abTestId',
        experimentId: 'experimentId',
        controlId: 'controlId',
      };

      experimentApiWillReturn({
        scopes: [
          {
            id: 'confluence.page,blogpost' as Scope,
            abTest,
          },
        ],
      });

      const result = await searchClient.getAbTestData(
        Scope.ConfluencePageBlog,
        searchSession,
      );
      expect(result).toEqual(abTest);
    });

    it('should not fail if getting experiments fails', async () => {
      experimentApiWillReturn({
        scopes: [
          {
            id: 'confluence.page,blogpost' as Scope,
            error: 'did not work',
          },
        ],
      });

      const result = await searchClient.getAbTestData(
        Scope.ConfluencePageBlog,
        searchSession,
      );
      expect(result).toBeUndefined();
    });
  });
});
