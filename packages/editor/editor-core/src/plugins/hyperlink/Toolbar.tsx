import * as React from 'react';
import { defineMessages } from 'react-intl';
import {
  FloatingToolbarHandler,
  FloatingToolbarItem,
  AlignType,
} from '../floating-toolbar/types';
import OpenIcon from '@atlaskit/icon/glyph/editor/open';
import UnlinkIcon from '@atlaskit/icon/glyph/editor/unlink';
import { stateKey, HyperlinkState } from './pm-plugins/main';
import {
  removeLink,
  setLinkText,
  setLinkHref,
  insertLink,
  hideLinkToolbar,
} from './commands';
import { normalizeUrl } from './utils';
import RecentList from './ui/RecentSearch';
import { Command } from '../../types';
import { EditorView } from 'prosemirror-view';

export const messages = defineMessages({
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

const showTextToolbar = (text, pos): Array<FloatingToolbarItem<Command>> => {
  return [
    {
      type: 'input',
      onSubmit: text => setLinkText(pos, text),
      placeholder: 'Text to display',
      onBlur: text => setLinkText(pos, text),
    },
  ];
};

const showLinkEditToolbar = (
  link,
  pos,
): Array<FloatingToolbarItem<Command>> => {
  return [
    {
      type: 'input',
      onSubmit: link => setLinkHref(pos, link),
      placeholder: 'Setup link here',
      defaultValue: link || '',
      onBlur: link => setLinkHref(pos, link),
    },
  ];
};

const getToolbarToShow = (link, text, pos) => {
  const isLinkTextTheSameAsTheLinkUrl = link === normalizeUrl(text);

  return isLinkTextTheSameAsTheLinkUrl
    ? showTextToolbar(text, pos)
    : showLinkEditToolbar(link, pos);
};

export const getToolbarConfig: FloatingToolbarHandler = (
  state,
  { formatMessage },
  providerFactory,
) => {
  const linkState: HyperlinkState | undefined = stateKey.getState(state);

  if (linkState && linkState.activeLinkMark) {
    const { activeLinkMark } = linkState;

    const hyperLinkToolbar = {
      title: 'Hyperlink floating controls',
      nodeType: state.schema.nodes.paragraph,
      align: 'left' as AlignType,
      className:
        activeLinkMark.type === 'INSERT' ? 'hyperlink-floating-toolbar' : '',
    };

    switch (activeLinkMark.type) {
      case 'EDIT': {
        const { pos, node } = activeLinkMark;
        const linkMark = node.marks.filter(
          mark => mark.type === state.schema.marks.link,
        );
        const link = linkMark[0] && linkMark[0].attrs.href;
        const text = node.text;

        const labelOpenLink = formatMessage(messages.openLink);
        const labelUnlink = formatMessage(messages.unlink);

        return {
          ...hyperLinkToolbar,
          height: 32,
          width: 250,
          items: [
            ...getToolbarToShow(link, text, pos),
            {
              type: 'separator',
            },
            {
              type: 'button',
              icon: OpenIcon,
              target: '_blank',
              href: link,
              onClick: () => true,
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
          ],
        };
      }

      case 'INSERT': {
        const { from, to } = activeLinkMark;
        return {
          ...hyperLinkToolbar,
          height: 360,
          width: 420,
          items: [
            {
              type: 'custom',
              render: (
                view?: EditorView,
                idx?: number,
              ):
                | React.ComponentClass
                | React.SFC
                | React.ReactElement<any>
                | null => {
                if (!view) {
                  return null;
                }
                return (
                  <RecentList
                    key={idx}
                    providerFactory={providerFactory}
                    onSubmit={(href, text) => {
                      insertLink(from, to, href, text)(
                        view.state,
                        view.dispatch,
                      );
                      view.focus();
                    }}
                    onBlur={() => hideLinkToolbar()(view.state, view.dispatch)}
                  />
                );
              },
            },
          ],
        };
      }
    }
  }
};
