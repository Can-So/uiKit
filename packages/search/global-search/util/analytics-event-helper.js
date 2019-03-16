import * as tslib_1 from "tslib";
import * as Rusha from 'rusha';
import { sanitizeSearchQuery, sanitizeContainerId, DEFAULT_GAS_CHANNEL, DEFAULT_GAS_ATTRIBUTES, DEFAULT_GAS_SOURCE, } from './analytics-util';
var fireGasEvent = function (createAnalyticsEvent, action, actionSubject, actionSubjectId, eventType, extraAtrributes, nonPrivacySafeAttributes) {
    if (createAnalyticsEvent) {
        var event_1 = createAnalyticsEvent();
        var payload = {
            action: action,
            actionSubject: actionSubject,
            actionSubjectId: actionSubjectId,
            eventType: eventType,
            source: DEFAULT_GAS_SOURCE,
            attributes: tslib_1.__assign({}, extraAtrributes, DEFAULT_GAS_ATTRIBUTES),
        };
        if (nonPrivacySafeAttributes) {
            payload.nonPrivacySafeAttributes = nonPrivacySafeAttributes;
        }
        event_1.update(payload).fire(DEFAULT_GAS_CHANNEL);
    }
};
export function firePreQueryShownEvent(eventAttributes, elapsedMs, renderTimeMs, searchSessionId, createAnalyticsEvent, experimentRequestDurationMs) {
    fireGasEvent(createAnalyticsEvent, 'shown', 'searchResults', 'preQuerySearchResults', 'ui', tslib_1.__assign({ preQueryRequestDurationMs: elapsedMs, experimentRequestDurationMs: experimentRequestDurationMs,
        renderTimeMs: renderTimeMs, searchSessionId: searchSessionId }, eventAttributes));
}
export function fireExperimentExposureEvent(abTest, searchSessionId, createAnalyticsEvent) {
    fireGasEvent(createAnalyticsEvent, 'exposed', 'quickSearchExperiment', '', 'operational', tslib_1.__assign({ searchSessionId: searchSessionId,
        abTest: abTest }, abTest));
}
var getQueryAttributes = function (query) {
    var sanitizedQuery = sanitizeSearchQuery(query);
    return {
        queryLength: sanitizedQuery.length,
        wordCount: sanitizedQuery.length > 0 ? sanitizedQuery.split(/\s/).length : 0,
        queryHash: sanitizedQuery ? hash(sanitizedQuery) : '',
        isNonZeroNumericQuery: !!+sanitizedQuery,
    };
};
var getNonPrivacySafeAttributes = function (query) {
    return {
        query: sanitizeSearchQuery(query),
    };
};
export function fireTextEnteredEvent(query, searchSessionId, queryVersion, isSendSearchTermsEnabled, createAnalyticsEvent) {
    fireGasEvent(createAnalyticsEvent, 'entered', 'text', 'globalSearchInputBar', 'track', tslib_1.__assign({ queryId: null, queryVersion: queryVersion }, getQueryAttributes(query), { searchSessionId: searchSessionId }), isSendSearchTermsEnabled ? getNonPrivacySafeAttributes(query) : undefined);
}
export function fireDismissedEvent(searchSessionId, createAnalyticsEvent) {
    fireGasEvent(createAnalyticsEvent, 'dismissed', 'globalSearchDrawer', '', 'ui', { searchSessionId: searchSessionId });
}
export function firePostQueryShownEvent(resultsDetails, timings, searchSessionId, query, createAnalyticsEvent) {
    var event = createAnalyticsEvent();
    var elapsedMs = timings.elapsedMs, otherPerformanceTimings = tslib_1.__rest(timings, ["elapsedMs"]);
    var payload = {
        action: 'shown',
        actionSubject: 'searchResults',
        actionSubjectId: 'postQuerySearchResults',
        eventType: 'ui',
        source: DEFAULT_GAS_SOURCE,
        attributes: tslib_1.__assign({}, getQueryAttributes(query), { postQueryRequestDurationMs: elapsedMs, searchSessionId: searchSessionId }, otherPerformanceTimings, resultsDetails, DEFAULT_GAS_ATTRIBUTES),
    };
    event.update(payload).fire(DEFAULT_GAS_CHANNEL);
}
var transformSearchResultEventData = function (eventData) { return ({
    resultContentId: eventData.resultId,
    type: eventData.contentType,
    sectionId: eventData.type,
    sectionIndex: eventData.sectionIndex,
    globalIndex: eventData.index,
    indexWithinSection: eventData.indexWithinSection,
    containerId: sanitizeContainerId(eventData.containerId),
    resultCount: eventData.resultCount,
    experimentId: eventData.experimentId,
}); };
var hash = function (str) {
    return Rusha.createHash()
        .update(str)
        .digest('hex');
};
export function fireSelectedSearchResult(eventData, searchSessionId, createAnalyticsEvent) {
    var method = eventData.method, newTab = eventData.newTab, query = eventData.query, queryVersion = eventData.queryVersion;
    fireGasEvent(createAnalyticsEvent, 'selected', 'navigationItem', 'searchResult', 'track', tslib_1.__assign({ queryVersion: queryVersion, queryId: null }, getQueryAttributes(query), { trigger: method, searchSessionId: searchSessionId, newTab: newTab }, transformSearchResultEventData(eventData)));
}
export function fireSelectedAdvancedSearch(eventData, searchSessionId, createAnalyticsEvent) {
    var method = eventData.method, newTab = eventData.newTab, query = eventData.query, queryVersion = eventData.queryVersion;
    fireGasEvent(createAnalyticsEvent, 'selected', 'navigationItem', "advanced_" + eventData.resultId, 'track', tslib_1.__assign({ trigger: method, searchSessionId: searchSessionId, newTab: newTab,
        queryVersion: queryVersion, queryId: null, isLoading: eventData.isLoading }, getQueryAttributes(query), { wasOnNoResultsScreen: eventData.wasOnNoResultsScreen || false }, transformSearchResultEventData(eventData)));
}
export function fireHighlightedSearchResult(eventData, searchSessionId, createAnalyticsEvent) {
    var key = eventData.key;
    fireGasEvent(createAnalyticsEvent, 'highlighted', 'navigationItem', 'searchResult', 'ui', tslib_1.__assign({ searchSessionId: searchSessionId }, transformSearchResultEventData(eventData), { key: key }));
}
//# sourceMappingURL=analytics-event-helper.js.map