export default (function (text, regexp) {
    var results = [];
    var match;
    while ((match = regexp.exec(text))) {
        results.push(match);
    }
    return results;
});
//# sourceMappingURL=matches.js.map