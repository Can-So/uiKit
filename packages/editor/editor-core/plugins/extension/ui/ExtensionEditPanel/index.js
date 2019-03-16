import * as React from 'react';
import { Popup } from '@atlaskit/editor-common';
import RemoveIcon from '@atlaskit/icon/glyph/editor/remove';
import EditIcon from '@atlaskit/icon/glyph/editor/edit';
import FullWidthIcon from '@atlaskit/icon/glyph/editor/media-full-width';
import WideIcon from '@atlaskit/icon/glyph/editor/media-wide';
import CenterIcon from '@atlaskit/icon/glyph/editor/media-center';
import ToolbarButton from '../../../../ui/ToolbarButton';
import { Toolbar, Separator } from './styles';
var extensionIcons = [
    {
        key: 'default',
        icon: CenterIcon,
        label: 'Centered',
    },
    {
        key: 'wide',
        icon: WideIcon,
        label: 'Wide',
    },
    {
        key: 'full-width',
        icon: FullWidthIcon,
        label: 'Full width',
    },
];
export default function ExtensionEditPanel(props) {
    var _this = this;
    var element = props.element, stickToolbarToBottom = props.stickToolbarToBottom, layout = props.layout, showLayoutOptions = props.showLayoutOptions;
    if (!element) {
        return null;
    }
    return (React.createElement(Popup, { target: element, offset: [0, 8], alignX: "right", stick: stickToolbarToBottom, ariaLabel: "Extension options" },
        React.createElement(Toolbar, null,
            React.createElement(ToolbarButton, { onClick: props.onEdit, iconBefore: React.createElement(EditIcon, { label: "Edit extension" }) }),
            showLayoutOptions &&
                extensionIcons.map(function (toolbarLayoutOption, value) {
                    var Icon = toolbarLayoutOption.icon, key = toolbarLayoutOption.key, label = toolbarLayoutOption.label;
                    return (React.createElement(ToolbarButton, { onClick: props.onLayoutChange.bind(_this, key), iconBefore: React.createElement(Icon, { label: label }), selected: layout === key, key: key }));
                }),
            React.createElement(Separator, null),
            React.createElement(ToolbarButton, { onClick: props.onRemove, iconBefore: React.createElement(RemoveIcon, { label: "Remove extension" }) }))));
}
//# sourceMappingURL=index.js.map