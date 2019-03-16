import * as tslib_1 from "tslib";
export function trimChunk(chunk) {
    return chunk.toLowerCase().replace(/\s/g, '');
}
export function singleWord(search) {
    return !search.includes(' ');
}
export function defaultCompareFn(a, b) {
    return typeof a === 'number' && typeof b === 'number'
        ? a - b
        : String.prototype.localeCompare.call(a, b);
}
export var SortMode;
(function (SortMode) {
    SortMode["PRIORITY_FIRST"] = "first";
    SortMode["PRIORITY_LAST"] = "last";
})(SortMode || (SortMode = {}));
export function buildSortPredicateWith(getProp, getPriority, sortMode, compareFn) {
    if (compareFn === void 0) { compareFn = defaultCompareFn; }
    return function (a, b) {
        var _a = tslib_1.__read([
            getProp(a),
            getProp(b),
            getPriority(a),
            getPriority(b),
        ], 4), propA = _a[0], propB = _a[1], prioA = _a[2], prioB = _a[3];
        var prioDiff = compareFn(prioA, prioB);
        if (sortMode === SortMode.PRIORITY_FIRST && prioDiff) {
            return prioDiff;
        }
        else if (sortMode === SortMode.PRIORITY_FIRST) {
            return compareFn(propA, propB);
        }
        else {
            // SortMode.PRIORITY_LAST
            return prioDiff;
        }
    };
}
export function distance(search, content) {
    return trimChunk(search)
        .split('')
        .reduce(function (acc, char, index) {
        var distance = acc.distance, offset = acc.offset;
        if (distance === Infinity) {
            return acc;
        }
        var indexInContent = content.indexOf(char, offset);
        if (indexInContent === -1) {
            return { distance: Infinity, offset: 0 };
        }
        return {
            offset: indexInContent + 1,
            distance: distance +
                (index !== indexInContent ? Math.abs(index - indexInContent) : 0),
        };
    }, { distance: 0, offset: 0 }).distance;
}
// Finds the distance of the search string from each word and returns the min.
// Ensures the search string starts with the letter of one of the words
export function distanceByWords(search, content) {
    if (search === '') {
        return 0;
    }
    if (!singleWord(search)) {
        return distance(search, trimChunk(content));
    }
    var lowerSearch = trimChunk(search);
    return content
        .replace(/\s/g, ' ')
        .toLowerCase()
        .split(' ')
        .filter(function (word) { return lowerSearch[0] === word[0]; })
        .map(function (word) { return trimChunk(word); })
        .reduce(function (minDist, word) { return Math.min(minDist, distance(lowerSearch, word)); }, Infinity);
}
export function getSearchChunks(_a) {
    var keywords = _a.keywords, title = _a.title;
    return keywords ? [title].concat(keywords) : [title];
}
export function find(query, items) {
    return (items
        // pre-sort items by title ascending, putting prioritary items first
        .sort(buildSortPredicateWith(function (item) { return item.title; }, function (item) { return item.priority || Number.POSITIVE_INFINITY; }, SortMode.PRIORITY_FIRST))
        // calculate lowest items distance to query
        .map(function (item) { return ({
        item: item,
        distance: getSearchChunks(item).reduce(function (acc, chunk) {
            var chunkDistance = distanceByWords(query, chunk);
            return chunkDistance < acc ? chunkDistance : acc;
        }, Infinity),
    }); })
        /**
         * Filter results giving:
         * - potential match when query is one word
         * - exact match when query has more words
         */
        .filter(function (_a) {
        var distance = _a.distance;
        return singleWord(query) ? distance !== Infinity : distance === 0;
    })
        // post-sort items by distance ascending, putting prioritary items last
        .sort(buildSortPredicateWith(function (agg) { return agg.distance; }, function (agg) { return agg.item.priority || Number.POSITIVE_INFINITY; }, SortMode.PRIORITY_LAST))
        .map(function (agg) { return agg.item; }));
}
//# sourceMappingURL=search.js.map