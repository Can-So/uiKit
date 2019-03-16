import { Result } from '../model/Result';
export interface GraphqlResponse {
    errors?: GraphqlError[];
    data?: {
        AccountCentricUserSearch?: SearchResult[];
        Collaborators?: SearchResult[];
        UserSearch?: SearchResult[];
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
    private serviceConfig;
    private cloudId;
    private readonly RESULT_LIMIT;
    constructor(url: string, cloudId: string);
    private buildRecentQuery;
    private buildSearchQuery;
    private buildRequestOptions;
    getRecentPeople(): Promise<Result[]>;
    search(query: string): Promise<Result[]>;
}
