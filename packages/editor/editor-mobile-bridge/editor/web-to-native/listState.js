var ListState = /** @class */ (function () {
    function ListState() {
    }
    return ListState;
}());
export { ListState };
export function valueOf(state) {
    var states = [
        {
            name: 'bullet',
            active: state.bulletListActive,
            enabled: !state.bulletListDisabled,
        },
        {
            name: 'ordered',
            active: state.orderedListActive,
            enabled: !state.orderedListDisabled,
        },
    ];
    return states;
}
//# sourceMappingURL=listState.js.map