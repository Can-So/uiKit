import { ResultsGroup, JiraResultsMap, GenericResultMap, Result } from '../../model/Result';
export declare const sliceResults: (resultsMap: GenericResultMap<Result> | null) => {
    objectsToDisplay: Result[];
    containersToDisplay: Result[];
    peopleToDisplay: Result[];
};
export declare const mapRecentResultsToUIGroups: (recentlyViewedObjects: JiraResultsMap | null) => ResultsGroup[];
export declare const mapSearchResultsToUIGroups: (searchResultsObjects: JiraResultsMap | null) => ResultsGroup[];
