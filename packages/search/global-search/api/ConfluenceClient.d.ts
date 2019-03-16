import { Result } from '../model/Result';
export interface ConfluenceClient {
    getRecentItems(searchSessionId: string): Promise<Result[]>;
    getRecentSpaces(searchSessionId: string): Promise<Result[]>;
    searchPeopleInQuickNav(query: string, searchSessionId: string): Promise<Result[]>;
}
export declare type ConfluenceContentType = 'blogpost' | 'page';
export interface RecentPage {
    available: boolean;
    contentType: ConfluenceContentType;
    id: string;
    lastSeen: number;
    space: string;
    spaceKey: string;
    title: string;
    type: string;
    url: string;
    iconClass: string;
}
export interface RecentSpace {
    id: string;
    key: string;
    icon: string;
    name: string;
}
export interface QuickNavResponse {
    contentNameMatches: QuickNavResult[][];
}
export interface QuickNavResult {
    className: string;
    href: string;
    name: string;
    id: string;
    icon: string;
}
export default class ConfluenceClientImpl implements ConfluenceClient {
    private serviceConfig;
    private cloudId;
    private readonly RESULT_LIMIT;
    constructor(url: string, cloudId: string);
    searchPeopleInQuickNav(query: string, searchSessionId: string): Promise<Result[]>;
    getRecentItems(searchSessionId: string): Promise<Result[]>;
    getRecentSpaces(searchSessionId: string): Promise<Result[]>;
    private createQuickNavRequestPromise;
    private createRecentRequestPromise;
}
