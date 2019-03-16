import memoizeOne from 'memoize-one';
export var getPopupProps = memoizeOne(function (width, target, onFlip, popupTitle) { return ({
    searchThreshold: -1,
    controlShouldRenderValue: true,
    minMenuWidth: width,
    maxMenuWidth: width,
    autoFocus: false,
    target: target,
    popupTitle: popupTitle,
    popperProps: {
        modifiers: {
            handleFlipStyle: {
                enabled: true,
                order: 910,
                fn: function (data) { return onFlip(data); },
            },
            preventOverflow: {
                boundariesElement: 'viewport',
            },
        },
    },
}); });
//# sourceMappingURL=popup.js.map