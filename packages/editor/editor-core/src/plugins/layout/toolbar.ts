import { defineMessages, InjectedIntl } from 'react-intl';
import { EditorState } from 'prosemirror-state';
import { findDomRefAtPos } from 'prosemirror-utils';
import LayoutTwoEqualIcon from '@atlaskit/icon/glyph/editor/layout-two-equal';
import LayoutThreeEqualIcon from '@atlaskit/icon/glyph/editor/layout-three-equal';
import RemoveIcon from '@atlaskit/icon/glyph/editor/remove';

import commonMessages from '../../messages';
import { MessageDescriptor } from '../../types/i18n';
import { Command } from '../../../src/types';
import {
  FloatingToolbarConfig,
  FloatingToolbarItem,
  FloatingToolbarSeparator,
  FloatingToolbarButton,
  Icon,
} from '../../../src/plugins/floating-toolbar/types';
import {
  setPresetLayout,
  deleteActiveLayoutNode,
  getPresetLayout,
  PresetLayout,
} from './actions';
import { createBreakoutToolbarItems } from '../breakout/utils/create-breakout-toolbar-items';

export const messages = defineMessages({
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

type PresetLayoutButtonItem = {
  type: PresetLayout;
  title: MessageDescriptor;
  icon: Icon;
};

const LAYOUT_TYPES: PresetLayoutButtonItem[] = [
  { type: 'two_equal', title: messages.twoColumns, icon: LayoutTwoEqualIcon },
  {
    type: 'three_equal',
    title: messages.threeColumns,
    icon: LayoutThreeEqualIcon,
  },
];

const buildLayoutButton = (
  intl: InjectedIntl,
  item: PresetLayoutButtonItem,
  currentLayout: string | undefined,
): FloatingToolbarItem<Command> => ({
  type: 'button',
  icon: item.icon,
  title: intl.formatMessage(item.title),
  onClick: setPresetLayout(item.type),
  selected: !!currentLayout && currentLayout === item.type,
});

export const buildToolbar = (
  state: EditorState,
  intl: InjectedIntl,
  pos: number,
  allowBreakout: boolean,
): FloatingToolbarConfig | undefined => {
  const node = state.doc.nodeAt(pos);
  if (node) {
    const currentLayout = getPresetLayout(node);

    const breakoutToolbar = allowBreakout
      ? createBreakoutToolbarItems(state, {
          formatMessage: intl.formatMessage,
        })
      : null;

    const separator: FloatingToolbarSeparator = {
      type: 'separator',
    };

    const deleteButton: FloatingToolbarButton<Command> = {
      type: 'button',
      appearance: 'danger',
      icon: RemoveIcon,
      title: intl.formatMessage(commonMessages.remove),
      onClick: deleteActiveLayoutNode,
    };

    return {
      title: 'Columns floating controls',
      getDomRef: view =>
        findDomRefAtPos(pos, view.domAtPos.bind(view)) as HTMLElement,
      nodeType: state.schema.nodes.layoutSection,
      items: [
        ...LAYOUT_TYPES.map(i => buildLayoutButton(intl, i, currentLayout)),
        ...(breakoutToolbar ? [separator, ...breakoutToolbar] : []),
        separator,
        deleteButton,
      ],
    };
  }
};
