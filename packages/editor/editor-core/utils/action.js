import * as tslib_1 from "tslib";
import { stateKey as mediaStateKey, } from '../plugins/media/pm-plugins/main';
export function getEditorValueWithMedia(editorView) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var state, mediaPluginState;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!editorView) {
                        return [2 /*return*/];
                    }
                    state = editorView.state;
                    mediaPluginState = state && mediaStateKey.getState(state);
                    if (!(mediaPluginState && mediaPluginState.waitForMediaUpload)) return [3 /*break*/, 2];
                    return [4 /*yield*/, mediaPluginState.waitForPendingTasks()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/, editorView.state.doc];
            }
        });
    });
}
export function insertFileFromDataUrl(editorState, url, fileName) {
    if (!editorState) {
        return;
    }
    var mediaPluginState = mediaStateKey.getState(editorState);
    mediaPluginState.insertFileFromDataUrl(url, fileName);
}
//# sourceMappingURL=action.js.map