var handleMargin = 12;
var gutterSize = handleMargin * 2;
var validWidthModes = [
    'center',
    'wrap-left',
    'wrap-right',
    'align-start',
    'align-end',
];
export var layoutSupportsWidth = function (layout) {
    return validWidthModes.indexOf(layout) > -1;
};
export function calcPxFromColumns(columns, lineLength, gridSize) {
    var maxWidth = lineLength + gutterSize;
    return (maxWidth / gridSize) * columns - gutterSize;
}
export function calcColumnsFromPx(width, lineLength, gridSize) {
    var maxWidth = lineLength + gutterSize;
    return ((width + gutterSize) * gridSize) / maxWidth;
}
export function calcPxFromPct(pct, lineLength) {
    var maxWidth = lineLength + gutterSize;
    return maxWidth * pct - gutterSize;
}
export function calcPctFromPx(width, lineLength) {
    var maxWidth = lineLength + gutterSize;
    return (width + gutterSize) / maxWidth;
}
export var snapToGrid = function (gridWidth, width, height, lineLength, gridSize) {
    var pxWidth = calcPxFromPct(gridWidth / 100, lineLength);
    var columnSpan = Math.round(calcColumnsFromPx(pxWidth, lineLength, gridSize));
    var alignedWidth = calcPxFromColumns(columnSpan, lineLength, gridSize);
    return {
        height: (height / width) * alignedWidth,
        width: alignedWidth,
    };
};
//# sourceMappingURL=grid.js.map