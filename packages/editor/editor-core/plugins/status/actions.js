import * as tslib_1 from "tslib";
import { Fragment } from 'prosemirror-model';
import { NodeSelection, Selection, } from 'prosemirror-state';
import { uuid } from '@atlaskit/adf-schema';
import { pluginKey } from './plugin';
export var DEFAULT_STATUS = {
    text: '',
    color: 'neutral',
};
export var createStatus = function (showStatusPickerAtOffset) {
    if (showStatusPickerAtOffset === void 0) { showStatusPickerAtOffset = -2; }
    return function (insert, state) {
        var statusNode = state.schema.nodes.status.createChecked(tslib_1.__assign({}, DEFAULT_STATUS, { localId: uuid.generate() }));
        var selectedStatus = statusNode.attrs;
        var tr = insert(statusNode);
        var showStatusPickerAt = tr.selection.from + showStatusPickerAtOffset;
        return tr
            .setSelection(NodeSelection.create(tr.doc, showStatusPickerAt))
            .setMeta(pluginKey, {
            showStatusPickerAt: showStatusPickerAt,
            isNew: true,
            selectedStatus: selectedStatus,
        });
    };
};
export var updateStatus = function (status) { return function (editorView) {
    var state = editorView.state, dispatch = editorView.dispatch;
    var schema = state.schema;
    var selectedStatus = null;
    var updatedStatus = status
        ? Object.assign(status, {
            text: status.text.trim(),
            localId: status.localId || uuid.generate(),
        })
        : status;
    var statusProps = tslib_1.__assign({}, DEFAULT_STATUS, updatedStatus);
    var tr = state.tr;
    var showStatusPickerAt = pluginKey.getState(state).showStatusPickerAt;
    if (!showStatusPickerAt) {
        // Same behaviour as quick insert (used in createStatus)
        var statusNode = schema.nodes.status.createChecked(statusProps);
        var fragment = Fragment.fromArray([statusNode, state.schema.text(' ')]);
        var newShowStatusPickerAt = tr.selection.from;
        tr = tr.replaceWith(newShowStatusPickerAt, newShowStatusPickerAt, fragment);
        tr = tr.setSelection(NodeSelection.create(tr.doc, newShowStatusPickerAt));
        tr = tr
            .setMeta(pluginKey, {
            showStatusPickerAt: newShowStatusPickerAt,
            selectedStatus: selectedStatus,
            isNew: true,
        })
            .scrollIntoView();
        dispatch(tr);
        return true;
    }
    if (state.doc.nodeAt(showStatusPickerAt)) {
        tr = tr.setNodeMarkup(showStatusPickerAt, schema.nodes.status, statusProps);
        tr = tr.setSelection(NodeSelection.create(tr.doc, showStatusPickerAt));
        tr = tr
            .setMeta(pluginKey, { showStatusPickerAt: showStatusPickerAt, selectedStatus: selectedStatus })
            .scrollIntoView();
        dispatch(tr);
        return true;
    }
    return false;
}; };
export var setStatusPickerAt = function (showStatusPickerAt) { return function (state, dispatch) {
    dispatch(state.tr.setMeta(pluginKey, {
        showStatusPickerAt: showStatusPickerAt,
        isNew: false,
        selectedStatus: null,
    }));
    return true;
}; };
export var commitStatusPicker = function () { return function (editorView) {
    var state = editorView.state, dispatch = editorView.dispatch;
    var showStatusPickerAt = pluginKey.getState(state).showStatusPickerAt;
    if (!showStatusPickerAt) {
        return;
    }
    var statusNode = state.tr.doc.nodeAt(showStatusPickerAt);
    if (!statusNode) {
        return;
    }
    var tr = state.tr;
    tr = tr.setMeta(pluginKey, {
        showStatusPickerAt: null,
        isNew: false,
        selectedStatus: null,
    });
    if (statusNode.attrs.text) {
        // still has content - keep content, move selection after status
        tr = tr.setSelection(Selection.near(state.tr.doc.resolve(showStatusPickerAt + 2)));
    }
    else {
        // no content - remove node
        tr = tr.delete(showStatusPickerAt, showStatusPickerAt + 1);
    }
    dispatch(tr);
    editorView.focus();
}; };
//# sourceMappingURL=actions.js.map