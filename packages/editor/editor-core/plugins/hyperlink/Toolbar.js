import * as tslib_1 from "tslib";
import * as React from 'react';
import { defineMessages } from 'react-intl';
import OpenIcon from '@findable/icon/glyph/editor/open';
import UnlinkIcon from '@findable/icon/glyph/editor/unlink';
import { stateKey } from './pm-plugins/main';
import { removeLink, setLinkText, setLinkHref, insertLink, hideLinkToolbar, } from './commands';
import { normalizeUrl } from './utils';
import RecentList from './ui/RecentSearch';
export var messages = defineMessages({
    openLink: {
        id: 'fabric.editor.openLink',
        defaultMessage: 'Open link',
        description: 'Follows the hyperlink.',
    },
    unlink: {
        id: 'fabric.editor.unlink',
        defaultMessage: 'Unlink',
        description: 'Removes the hyperlink but keeps your text.',
    },
});
var showTextToolbar = function (text, pos) {
    return [
        {
            type: 'input',
            onSubmit: function (text) { return setLinkText(text, pos); },
            placeholder: 'Text to display',
            onBlur: function (text) { return setLinkText(text, pos); },
        },
    ];
};
var showLinkEditToolbar = function (link, pos) {
    return [
        {
            type: 'input',
            onSubmit: function (link) { return setLinkHref(link, pos); },
            placeholder: 'Setup link here',
            defaultValue: link || '',
            onBlur: function (link) { return setLinkHref(link, pos); },
        },
    ];
};
var getToolbarToShow = function (link, text, pos) {
    var isLinkTextTheSameAsTheLinkUrl = link === normalizeUrl(text);
    return isLinkTextTheSameAsTheLinkUrl
        ? showTextToolbar(text || '', pos)
        : showLinkEditToolbar(link, pos);
};
export var getToolbarConfig = function (state, _a, providerFactory) {
    var formatMessage = _a.formatMessage;
    var linkState = stateKey.getState(state);
    if (linkState && linkState.activeLinkMark) {
        var activeLinkMark = linkState.activeLinkMark;
        var hyperLinkToolbar = {
            title: 'Hyperlink floating controls',
            nodeType: state.schema.nodes.paragraph,
            align: 'left',
            className: activeLinkMark.type === 'INSERT' ? 'hyperlink-floating-toolbar' : '',
        };
        switch (activeLinkMark.type) {
            case 'EDIT': {
                var pos = activeLinkMark.pos, node = activeLinkMark.node;
                var linkMark = node.marks.filter(function (mark) { return mark.type === state.schema.marks.link; });
                var link = linkMark[0] && linkMark[0].attrs.href;
                var text = node.text;
                var labelOpenLink = formatMessage(messages.openLink);
                var labelUnlink = formatMessage(messages.unlink);
                return tslib_1.__assign({}, hyperLinkToolbar, { height: 32, width: 250, items: tslib_1.__spread(getToolbarToShow(link, text, pos), [
                        {
                            type: 'separator',
                        },
                        {
                            type: 'button',
                            icon: OpenIcon,
                            target: '_blank',
                            href: link,
                            onClick: function () { return true; },
                            selected: false,
                            title: labelOpenLink,
                        },
                        {
                            type: 'button',
                            icon: UnlinkIcon,
                            onClick: removeLink(pos),
                            selected: false,
                            title: labelUnlink,
                        },
                    ]) });
            }
            case 'INSERT': {
                var from_1 = activeLinkMark.from, to_1 = activeLinkMark.to;
                return tslib_1.__assign({}, hyperLinkToolbar, { height: 360, width: 420, items: [
                        {
                            type: 'custom',
                            render: function (view, idx) {
                                if (!view) {
                                    return null;
                                }
                                return (React.createElement(RecentList, { key: idx, providerFactory: providerFactory, onSubmit: function (href, text) {
                                        insertLink(from_1, to_1, href, text)(view.state, view.dispatch);
                                        view.focus();
                                    }, onBlur: function () { return hideLinkToolbar()(view.state, view.dispatch); } }));
                            },
                        },
                    ] });
            }
        }
    }
};
//# sourceMappingURL=Toolbar.js.map