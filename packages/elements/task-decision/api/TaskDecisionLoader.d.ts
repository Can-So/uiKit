import { Item, Query, RecentUpdateContext, TaskDecisionProvider } from '../types';
/**
 * Grabs the latest Items from the service.
 */
export declare const loadLatestItems: (query: Query, provider: TaskDecisionProvider, recentUpdateContext: RecentUpdateContext) => Promise<Item[]>;
export interface ItemLoader<T> {
    (): Promise<T[]>;
}
export declare const retryIteration: <T extends Item>(loader: ItemLoader<T>, recentUpdateContext: RecentUpdateContext, retry?: number) => Promise<T[]>;
export declare const loadWithDelay: <T>(loader: ItemLoader<T>, delay: number) => Promise<T[]>;
