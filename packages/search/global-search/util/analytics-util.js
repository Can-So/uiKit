import * as tslib_1 from "tslib";
import { ResultType, } from '../model/Result';
export var DEFAULT_GAS_SOURCE = 'globalSearchDrawer';
export var DEFAULT_GAS_CHANNEL = 'fabric-elements';
export var DEFAULT_GAS_ATTRIBUTES = {
    packageName: 'global-search',
    packageVersion: '0.0.0',
    componentName: 'GlobalQuickSearch',
};
export var GLOBAL_SEARCH_SCREEN_NAME = 'globalSearchDrawer';
export var sanitizeSearchQuery = function (query) {
    return (query || '').replace(/\s+/g, ' ').trim();
};
export var sanitizeContainerId = function (containerId) {
    var trimmedContainerId = (containerId || '').trim();
    return trimmedContainerId.startsWith('~')
        ? 'UNAVAILABLE'
        : trimmedContainerId;
};
function mapResultsToShownSection(results) {
    return {
        sectionId: results[0].resultType,
        results: results.map(mapResultToShownResult),
    };
}
function mapResultToShownResult(result) {
    if (result.resultType === ResultType.ConfluenceObjectResult) {
        var confluenceResult = result;
        return {
            resultContentId: result.resultId,
            resultType: confluenceResult.contentType,
            containerId: sanitizeContainerId(confluenceResult.containerId),
        };
    }
    else if (result.resultType === ResultType.JiraObjectResult) {
        var jiraResult = result;
        return {
            resultContentId: result.resultId,
            resultType: jiraResult.contentType,
            containerId: sanitizeContainerId(jiraResult.containerId),
        };
    }
    return {
        resultContentId: result.resultId,
    };
}
/**
 * @param resultsArrays an ordered array of Result arrays, passed as arguments
 */
export function buildShownEventDetails() {
    var resultsArrays = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        resultsArrays[_i] = arguments[_i];
    }
    var sectionsWithContent = resultsArrays.filter(function (section) { return section.length > 0; });
    var totalResultCount = resultsArrays.reduce(function (prev, curr) { return prev + curr.length; }, 0);
    // Grab experiment ID from the first result. For now we only run single experiments.
    var experimentId = sectionsWithContent[0] && sectionsWithContent[0][0]
        ? sectionsWithContent[0][0].experimentId
        : undefined;
    return {
        experimentId: experimentId,
        resultCount: totalResultCount,
        resultSectionCount: sectionsWithContent.length,
        resultContext: sectionsWithContent.map(mapResultsToShownSection),
    };
}
export var Screen;
(function (Screen) {
    Screen["PRE_QUERY"] = "GlobalSearchPreQueryDrawer";
    Screen["POST_QUERY"] = "GlobalSearchPostQueryDrawer";
})(Screen || (Screen = {}));
export function buildScreenEvent(screen, timesViewed, searchSessionId, referralContextIdentifiers) {
    return {
        action: 'viewed',
        actionSubject: GLOBAL_SEARCH_SCREEN_NAME,
        eventType: 'screen',
        source: DEFAULT_GAS_SOURCE,
        name: DEFAULT_GAS_SOURCE,
        attributes: tslib_1.__assign({ subscreen: screen, timesViewed: timesViewed, searchSessionId: searchSessionId }, referralContextIdentifiers, DEFAULT_GAS_ATTRIBUTES),
    };
}
//# sourceMappingURL=analytics-util.js.map