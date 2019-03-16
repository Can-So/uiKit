import { ResultsGroup, ConfluenceResultsMap } from '../../model/Result';
export declare const MAX_PAGES = 8;
export declare const MAX_SPACES = 3;
export declare const MAX_PEOPLE = 3;
export declare const sliceResults: (resultsMap: ConfluenceResultsMap | null) => ConfluenceResultsMap;
export declare const mapRecentResultsToUIGroups: (recentlyViewedObjects: ConfluenceResultsMap | null) => ResultsGroup[];
export declare const mapSearchResultsToUIGroups: (searchResultsObjects: ConfluenceResultsMap | null) => ResultsGroup[];
