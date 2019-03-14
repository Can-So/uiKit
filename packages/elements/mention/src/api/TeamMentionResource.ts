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
  MentionContextIdentifier,
  MentionResourceConfig,
} from './MentionResource';
import debug from '../util/logger';

const MAX_QUERY_TEAMS = 20;

/**
 * Provides a Javascript API to fetch users and teams
 * In future we will have a new endpoint to return both users and teams, we can
 * remove this class at this point
 */
export default class TeamMentionResource extends MentionResource {
  private readonly teamMentionConfig: MentionResourceConfig;

  constructor(
    userMentionConfig: MentionResourceConfig,
    teamMentionConfig: MentionResourceConfig,
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

    const [userResults, teamResults] = await Promise.all([p1, p2]);

    // combine results of 2 requests
    return {
      mentions: [...userResults.mentions, ...teamResults.mentions],
      query: userResults.query,
    } as MentionsResult;
  }

  /**
   * Returns the initial mention display list before a search is performed for the specified
   * container.
   */
  protected async remoteInitialState(
    contextIdentifier?: MentionContextIdentifier,
  ): Promise<MentionsResult> {
    const query = '';
    const getUserPromise = super.remoteInitialState(contextIdentifier);

    const queryParams: KeyValues = this.getQueryParamsOfTeamMentionConfig(
      contextIdentifier,
    );

    const options = {
      path: 'bootstrap',
      queryParams,
    };
    const getTeamsPromise = serviceUtils.requestService<Team[]>(
      this.teamMentionConfig,
      options,
    );

    const [usersResult, teamsResult] = await Promise.all([
      getUserPromise,
      getTeamsPromise,
    ]);
    const teamsMentionResult = this.convertTeamResultToMentionResult(
      teamsResult,
      query,
    );

    // combine results of 2 requests
    return {
      mentions: [...usersResult.mentions, ...teamsMentionResult.mentions],
      query: usersResult.query,
    } as MentionsResult;
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

      return {
        mentions: [],
        query,
      };
    }
  }

  private async remoteTeamSearch(
    query: string,
    contextIdentifier?: MentionContextIdentifier,
  ): Promise<MentionsResult> {
    const options = {
      path: 'search',
      queryParams: {
        query,
        limit: MAX_QUERY_TEAMS,
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

      return {
        mentions: [],
        query,
      };
    }
  }

  private convertTeamResultToMentionResult(
    result: Team[],
    query: string,
  ): MentionsResult {
    const mentions: MentionDescription[] = result.map((team: Team) => {
      return {
        id: this.trimTeamARI(team.id),
        avatarUrl: team.smallAvatarImageUrl,
        name: team.displayName,
        accessLevel: UserAccessLevel[UserAccessLevel.CONTAINER],
        userType: UserType[UserType.TEAM],
        lozenge: UserType[UserType.TEAM],
        highlight: team.highlight,
        context: {
          members: team.members,
        },
      };
    });

    return { mentions, query };
  }

  private trimTeamARI(teamId: string = '') {
    const TEAM_ARI_PREFIX = 'ari:cloud:teams::team/';
    return teamId.replace(TEAM_ARI_PREFIX, '');
  }

  protected async recordSelection(
    mention: MentionDescription,
    contextIdentifier?: MentionContextIdentifier,
  ): Promise<void> {
    // TODO: should we record a team selection
    super.recordSelection(mention, contextIdentifier);
  }
}
