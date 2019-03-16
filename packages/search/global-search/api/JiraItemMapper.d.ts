import { JiraResult } from '../model/Result';
import { JiraItem, JiraResultQueryParams } from './types';
export declare const mapJiraItemToResult: (item: JiraItem, searchSessionId: string, addSessionIdToJiraResult?: boolean | undefined) => JiraResult;
/**
 * add search session id, object id, container id and result type to query params
 */
export declare const addJiraResultQueryParams: (url: string, queryParams: JiraResultQueryParams) => any;
