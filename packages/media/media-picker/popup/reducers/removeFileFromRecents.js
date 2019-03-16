import * as tslib_1 from "tslib";
import { isRemoveFileFromRecentsAction } from '../actions/removeFileFromRecents';
export default function removeFileFromRecents(state, action) {
    if (!isRemoveFileFromRecentsAction(action)) {
        return state;
    }
    var selectedItems = state.selectedItems.filter(function (item) { return item.id !== action.id; });
    var uploads = Object.keys(state.uploads)
        .filter(function (uploadId) { return state.uploads[uploadId].file.metadata.id !== action.id; })
        .reduce(function (uploadObject, uploadId) {
        var _a;
        return (tslib_1.__assign({}, uploadObject, (_a = {}, _a[uploadId] = state.uploads[uploadId], _a)));
    }, {});
    return tslib_1.__assign({}, state, { selectedItems: selectedItems,
        uploads: uploads });
}
//# sourceMappingURL=removeFileFromRecents.js.map