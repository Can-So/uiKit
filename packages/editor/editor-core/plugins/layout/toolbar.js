import * as tslib_1 from "tslib";
import { defineMessages } from 'react-intl';
import { findDomRefAtPos } from 'prosemirror-utils';
import LayoutTwoEqualIcon from '@atlaskit/icon/glyph/editor/layout-two-equal';
import LayoutThreeEqualIcon from '@atlaskit/icon/glyph/editor/layout-three-equal';
import RemoveIcon from '@atlaskit/icon/glyph/editor/remove';
import commonMessages from '../../messages';
import { setPresetLayout, deleteActiveLayoutNode, getPresetLayout, } from './actions';
export var messages = defineMessages({
    twoColumns: {
        id: 'fabric.editor.twoColumns',
        defaultMessage: 'Two columns',
        description: '',
    },
    threeColumns: {
        id: 'fabric.editor.threeColumns',
        defaultMessage: 'Three columns',
        description: '',
    },
});
var LAYOUT_TYPES = [
    { type: 'two_equal', title: messages.twoColumns, icon: LayoutTwoEqualIcon },
    {
        type: 'three_equal',
        title: messages.threeColumns,
        icon: LayoutThreeEqualIcon,
    },
];
var buildLayoutButton = function (intl, item, currentLayout) { return ({
    type: 'button',
    icon: item.icon,
    title: intl.formatMessage(item.title),
    onClick: setPresetLayout(item.type),
    selected: !!currentLayout && currentLayout === item.type,
}); };
export var buildToolbar = function (state, intl, pos, allowBreakout) {
    var node = state.doc.nodeAt(pos);
    if (node) {
        var currentLayout_1 = getPresetLayout(node);
        var separator = {
            type: 'separator',
        };
        var deleteButton = {
            type: 'button',
            appearance: 'danger',
            icon: RemoveIcon,
            title: intl.formatMessage(commonMessages.remove),
            onClick: deleteActiveLayoutNode,
        };
        return {
            title: 'Columns floating controls',
            getDomRef: function (view) {
                return findDomRefAtPos(pos, view.domAtPos.bind(view));
            },
            nodeType: state.schema.nodes.layoutSection,
            items: tslib_1.__spread(LAYOUT_TYPES.map(function (i) { return buildLayoutButton(intl, i, currentLayout_1); }), [
                separator,
                deleteButton,
            ]),
        };
    }
};
//# sourceMappingURL=toolbar.js.map