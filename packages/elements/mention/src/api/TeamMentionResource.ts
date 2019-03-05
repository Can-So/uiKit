import {
  KeyValues,
  utils as serviceUtils,
} from '@atlaskit/util-service-support';

import {
  MentionsResult,
  Team,
  UserType,
  UserAccessLevel,
  MentionDescription,
} from '../types';
import MentionResource, {
  MAX_QUERY_ITEMS,
  MentionContextIdentifier,
  MentionResourceConfig,
} from './MentionResource';
import debug from '../util/logger';

export interface TeamMentionResourceConfig extends MentionResourceConfig {
  currentUserId?: string;
}

/**
 * Provides a Javascript API to fetch users and teams
 * In future we will have a new endpoint to return both users and teams, we can
 * remove this class at this point
 */
export default class TeamMentionResource extends MentionResource {
  private readonly teamMentionConfig: TeamMentionResourceConfig;

  constructor(
    userMentionConfig: MentionResourceConfig,
    teamMentionConfig: TeamMentionResourceConfig,
  ) {
    super(userMentionConfig);
    this.verifyMentionConfig(teamMentionConfig);
    this.teamMentionConfig = teamMentionConfig;
  }

  protected async remoteSearch(
    query: string,
    contextIdentifier?: MentionContextIdentifier,
  ): Promise<MentionsResult> {
    const p1 = this.remoteUserSearch(query, contextIdentifier);
    const p2 = this.remoteTeamSearch(query, contextIdentifier);

    const [result1, result2] = await Promise.all([p1, p2]);

    // combine results of 2 requests
    return {
      mentions: [...result1.mentions, ...result2.mentions],
      query: result1.query,
    };
  }

  /**
   * Returns the initial mention display list before a search is performed for the specified
   * container.
   */
  protected async remoteInitialState(
    contextIdentifier?: MentionContextIdentifier,
  ): Promise<MentionsResult> {
    const query = '';
    const promise1 = super.remoteInitialState(contextIdentifier);

    const queryParams: KeyValues = this.getQueryParamsOfTeamMentionConfig(
      contextIdentifier,
    );
    let getTeamsPromise: Promise<{ entities: Team[] }> = Promise.resolve({
      entities: [],
    });

    if (this.teamMentionConfig.currentUserId) {
      // TODO: In https://product-fabric.atlassian.net/browse/TEAMS-313, we will supply a new endpoint for this
      const options = {
        path: `/of-user/${this.teamMentionConfig.currentUserId}`,
        queryParams,
      };
      getTeamsPromise = serviceUtils.requestService<{ entities: Team[] }>(
        this.teamMentionConfig,
        options,
      );
    }

    const [usersResult, teamsResult] = await Promise.all([
      promise1,
      getTeamsPromise,
    ]);
    const teamsMentionResult = this.convertTeamResultToMentionResult(
      teamsResult.entities,
      query,
    );

    // combine results of 2 requests
    return {
      mentions: [...usersResult.mentions, ...teamsMentionResult.mentions],
      query: usersResult.query,
    };
  }

  shouldHighlightMention(mention: MentionDescription) {
    if (this.teamMentionConfig.currentUserId === mention.id) {
      return true;
    }

    return super.shouldHighlightMention(mention);
  }

  private getQueryParamsOfTeamMentionConfig(
    contextIdentifier?: MentionContextIdentifier,
  ): KeyValues {
    const configParams: KeyValues = {};

    if (this.teamMentionConfig.containerId) {
      configParams['containerId'] = this.teamMentionConfig.containerId;
    }

    if (this.teamMentionConfig.productId) {
      configParams['productIdentifier'] = this.teamMentionConfig.productId;
    }

    // if contextParams exist then it will override configParams for containerId
    return { ...configParams, ...contextIdentifier };
  }

  private async remoteUserSearch(
    query: string,
    contextIdentifier?: MentionContextIdentifier,
  ): Promise<MentionsResult> {
    try {
      return super.remoteSearch(query, contextIdentifier);
    } catch (err) {
      debug('ak-mention-resource.remoteUserSearch', err);

      return Promise.resolve({
        mentions: [],
        query,
      });
    }
  }

  private async remoteTeamSearch(
    query: string,
    contextIdentifier?: MentionContextIdentifier,
  ): Promise<MentionsResult> {
    const options = {
      path: 'search',
      queryParams: {
        // TODO: User mention uses `query`, but current search teams API requires `q` parameter
        // need update back-end to accept `query` paramaeter
        q: query,
        limit: MAX_QUERY_ITEMS,
        ...this.getQueryParamsOfTeamMentionConfig(contextIdentifier),
      },
    };

    try {
      const teamResult = await serviceUtils.requestService<Team[]>(
        this.teamMentionConfig,
        options,
      );
      return this.convertTeamResultToMentionResult(teamResult, query);
    } catch (err) {
      debug('ak-mention-resource.remoteTeamSearch', err);

      return Promise.resolve({
        mentions: [],
        query,
      });
    }
  }

  private convertTeamResultToMentionResult(
    result: Team[],
    query: string,
  ): MentionsResult {
    const mentions = result.map((team: Team) => {
      return {
        id: team.id,
        avatarUrl: team.smallAvatarImageUrl,
        name: team.displayName,
        accessLevel: UserAccessLevel[UserAccessLevel.CONTAINER],
        userType: UserType[UserType.TEAM],
        lozenge: UserType[UserType.TEAM],
        query,
      };
    });

    return { mentions, query };
  }

  protected async recordSelection(
    mention: MentionDescription,
    contextIdentifier?: MentionContextIdentifier,
  ): Promise<void> {
    // TODO: should we record a team selection
    super.recordSelection(mention, contextIdentifier);
  }
}
