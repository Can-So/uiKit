import colorNameMapping from './color-name-mapping';
var COLOR_TYPE_REGEX = {
    hexShort: /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
    hexLong: /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
    rgb: /^#?rgb\((\d+),\s*(\d+),\s*(\d+)\)$/,
    prgb: /^#?rgb\((\d+)%,\s*(\d+)%,\s*(\d+)%\)$/,
};
var PANEL_TYPE_TO_RGB = {
    info: { r: 222, g: 235, b: 255 },
    note: { r: 234, g: 230, b: 255 },
    success: { r: 227, g: 252, b: 239 },
    warning: { r: 255, g: 250, b: 230 },
    error: { r: 255, g: 235, b: 230 },
};
export function getPanelType(attrs) {
    var rgb = generateRgb(attrs.bgColor);
    if (!rgb) {
        return 'info';
    }
    var mapTo = 'info';
    var smallestDistance = Infinity;
    Object.keys(PANEL_TYPE_TO_RGB).forEach(function (panelType) {
        var distance = distanceOfRgb(PANEL_TYPE_TO_RGB[panelType], rgb);
        if (distance < smallestDistance) {
            smallestDistance = distance;
            mapTo = panelType;
        }
    });
    return mapTo;
}
function distanceOfRgb(a, b) {
    // https://en.wikipedia.org/wiki/Color_difference
    return (Math.pow(a.r - b.r, 2) + Math.pow(a.g - b.g, 2) + Math.pow(a.b - b.b, 2));
}
function generateRgb(color) {
    switch (true) {
        case COLOR_TYPE_REGEX.hexShort.test(color) ||
            COLOR_TYPE_REGEX.hexLong.test(color):
            return parseHex(color);
        case COLOR_TYPE_REGEX.rgb.test(color):
            return parseRgb(color);
        case COLOR_TYPE_REGEX.prgb.test(color):
            return parsePrgb(color);
        default:
            return parseColorName(color);
    }
}
function parseHex(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    hex = hex.replace(COLOR_TYPE_REGEX.hexShort, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });
    var result = COLOR_TYPE_REGEX.hexLong.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
}
function parseRgb(rgb) {
    var result = rgb.match(COLOR_TYPE_REGEX.rgb);
    return result
        ? {
            r: parseInt(result[1], 10),
            g: parseInt(result[2], 10),
            b: parseInt(result[3], 10),
        }
        : null;
}
function parsePrgb(prgb) {
    var result = prgb.match(COLOR_TYPE_REGEX.prgb);
    return result
        ? {
            r: Math.floor((255 * parseInt(result[1], 10)) / 100),
            g: Math.floor((255 * parseInt(result[2], 10)) / 100),
            b: Math.floor((255 * parseInt(result[4], 10)) / 100),
        }
        : null;
}
function parseColorName(color) {
    return colorNameMapping[color];
}
//# sourceMappingURL=panel-type.js.map