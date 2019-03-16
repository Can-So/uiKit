import * as tslib_1 from "tslib";
import { take } from '../SearchResultsUtil';
import { messages } from '../../messages';
var MAX_OBJECTS = 8;
var MAX_CONTAINERS = 6;
var MAX_PEOPLE = 3;
var DEFAULT_JIRA_RESULTS_MAP = {
    objects: [],
    containers: [],
};
export var sliceResults = function (resultsMap) {
    var _a = resultsMap
        ? resultsMap
        : DEFAULT_JIRA_RESULTS_MAP, objects = _a.objects, containers = _a.containers, people = _a.people;
    var _b = tslib_1.__read([
        { items: objects, count: MAX_OBJECTS },
        { items: people, count: MAX_PEOPLE },
        { items: containers, count: MAX_CONTAINERS },
    ].map(function (_a) {
        var items = _a.items, count = _a.count;
        return take(items, count);
    }), 3), objectsToDisplay = _b[0], peopleToDisplay = _b[1], containersToDisplay = _b[2];
    return {
        objectsToDisplay: objectsToDisplay,
        containersToDisplay: containersToDisplay,
        peopleToDisplay: peopleToDisplay,
    };
};
export var mapRecentResultsToUIGroups = function (recentlyViewedObjects) {
    var _a = sliceResults(recentlyViewedObjects), objectsToDisplay = _a.objectsToDisplay, peopleToDisplay = _a.peopleToDisplay, containersToDisplay = _a.containersToDisplay;
    return [
        {
            items: objectsToDisplay,
            key: 'issues',
            title: messages.jira_recent_issues_heading,
        },
        {
            items: containersToDisplay,
            key: 'containers',
            title: messages.jira_recent_containers,
        },
        {
            items: peopleToDisplay,
            key: 'people',
            title: messages.jira_recent_people_heading,
        },
    ];
};
export var mapSearchResultsToUIGroups = function (searchResultsObjects) {
    var _a = sliceResults(searchResultsObjects), objectsToDisplay = _a.objectsToDisplay, peopleToDisplay = _a.peopleToDisplay, containersToDisplay = _a.containersToDisplay;
    return [
        {
            items: objectsToDisplay,
            key: 'issues',
            title: messages.jira_search_result_issues_heading,
        },
        {
            items: containersToDisplay,
            key: 'containers',
            title: messages.jira_search_result_containers_heading,
        },
        {
            items: peopleToDisplay,
            key: 'people',
            title: messages.jira_search_result_people_heading,
        },
    ];
};
//# sourceMappingURL=JiraSearchResultsMapper.js.map