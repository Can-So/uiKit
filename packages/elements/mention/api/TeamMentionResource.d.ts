import { MentionsResult, MentionDescription } from '../types';
import MentionResource, { MentionContextIdentifier, MentionResourceConfig } from './MentionResource';
/**
 * Provides a Javascript API to fetch users and teams
 * In future we will have a new endpoint to return both users and teams, we can
 * remove this class at this point
 */
export default class TeamMentionResource extends MentionResource {
    private readonly teamMentionConfig;
    constructor(userMentionConfig: MentionResourceConfig, teamMentionConfig: MentionResourceConfig);
    protected remoteSearch(query: string, contextIdentifier?: MentionContextIdentifier): Promise<MentionsResult>;
    /**
     * Returns the initial mention display list before a search is performed for the specified
     * container.
     */
    protected remoteInitialState(contextIdentifier?: MentionContextIdentifier): Promise<MentionsResult>;
    private getQueryParamsOfTeamMentionConfig;
    private remoteUserSearch;
    private remoteTeamSearch;
    private convertTeamResultToMentionResult;
    private trimTeamARI;
    protected recordSelection(mention: MentionDescription, contextIdentifier?: MentionContextIdentifier): Promise<void>;
}
