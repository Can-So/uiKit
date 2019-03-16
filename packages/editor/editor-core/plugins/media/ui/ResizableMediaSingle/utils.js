export var snapTo = function (target, points) {
    return points.reduce(function (point, closest) {
        return Math.abs(closest - target) < Math.abs(point - target)
            ? closest
            : point;
    });
};
export var handleSides = ['left', 'right'];
export var alignmentLayouts = [
    'align-start',
    'align-end',
    'wrap-left',
    'wrap-right',
];
export var imageAlignmentMap = {
    left: 'start',
    right: 'end',
};
//# sourceMappingURL=utils.js.map