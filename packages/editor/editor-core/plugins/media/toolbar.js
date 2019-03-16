import * as tslib_1 from "tslib";
import * as React from 'react';
import { defineMessages } from 'react-intl';
import { NodeSelection } from 'prosemirror-state';
import { removeSelectedNode, hasParentNodeOfType } from 'prosemirror-utils';
import WrapLeftIcon from '@findable/icon/glyph/editor/media-wrap-left';
import WrapRightIcon from '@findable/icon/glyph/editor/media-wrap-right';
import WideIcon from '@findable/icon/glyph/editor/media-wide';
import FullWidthIcon from '@findable/icon/glyph/editor/media-full-width';
import RemoveIcon from '@findable/icon/glyph/editor/remove';
import EditorAlignImageLeft from '@findable/icon/glyph/editor/align-image-left';
import EditorAlignImageRight from '@findable/icon/glyph/editor/align-image-right';
import EditorAlignImageCenter from '@findable/icon/glyph/editor/align-image-center';
import AnnotateIcon from '@findable/icon/glyph/media-services/annotate';
import commonMessages from '../../messages';
import { stateKey } from './pm-plugins/main';
import Button from '../floating-toolbar/ui/Button';
import Separator from '../floating-toolbar/ui/Separator';
export var messages = defineMessages({
    wrapLeft: {
        id: 'fabric.editor.wrapLeft',
        defaultMessage: 'Wrap left',
        description: 'Aligns your image to the left and wraps text around it.',
    },
    wrapRight: {
        id: 'fabric.editor.wrapRight',
        defaultMessage: 'Wrap right',
        description: 'Aligns your image to the right and wraps text around it.',
    },
    annotate: {
        id: 'fabric.editor.annotate',
        defaultMessage: 'Annotate',
        description: 'Annotate an image by drawing arrows, adding text, or scribbles.',
    },
});
var alignmentIcons = [
    { value: 'align-start', icon: EditorAlignImageLeft },
    { value: 'center', icon: EditorAlignImageCenter },
    { value: 'align-end', icon: EditorAlignImageRight },
];
var wrappingIcons = [
    { value: 'wrap-left', icon: WrapLeftIcon },
    { value: 'wrap-right', icon: WrapRightIcon },
];
var breakoutIcons = [
    { value: 'wide', icon: WideIcon },
    { value: 'full-width', icon: FullWidthIcon },
];
var layoutToMessages = {
    'wrap-left': messages.wrapLeft,
    center: commonMessages.alignImageCenter,
    'wrap-right': messages.wrapRight,
    wide: commonMessages.layoutWide,
    'full-width': commonMessages.layoutFullWidth,
    'align-end': commonMessages.alignImageRight,
    'align-start': commonMessages.alignImageLeft,
};
var annotate = function (state) {
    var pluginState = stateKey.getState(state);
    if (!pluginState) {
        return false;
    }
    pluginState.openMediaEditor();
    return true;
};
var remove = function (state, dispatch) {
    if (dispatch) {
        dispatch(removeSelectedNode(state.tr));
    }
    return true;
};
var makeAlign = function (layout) {
    return function (state) {
        var pluginState = stateKey.getState(state);
        if (!pluginState) {
            return false;
        }
        return pluginState.align(layout);
    };
};
var mapIconsToToolbarItem = function (icons, layout, intl) {
    return icons.map(function (toolbarItem) {
        var value = toolbarItem.value;
        return {
            type: 'button',
            icon: toolbarItem.icon,
            title: intl.formatMessage(layoutToMessages[value]),
            selected: layout === value,
            onClick: makeAlign(value),
        };
    });
};
var shouldHideToolbar = function (selection, _a) {
    var nodes = _a.nodes;
    return hasParentNodeOfType(nodes.bodiedExtension)(selection) ||
        hasParentNodeOfType(nodes.layoutSection)(selection) ||
        hasParentNodeOfType(nodes.listItem)(selection) ||
        hasParentNodeOfType(nodes.table)(selection);
};
var buildLayoutButtons = function (state, intl, allowResizing) {
    var selection = state.selection;
    var mediaSingle = state.schema.nodes.mediaSingle;
    if (!(selection instanceof NodeSelection) ||
        !selection.node ||
        !mediaSingle ||
        shouldHideToolbar(selection, state.schema)) {
        return [];
    }
    var layout = selection.node.attrs.layout;
    var toolbarItems = tslib_1.__spread(mapIconsToToolbarItem(alignmentIcons, layout, intl), [
        { type: 'separator' }
    ], mapIconsToToolbarItem(wrappingIcons, layout, intl));
    if (!allowResizing) {
        toolbarItems = toolbarItems.concat(tslib_1.__spread([
            { type: 'separator' }
        ], mapIconsToToolbarItem(breakoutIcons, layout, intl)));
    }
    return toolbarItems;
};
var AnnotationToolbar = /** @class */ (function (_super) {
    tslib_1.__extends(AnnotationToolbar, _super);
    function AnnotationToolbar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isImage: false,
        };
        _this.onClickAnnotation = function () {
            var view = _this.props.view;
            if (view) {
                annotate(view.state, view.dispatch);
            }
        };
        return _this;
    }
    AnnotationToolbar.prototype.componentDidMount = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.checkIsImage();
                return [2 /*return*/];
            });
        });
    };
    AnnotationToolbar.prototype.checkIsImage = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var state;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.props.viewContext.file.getCurrentState(this.props.id)];
                    case 1:
                        state = _a.sent();
                        if (state && state.status !== 'error' && state.mediaType === 'image') {
                            this.setState({
                                isImage: true,
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AnnotationToolbar.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        if (prevProps.id !== this.props.id) {
            this.setState({ isImage: false }, function () {
                _this.checkIsImage();
            });
        }
    };
    AnnotationToolbar.prototype.render = function () {
        if (!this.state.isImage) {
            return null;
        }
        var intl = this.props.intl;
        var title = intl.formatMessage(messages.annotate);
        return (React.createElement(React.Fragment, null,
            React.createElement(Separator, null),
            React.createElement(Button, { title: title, icon: React.createElement(AnnotateIcon, { label: title }), onClick: this.onClickAnnotation })));
    };
    return AnnotationToolbar;
}(React.Component));
var renderAnnotationButton = function (pluginState, intl) {
    return function (view, idx) {
        var selectedContainer = pluginState.selectedMediaContainerNode();
        if (!selectedContainer) {
            return null;
        }
        return (React.createElement(AnnotationToolbar, { key: idx, viewContext: pluginState.mediaContext, id: selectedContainer.firstChild.attrs.id, view: view, intl: intl }));
    };
};
export var floatingToolbar = function (state, intl, allowResizing, allowAnnotation, appearance) {
    var mediaSingle = state.schema.nodes.mediaSingle;
    var pluginState = stateKey.getState(state);
    if (!mediaSingle || !pluginState) {
        return;
    }
    var layoutButtons = [];
    if (appearance === 'full-page') {
        layoutButtons = buildLayoutButtons(state, intl, allowResizing);
        if (layoutButtons.length) {
            if (allowAnnotation) {
                layoutButtons.push({
                    type: 'custom',
                    render: renderAnnotationButton(pluginState, intl),
                });
            }
            layoutButtons.push({ type: 'separator' });
        }
    }
    return {
        title: 'Media floating controls',
        nodeType: mediaSingle,
        getDomRef: function () { return pluginState.element; },
        items: tslib_1.__spread(layoutButtons, [
            {
                type: 'button',
                appearance: 'danger',
                icon: RemoveIcon,
                title: intl.formatMessage(commonMessages.remove),
                onClick: remove,
            },
        ]),
    };
};
//# sourceMappingURL=toolbar.js.map