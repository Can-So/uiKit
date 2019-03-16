import { RequestServiceOptions, ServiceConfig } from './types';
/**
 * @returns Promise containing the json response
 */
export declare const requestService: <T>(serviceConfig: ServiceConfig, options?: RequestServiceOptions | undefined) => Promise<T>;
