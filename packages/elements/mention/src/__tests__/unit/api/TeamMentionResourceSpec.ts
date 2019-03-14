import { SecurityOptions } from '@atlaskit/util-service-support';
import 'es6-promise/auto'; // 'whatwg-fetch' needs a Promise polyfill
import 'whatwg-fetch';
import * as fetchMock from 'fetch-mock/src/client';
import * as queryString from 'query-string';
import TeamMentionResource from '../../../api/TeamMentionResource';
import { resultCr, resultCraig, teamResults } from '../_mention-search-results';
import { MentionResourceConfig } from '../../../api/MentionResource';

const baseUserUrl = 'https://bogus/users/mentions';
const baseTeamUrl = 'https://bogus/teams/mentions';
const testMentionDesc = {
  id: 'abcd-abcd-abcd',
};

const defaultSecurityHeader = 'X-Bogus';

const options = (
  code: string | number,
  omitCredentials: boolean,
): SecurityOptions => ({
  headers: {
    [defaultSecurityHeader]: code,
  },
  omitCredentials,
});

const defaultSecurityCode = '10804';

const apiUserMentionConfig: MentionResourceConfig = {
  url: baseUserUrl,
  securityProvider() {
    return options(defaultSecurityCode, false);
  },
};

const apiTeamMentionConfig: MentionResourceConfig = {
  url: baseTeamUrl,
  securityProvider() {
    return options(defaultSecurityCode, false);
  },
};

const FULL_CONTEXT = {
  containerId: 'someContainerId',
  objectId: 'someObjectId',
  childObjectId: 'someChildObjectId',
  sessionId: 'someSessionId',
};

describe('TeamMentionResourceSpec', () => {
  let resource: TeamMentionResource;

  beforeEach(() => {
    fetchMock
      .mock(/\/users\/mentions\/search\?.*query=craig(&|$)/, {
        body: {
          mentions: resultCraig,
        },
      })
      .mock(/\/teams\/mentions\/search\?.*query=craig(&|$)/, {
        body: teamResults,
      })
      .mock(/\/users\/mentions\/search\?.*query=esoares(&|$)/, {
        body: {
          mentions: [],
        },
      })
      .mock(/\/teams\/mentions\/search\?.*query=esoares(&|$)/, {
        body: [],
      })
      .mock(
        /\/users\/mentions\/search\?.*query=cr(&|$)/,
        new Promise(resolve => {
          window.setTimeout(() => {
            resolve({
              // delayed results
              body: {
                mentions: resultCr,
              },
            });
          }, 100);
        }),
      )
      .mock(/\/teams\/mentions\/search\?.*query=cr(&|$)/, {
        body: [],
      })
      .mock(/\/users\/mentions\/search\?.*query=query-only-teams-fail(&|$)/, {
        body: {
          mentions: resultCr,
        },
      })
      .mock(
        /\/teams\/mentions\/search\?.*query=query-only-teams-fail(&|$)/,
        500,
      )
      .mock(
        /\/users\/mentions\/search\?.*query=query-only-users-fail(&|$)/,
        500,
      )
      .mock(/\/teams\/mentions\/search\?.*query=query-only-users-fail(&|$)/, {
        body: {
          mentions: teamResults,
        },
      });

    resource = new TeamMentionResource(
      apiUserMentionConfig,
      apiTeamMentionConfig,
    );
  });

  afterEach(() => {
    fetchMock.restore();
  });

  describe('#subscribe', () => {
    it('subscribe should receive updates', done => {
      resource.subscribe('craig', mentions => {
        expect(mentions).toHaveLength(resultCraig.length + teamResults.length);

        const queryParams = queryString.parse(
          queryString.extract(fetchMock.lastUrl()),
        );

        expect(queryParams.containerId).toBe('someContainerId');
        expect(queryParams.objectId).toBe('someObjectId');
        expect(queryParams.childObjectId).toBe('someChildObjectId');
        expect(queryParams.sessionId).toBe('someSessionId');
        expect(fetchMock.lastOptions().credentials).toEqual('include');

        done();
      });

      resource.filter('craig', FULL_CONTEXT);
    });

    it('multiple subscriptions should receive updates', done => {
      let count = 0;

      resource.subscribe('test1', mentions => {
        expect(mentions).toHaveLength(resultCraig.length + teamResults.length);

        count++;
        if (count === 2) {
          done();
        }
      });

      resource.subscribe('test2', mentions => {
        expect(mentions).toHaveLength(resultCraig.length + teamResults.length);

        count++;
        if (count === 2) {
          done();
        }
      });

      resource.filter('craig');
    });

    it('subscribe should receive updates with credentials omitted', done => {
      const resource = new TeamMentionResource(
        {
          ...apiUserMentionConfig,
          securityProvider() {
            return options(defaultSecurityCode, true);
          },
        },
        {
          ...apiTeamMentionConfig,
          securityProvider() {
            return options(defaultSecurityCode, true);
          },
        },
      );

      resource.subscribe('test3', mentions => {
        expect(mentions).toHaveLength(0);
        const requestData = fetchMock.lastOptions();

        expect(requestData.credentials).toEqual('omit');
        done();
      });

      resource.filter('esoares');
    });

    it('subscribe should still receive updates when one of users or teams requests fails', done => {
      resource.subscribe('test1', mentions => {
        expect(mentions).toHaveLength(resultCr.length);
        done();
      });

      resource.filter('query-only-teams-fail');

      resource.subscribe('test2', mentions => {
        expect(mentions).toHaveLength(teamResults.length);
        done();
      });

      resource.filter('query-only-users-fail');
    });
  });

  describe('#unsubscribe', () => {
    it('subscriber should no longer called', done => {
      const listener = jest.fn();
      resource.subscribe('test1', listener);
      resource.unsubscribe('test1');
      resource.filter('craig');

      // Not desirable...
      window.setTimeout(() => {
        expect(listener).toHaveBeenCalledTimes(0);
        done();
      }, 50);
    });
  });

  describe('#shouldHighlightMention', () => {
    it('should return false by default', () => {
      expect(resource.shouldHighlightMention(testMentionDesc)).toBe(false);
    });
  });
});
