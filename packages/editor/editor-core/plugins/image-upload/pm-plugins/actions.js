import { stateKey } from './main';
var imageUploadAction = function (tr, action) {
    return tr.setMeta(stateKey, action);
};
export var startUpload = function (event) { return function (tr) {
    return imageUploadAction(tr, {
        name: 'START_UPLOAD',
        event: event,
    });
}; };
//# sourceMappingURL=actions.js.map