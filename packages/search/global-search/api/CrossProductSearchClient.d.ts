import { Result } from '../model/Result';
import { Scope, ConfluenceItem, JiraItem, PersonItem } from './types';
export declare type CrossProductSearchResults = {
    results: Map<Scope, Result[]>;
    abTest?: ABTest;
};
export declare type SearchSession = {
    sessionId: string;
    referrerId?: string;
};
export declare const EMPTY_CROSS_PRODUCT_SEARCH_RESPONSE: CrossProductSearchResults;
export interface CrossProductSearchResponse {
    scopes: ScopeResult[];
}
export interface CrossProductExperimentResponse {
    scopes: Experiment[];
}
export declare type SearchItem = ConfluenceItem | JiraItem | PersonItem;
export interface ABTest {
    abTestId: string;
    controlId: string;
    experimentId: string;
}
export interface ScopeResult {
    id: Scope;
    error?: string;
    results: SearchItem[];
    abTest?: ABTest;
}
export interface Experiment {
    id: Scope;
    error?: string;
    abTest?: ABTest;
}
export interface CrossProductSearchClient {
    search(query: string, searchSession: SearchSession, scopes: Scope[], resultLimit?: Number): Promise<CrossProductSearchResults>;
    getAbTestData(scope: Scope, searchSession: SearchSession): Promise<ABTest | undefined>;
}
export default class CrossProductSearchClientImpl implements CrossProductSearchClient {
    private serviceConfig;
    private cloudId;
    private addSessionIdToJiraResult;
    private readonly RESULT_LIMIT;
    constructor(url: string, cloudId: string, addSessionIdToJiraResult?: boolean);
    search(query: string, searchSession: SearchSession, scopes: Scope[], resultLimit?: Number): Promise<CrossProductSearchResults>;
    getAbTestData(scope: Scope, searchSession: SearchSession): Promise<ABTest | undefined>;
    private makeRequest;
    /**
     * Converts the raw xpsearch-aggregator response into a CrossProductSearchResults object containing
     * the results set and the experimentId that generated them.
     *
     * @param response
     * @param searchSessionId
     * @returns a CrossProductSearchResults object
     */
    private parseResponse;
}
