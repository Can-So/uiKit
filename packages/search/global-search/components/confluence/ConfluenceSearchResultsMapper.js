import { take } from '../SearchResultsUtil';
import { messages } from '../../messages';
export var MAX_PAGES = 8;
export var MAX_SPACES = 3;
export var MAX_PEOPLE = 3;
var EMPTY_CONFLUENCE_RESULT = {
    people: [],
    objects: [],
    spaces: [],
};
export var sliceResults = function (resultsMap) {
    if (!resultsMap) {
        return EMPTY_CONFLUENCE_RESULT;
    }
    var people = resultsMap.people, objects = resultsMap.objects, spaces = resultsMap.spaces;
    return {
        objects: take(objects, MAX_PAGES),
        spaces: take(spaces, MAX_SPACES),
        people: take(people, MAX_PEOPLE),
    };
};
export var mapRecentResultsToUIGroups = function (recentlyViewedObjects) {
    var _a = sliceResults(recentlyViewedObjects), people = _a.people, objects = _a.objects, spaces = _a.spaces;
    return [
        {
            items: objects,
            key: 'objects',
            title: messages.confluence_recent_pages_heading,
        },
        {
            items: spaces,
            key: 'spaces',
            title: messages.confluence_recent_spaces_heading,
        },
        {
            items: people,
            key: 'people',
            title: messages.people_recent_people_heading,
        },
    ];
};
export var mapSearchResultsToUIGroups = function (searchResultsObjects) {
    var _a = sliceResults(searchResultsObjects), people = _a.people, objects = _a.objects, spaces = _a.spaces;
    return [
        {
            items: objects,
            key: 'objects',
            title: messages.confluence_confluence_objects_heading,
        },
        {
            items: spaces,
            key: 'spaces',
            title: messages.confluence_spaces_heading,
        },
        {
            items: people,
            key: 'people',
            title: messages.people_people_heading,
        },
    ];
};
//# sourceMappingURL=ConfluenceSearchResultsMapper.js.map