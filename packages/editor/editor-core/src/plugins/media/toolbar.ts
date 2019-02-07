import { InjectedIntl, defineMessages } from 'react-intl';
import { EditorState, NodeSelection } from 'prosemirror-state';
import { removeSelectedNode, hasParentNodeOfType } from 'prosemirror-utils';

import WrapLeftIcon from '@atlaskit/icon/glyph/editor/media-wrap-left';
import WrapRightIcon from '@atlaskit/icon/glyph/editor/media-wrap-right';
import WideIcon from '@atlaskit/icon/glyph/editor/media-wide';
import FullWidthIcon from '@atlaskit/icon/glyph/editor/media-full-width';
import RemoveIcon from '@atlaskit/icon/glyph/editor/remove';
import EditorAlignImageLeft from '@atlaskit/icon/glyph/editor/align-image-left';
import EditorAlignImageRight from '@atlaskit/icon/glyph/editor/align-image-right';
import EditorAlignImageCenter from '@atlaskit/icon/glyph/editor/align-image-center';

import commonMessages from '../../messages';
import { Command, EditorAppearance } from '../../../src/types';
import {
  FloatingToolbarConfig,
  FloatingToolbarItem,
} from '../../../src/plugins/floating-toolbar/types';
import { stateKey, MediaPluginState } from './pm-plugins/main';
import { MediaSingleLayout } from '@atlaskit/adf-schema';
import { Schema } from 'prosemirror-model';

export type IconMap = Array<
  { value: string; icon: React.ComponentClass<any> } | { value: 'separator' }
>;

export const messages = defineMessages({
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
});

const alignmentIcons: IconMap = [
  { value: 'align-start', icon: EditorAlignImageLeft },
  { value: 'center', icon: EditorAlignImageCenter },
  { value: 'align-end', icon: EditorAlignImageRight },
];

const wrappingIcons: IconMap = [
  { value: 'wrap-left', icon: WrapLeftIcon },
  { value: 'wrap-right', icon: WrapRightIcon },
];

const breakoutIcons: IconMap = [
  { value: 'separator' },
  { value: 'wide', icon: WideIcon },
  { value: 'full-width', icon: FullWidthIcon },
];

const layoutToMessages = {
  'wrap-left': messages.wrapLeft,
  center: commonMessages.alignImageCenter,
  'wrap-right': messages.wrapRight,
  wide: commonMessages.layoutWide,
  'full-width': commonMessages.layoutFullWidth,
  'align-end': commonMessages.alignImageRight,
  'align-start': commonMessages.alignImageLeft,
};

const remove: Command = (state, dispatch) => {
  if (dispatch) {
    dispatch(removeSelectedNode(state.tr));
  }
  // analyticsService.trackEvent('atlassian.editor.format.card.delete.button');
  return true;
};

const mapIconsToToolbarItem = (icons, selectedNode, intl, pluginState) =>
  icons.map(
    (layout): FloatingToolbarItem<Command> => {
      const { value } = layout;

      return {
        type: 'button',
        icon: layout.icon,
        title: intl.formatMessage(layoutToMessages[value]),
        selected: selectedNode.attrs.layout === value,
        onClick: () => {
          pluginState.align(value as MediaSingleLayout);
          return true;
        },
      };
    },
  );

const isLayoutSupported = (selection: NodeSelection, schema: Schema) =>
  !hasParentNodeOfType(schema.nodes.bodiedExtension)(selection) &&
  !hasParentNodeOfType(schema.nodes.layoutSection)(selection);

const buildLayoutButtons = (
  state: EditorState,
  intl: InjectedIntl,
  pluginState: MediaPluginState,
  allowResizing?: boolean,
) => {
  const { selection } = state;
  const { mediaSingle } = state.schema.nodes;

  if (
    !(selection instanceof NodeSelection) ||
    !selection.node ||
    !mediaSingle ||
    !pluginState ||
    !isLayoutSupported(selection, state.schema)
  ) {
    return [];
  }

  let toolbarItems = [
    ...mapIconsToToolbarItem(alignmentIcons, selection.node, intl, pluginState),
    { type: 'separator' },
    ...mapIconsToToolbarItem(wrappingIcons, selection.node, intl, pluginState),
  ];

  if (!allowResizing) {
    toolbarItems = toolbarItems.concat(
      mapIconsToToolbarItem(breakoutIcons, selection.node, intl, pluginState),
    );
  }

  return toolbarItems;
};

export const floatingToolbar = (
  state: EditorState,
  intl: InjectedIntl,
  allowResizing?: boolean,
  appearance?: EditorAppearance,
): FloatingToolbarConfig | undefined => {
  const { mediaSingle } = state.schema.nodes;
  const pluginState: MediaPluginState | undefined = stateKey.getState(state);

  if (!mediaSingle || !pluginState) {
    return;
  }

  let layoutButtons: FloatingToolbarItem<Command>[] = [];
  if (appearance === 'full-page') {
    layoutButtons = buildLayoutButtons(state, intl, pluginState, allowResizing);
    if (layoutButtons) {
      layoutButtons.push({ type: 'separator' });
    }
  }

  return {
    title: 'Media floating controls',
    nodeType: mediaSingle,
    getDomRef: () => pluginState.element,
    items: [
      ...layoutButtons,
      {
        type: 'button',
        appearance: 'danger',
        icon: RemoveIcon,
        title: intl.formatMessage(commonMessages.remove),
        onClick: remove,
      },
    ],
  };
};
