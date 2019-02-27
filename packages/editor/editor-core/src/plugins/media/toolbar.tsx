import * as React from 'react';
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
import AnnotateIcon from '@atlaskit/icon/glyph/media-services/annotate';

import commonMessages from '../../messages';
import { Command, EditorAppearance } from '../../../src/types';
import {
  FloatingToolbarConfig,
  FloatingToolbarItem,
} from '../../../src/plugins/floating-toolbar/types';
import { stateKey, MediaPluginState } from './pm-plugins/main';
import { MediaSingleLayout } from '@atlaskit/adf-schema';
import { Schema } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { Context } from '@atlaskit/media-core';
import Button from '../floating-toolbar/ui/Button';
import Separator from '../floating-toolbar/ui/Separator';

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
  annotate: {
    id: 'fabric.editor.annotate',
    defaultMessage: 'Annotate',
    description:
      'Annotate an image by drawing arrows, adding text, or scribbles.',
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

const annotate: Command = state => {
  const pluginState: MediaPluginState | undefined = stateKey.getState(state);
  if (!pluginState) {
    return false;
  }

  pluginState.openMediaEditor();
  return true;
};

const remove: Command = (state, dispatch) => {
  if (dispatch) {
    dispatch(removeSelectedNode(state.tr));
  }
  return true;
};

const makeAlign = (layout: MediaSingleLayout) => {
  return (state, dispatch) => {
    const pluginState: MediaPluginState | undefined = stateKey.getState(state);
    if (!pluginState) {
      return false;
    }

    return pluginState.align(layout);
  };
};

const mapIconsToToolbarItem = (icons, layout: MediaSingleLayout, intl) =>
  icons.map(
    (toolbarItem): FloatingToolbarItem<Command> => {
      const { value } = toolbarItem;

      return {
        type: 'button',
        icon: toolbarItem.icon,
        title: intl.formatMessage(layoutToMessages[value]),
        selected: layout === value,
        onClick: makeAlign(value),
      };
    },
  );

const shouldHideToolbar = (selection: NodeSelection, { nodes }: Schema) =>
  hasParentNodeOfType(nodes.bodiedExtension)(selection) ||
  hasParentNodeOfType(nodes.layoutSection)(selection) ||
  hasParentNodeOfType(nodes.listItem)(selection) ||
  hasParentNodeOfType(nodes.table)(selection);

const buildLayoutButtons = (
  state: EditorState,
  intl: InjectedIntl,
  allowResizing?: boolean,
) => {
  const { selection } = state;
  const { mediaSingle } = state.schema.nodes;

  if (
    !(selection instanceof NodeSelection) ||
    !selection.node ||
    !mediaSingle ||
    shouldHideToolbar(selection, state.schema)
  ) {
    return [];
  }

  const { layout } = selection.node.attrs;

  let toolbarItems = [
    ...mapIconsToToolbarItem(alignmentIcons, layout, intl),
    { type: 'separator' },
    ...mapIconsToToolbarItem(wrappingIcons, layout, intl),
  ];

  if (!allowResizing) {
    toolbarItems = toolbarItems.concat([
      { type: 'separator' },
      ...mapIconsToToolbarItem(breakoutIcons, layout, intl),
    ]);
  }

  return toolbarItems;
};

type AnnotationToolbarProps = {
  viewContext: Context;
  id: string;
  intl: InjectedIntl;
  view?: EditorView;
};

class AnnotationToolbar extends React.Component<AnnotationToolbarProps> {
  state = {
    isImage: false,
  };

  async componentDidMount() {
    this.checkIsImage();
  }

  async checkIsImage() {
    const state = await this.props.viewContext.file.getCurrentState(
      this.props.id,
    );

    if (state && state.status !== 'error' && state.mediaType === 'image') {
      this.setState({
        isImage: true,
      });
    }
  }

  componentDidUpdate(prevProps: AnnotationToolbarProps) {
    if (prevProps.id !== this.props.id) {
      this.setState({ isImage: false }, () => {
        this.checkIsImage();
      });
    }
  }

  onClickAnnotation = () => {
    const { view } = this.props;
    if (view) {
      annotate(view.state, view.dispatch);
    }
  };

  render() {
    if (!this.state.isImage) {
      return null;
    }

    const { intl } = this.props;

    const title = intl.formatMessage(messages.annotate);

    return (
      <>
        <Separator />
        <Button
          title={title}
          icon={<AnnotateIcon label={title} />}
          onClick={this.onClickAnnotation}
        />
      </>
    );
  }
}

const renderAnnotationButton = (
  pluginState: MediaPluginState,
  intl: InjectedIntl,
) => {
  return (view, idx) => {
    const selectedContainer = pluginState.selectedMediaContainerNode();
    if (!selectedContainer) {
      return null;
    }

    return (
      <AnnotationToolbar
        key={idx}
        viewContext={pluginState.mediaContext}
        id={selectedContainer.firstChild!.attrs.id}
        view={view}
        intl={intl}
      />
    );
  };
};

export const floatingToolbar = (
  state: EditorState,
  intl: InjectedIntl,
  allowResizing?: boolean,
  allowAnnotation?: boolean,
  appearance?: EditorAppearance,
): FloatingToolbarConfig | undefined => {
  const { mediaSingle } = state.schema.nodes;
  const pluginState: MediaPluginState | undefined = stateKey.getState(state);

  if (!mediaSingle || !pluginState) {
    return;
  }

  let layoutButtons: FloatingToolbarItem<Command>[] = [];
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
