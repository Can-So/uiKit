import { unitToNumber } from './utils';
/**
 * Measure text via Canvas context API.
 * @param {HTMLCanvasElement} canvas
 * @param {string} text
 * @param {string} font
 */
function measureText(canvas, text, font) {
    var ctx = canvas.getContext('2d');
    if (!ctx) {
        return 0;
    }
    if (font) {
        ctx.font = font;
    }
    return Math.round(ctx.measureText(text || '').width);
}
function handlePreText(canvas, node, textContent, font) {
    var parent = node;
    if (node.nodeName === 'CODE') {
        parent = node.parentNode;
    }
    var computedStyle = getComputedStyle(parent);
    if (textContent && computedStyle.whiteSpace === 'pre') {
        // If white space is pre grab the longest line in the block.
        return textContent
            .split('\n')
            .reduce(function (acc, current) { return Math.max(measureText(canvas, current, font), acc); }, 0);
    }
    return measureText(canvas, textContent, font);
}
function calcContentWidth(elem, container, canvas, colWidths) {
    var flowWidths = [];
    var curWidth = 0;
    for (var i = 0; i < elem.childNodes.length; i++) {
        var child = elem.childNodes[i];
        if (child.nodeType === Node.COMMENT_NODE) {
            continue;
        }
        if (child.nodeType === Node.TEXT_NODE) {
            var parent_1 = child.parentNode;
            var parentStyle = getComputedStyle(parent_1);
            var contentLength = 0;
            if (parent_1.nodeName === 'CODE' || parent_1.nodeName === 'PRE') {
                contentLength = handlePreText(canvas, parent_1, child.textContent, parentStyle.font);
            }
            else {
                contentLength = measureText(canvas, child.textContent, parentStyle.font);
            }
            var left = parent_1.offsetLeft - container.offsetLeft;
            flowWidths.push(curWidth);
            curWidth += contentLength + left;
            // If the text isn't meant to wrap, we should set that as a hard limit.
            if (parentStyle.whiteSpace === 'nowrap') {
                // + 3 is for date offset plus cursor
                // TODO There should be a programmatic way to get this.
                colWidths.push(parent_1.offsetWidth + 3);
            }
        }
        else {
            // FIXME: doesn't quite work right with spacing
            var style = getComputedStyle(child);
            if (style.minWidth &&
                style.minWidth.endsWith('px') &&
                style.minWidth !== '0px') {
                colWidths.push(unitToNumber(style.minWidth));
            }
            var width = contentWidth(child, container, colWidths, canvas).width;
            if (style.display && style.display.indexOf('inline') > -1) {
                // is inline element, add to curWidth
                curWidth += width;
            }
            else {
                // block element, reset curWidth
                flowWidths.push(curWidth);
                curWidth = width;
            }
        }
    }
    flowWidths.push(curWidth);
    return {
        minWidth: colWidths.reduce(function (oldMax, width) { return Math.max(width, oldMax); }, 0),
        width: flowWidths.reduce(function (oldMax, width) { return Math.max(width, oldMax); }, 0),
    };
}
function contentWidth(elem, container, colWidths, canvas) {
    if (colWidths === void 0) { colWidths = []; }
    if (canvas === void 0) { canvas = document.createElement('canvas'); }
    return calcContentWidth(elem, container || elem, canvas, colWidths);
}
export { contentWidth };
//# sourceMappingURL=contentWidth.js.map