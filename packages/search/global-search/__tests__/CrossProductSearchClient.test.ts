import CrossProductSearchClient, {
  CrossProductSearchResponse,
  Scope,
  removeHighlightTags,
  ConfluenceItem,
} from '../src/api/CrossProductSearchClient';
import 'whatwg-fetch';
import * as fetchMock from 'fetch-mock';
import {
  AnalyticsType,
  ConfluenceObjectResult,
  ResultType,
  ContentType,
  ContainerResult,
  JiraObjectResult,
} from '../src/model/Result';

function apiWillReturn(state: CrossProductSearchResponse) {
  const opts = {
    method: 'post',
    name: 'xpsearch',
  };

  fetchMock.mock('localhost/quicksearch/v1', state, opts);
}

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
                baseUrl: 'baseUrl',
                url: '/url',
                container: {
                  title: 'containerTitle',
                },
                content: {
                  type: 'page',
                },
              } as ConfluenceItem,
            ],
          },
        ],
      });

      const result = await searchClient.search('query', 'test_uuid', [
        Scope.ConfluencePageBlog,
      ]);
      expect(result.get(Scope.ConfluencePageBlog)).toHaveLength(1);

      const item = result.get(
        Scope.ConfluencePageBlog,
      )[0] as ConfluenceObjectResult;
      expect(item.resultId).toEqual('search-/url');
      expect(item.name).toEqual('page name');
      expect(item.href).toEqual('baseUrl/url?search_id=test_uuid');
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
            results: [
              {
                baseUrl: 'baseUrl',
                container: {
                  title: 'containerTitle',
                  displayUrl: '/displayUrl',
                },
                space: {
                  icon: {
                    path: '/spaceIconPath',
                  },
                },
              } as ConfluenceItem,
            ],
          },
        ],
      });

      const result = await searchClient.search('query', 'test_uuid', [
        Scope.ConfluenceSpace,
      ]);
      expect(result.get(Scope.ConfluenceSpace)).toHaveLength(1);

      const item = result.get(Scope.ConfluenceSpace)[0] as ContainerResult;
      expect(item.resultId).toEqual('search-/displayUrl');
      expect(item.avatarUrl).toEqual('baseUrl/spaceIconPath');
      expect(item.name).toEqual('containerTitle');
      expect(item.href).toEqual('baseUrl/displayUrl?search_id=test_uuid');
      expect(item.analyticsType).toEqual(AnalyticsType.ResultConfluence);
      expect(item.resultType).toEqual(ResultType.GenericContainerResult);
    });

    it('should parse the highlight tags from the title', () => {
      let text = removeHighlightTags(
        '@@@hl@@@new@@@endhl@@@ @@@hl@@@page@@@endhl@@@',
      );
      expect(text).toEqual('new page');

      text = removeHighlightTags('no highlight');
      expect(text).toEqual('no highlight');
    });
  });

  describe('Jira', () => {
    it('should return jira result items', async () => {
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

      const result = await searchClient.search('query', 'test_uuid', [
        Scope.JiraIssue,
      ]);
      expect(result.get(Scope.JiraIssue)).toHaveLength(1);

      const item = result.get(Scope.JiraIssue)[0] as JiraObjectResult;
      expect(item.name).toEqual('summary');
      expect(item.avatarUrl).toEqual('iconUrl');
      expect(item.href).toEqual('/browse/key-1');
      expect(item.containerName).toEqual('projectName');
      expect(item.objectKey).toEqual('key-1');
      expect(item.analyticsType).toEqual(AnalyticsType.ResultJira);
      expect(item.resultType).toEqual(ResultType.JiraObjectResult);
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

    const result = await searchClient.search('query', 'test_uuid', [
      Scope.ConfluencePageBlog,
      Scope.ConfluenceSpace,
    ]);

    expect(result.get(Scope.JiraIssue)).toHaveLength(1);
    expect(result.get(Scope.ConfluencePageBlog)).toHaveLength(0);
  });

  it('should send the right body', async () => {
    apiWillReturn({
      scopes: [],
    });

    const result = await searchClient.search('query', 'test_uuid', [
      Scope.ConfluencePageBlog,
      Scope.JiraIssue,
    ]);
    const call = fetchMock.calls('xpsearch')[0];
    const body = JSON.parse(call[0]._bodyText);

    expect(body.query).toEqual('query');
    expect(body.cloudId).toEqual('123');
    expect(body.limit).toEqual(10);
    expect(body.scopes).toEqual(
      expect.arrayContaining(['jira.issue', 'confluence.page,blogpost']),
    );
  });
});
