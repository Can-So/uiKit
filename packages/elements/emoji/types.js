export var SearchSort;
(function (SearchSort) {
    // no sort - just the default ordering of emoji
    SearchSort[SearchSort["None"] = 0] = "None";
    // a sort taking into account a number of factors including, usage, closeness of match to the query, etc
    SearchSort[SearchSort["Default"] = 1] = "Default";
    // sort such that the most frequently used emoji come first, and then standard, service defined ordering is preserved.
    SearchSort[SearchSort["UsageFrequency"] = 2] = "UsageFrequency";
})(SearchSort || (SearchSort = {}));
//# sourceMappingURL=types.js.map