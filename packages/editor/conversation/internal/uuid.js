// tslint:disable:no-bitwise
export var generateUuid = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0;
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
};
var staticValue = false;
export var uuid = {
    setStatic: function (value) {
        staticValue = value;
    },
    generate: function () {
        return staticValue || generateUuid();
    },
};
//# sourceMappingURL=uuid.js.map