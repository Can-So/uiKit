import { Result } from '../model/Result';
import { GasPayload } from '@findable/analytics-gas-types';
import { ReferralContextIdentifiers } from '../components/GlobalQuickSearchWrapper';
export declare type ScreenEventSafeGasPayload = GasPayload & {
    name: string;
};
export declare const DEFAULT_GAS_SOURCE = "globalSearchDrawer";
export declare const DEFAULT_GAS_CHANNEL = "fabric-elements";
export declare const DEFAULT_GAS_ATTRIBUTES: {
    packageName: string;
    packageVersion: string;
    componentName: string;
};
export declare const GLOBAL_SEARCH_SCREEN_NAME = "globalSearchDrawer";
export interface ShownAnalyticsAttributes {
    resultCount: number;
    resultSectionCount: number;
    resultContext: ShownResultContextSection[];
    experimentId?: string;
}
export interface PerformanceTiming {
    elapsedMs: number;
    [key: string]: number;
}
export interface ShownResultContextSection {
    sectionId: string;
    results: ShownResultContextItem[];
}
export interface ShownResultContextItem {
    resultContentId: string;
    resultType?: string;
    containerId?: string;
}
export interface PostQueryShownAttributes extends ShownAnalyticsAttributes {
    queryWordCount: number;
    queryCharacterCount: number;
}
export interface ResultSelectedAnalyticsDetails {
    resultContentId: string;
    resultType: string;
    section: string;
    sectionIndex: number;
    globalIndex: number;
    indexWithinSection: number;
}
export declare const sanitizeSearchQuery: (query: string) => string;
export declare const sanitizeContainerId: (containerId?: string | undefined) => string;
/**
 * @param resultsArrays an ordered array of Result arrays, passed as arguments
 */
export declare function buildShownEventDetails(...resultsArrays: Result[][]): ShownAnalyticsAttributes;
export declare enum Screen {
    PRE_QUERY = "GlobalSearchPreQueryDrawer",
    POST_QUERY = "GlobalSearchPostQueryDrawer"
}
export declare function buildScreenEvent(screen: Screen, timesViewed: number, searchSessionId: string, referralContextIdentifiers: ReferralContextIdentifiers): ScreenEventSafeGasPayload;
