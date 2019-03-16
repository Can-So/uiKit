import * as React from 'react';
import AttachmentIcon from '@atlaskit/icon/glyph/editor/attachment';
import { withAnalytics } from '../../../../analytics';
import ToolbarButton from '../../../../ui/ToolbarButton';
import WithPluginState from '../../../../ui/WithPluginState';
var onClickMediaButton = function (pluginState) {
    return withAnalytics('atlassian.editor.media.button', function () {
        pluginState.showMediaPicker();
        return true;
    });
};
var ToolbarMedia = function (_a) {
    var editorView = _a.editorView, eventDispatcher = _a.eventDispatcher, pluginKey = _a.pluginKey, isDisabled = _a.isDisabled, isReducedSpacing = _a.isReducedSpacing;
    return (React.createElement(WithPluginState, { editorView: editorView, eventDispatcher: eventDispatcher, plugins: {
            mediaPlugin: pluginKey,
        }, render: function (_a) {
            var mediaPlugin = _a.mediaPlugin;
            if (!mediaPlugin.allowsUploads) {
                return null;
            }
            return (React.createElement(ToolbarButton, { onClick: onClickMediaButton(mediaPlugin), disabled: isDisabled, title: "Files & images", spacing: isReducedSpacing ? 'none' : 'default', iconBefore: React.createElement(AttachmentIcon, { label: "Files & images" }) }));
        } }));
};
export default ToolbarMedia;
//# sourceMappingURL=index.js.map