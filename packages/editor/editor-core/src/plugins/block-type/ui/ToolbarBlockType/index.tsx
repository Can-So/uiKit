import * as React from 'react';
import { EditorView } from 'prosemirror-view';
import ExpandIcon from '@atlaskit/icon/glyph/chevron-down';
import TextStyleIcon from '@atlaskit/icon/glyph/editor/text-style';
import { analyticsService as analytics } from '../../../../analytics';
import ToolbarButton from '../../../../ui/ToolbarButton';
import DropdownMenu from '../../../../ui/DropdownMenu';
import {
  ButtonContent,
  Separator,
  Wrapper,
  MenuWrapper,
  ExpandIconWrapper,
} from '../../../../ui/styles';
import { BlockType } from '../../types';
import { BlockTypeState } from '../../pm-plugins/main';

export interface Props {
  isDisabled?: boolean;
  isSmall?: boolean;
  isReducedSpacing?: boolean;
  editorView: EditorView;
  pluginState: BlockTypeState;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
  popupsScrollableElement?: HTMLElement;
}

export interface State {
  active: boolean;
  availableBlockTypes: BlockType[];
  currentBlockType: BlockType;
  blockTypesDisabled: boolean;
}

export default class ToolbarBlockType extends React.PureComponent<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
    const { pluginState } = props;

    this.state = {
      active: false,
      availableBlockTypes: pluginState.availableBlockTypes,
      currentBlockType: pluginState.currentBlockType,
      blockTypesDisabled: pluginState.blockTypesDisabled,
    };
  }

  componentDidMount() {
    this.props.pluginState.subscribe(this.handlePluginStateChange);
  }

  componentWillUnmount() {
    this.props.pluginState.unsubscribe(this.handlePluginStateChange);
  }

  private onOpenChange = (attrs: any) => {
    this.setState({
      active: attrs.isOpen,
    });
  };

  render() {
    const {
      active,
      currentBlockType,
      blockTypesDisabled,
      availableBlockTypes,
    } = this.state;
    const {
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
      isSmall,
      isReducedSpacing,
    } = this.props;
    const blockTypeTitles = availableBlockTypes
      .filter(blockType => blockType.name === currentBlockType.name)
      .map(blockType => blockType.title);

    const toolbarButtonFactory = (disabled: boolean) => (
      <ToolbarButton
        spacing={isReducedSpacing ? 'none' : 'default'}
        selected={active}
        disabled={disabled}
        onClick={this.handleTriggerClick}
        iconAfter={
          <Wrapper>
            {isSmall && <TextStyleIcon label="Change formatting" />}
            <ExpandIconWrapper>
              <ExpandIcon label="Change formatting" />
            </ExpandIconWrapper>
          </Wrapper>
        }
      >
        {!isSmall && (
          <ButtonContent>{blockTypeTitles[0] || 'Normal text'}</ButtonContent>
        )}
      </ToolbarButton>
    );

    if (!this.props.isDisabled && !blockTypesDisabled) {
      const items = this.createItems();
      return (
        <MenuWrapper>
          <DropdownMenu
            items={items}
            onOpenChange={this.onOpenChange}
            onItemActivated={this.handleSelectBlockType}
            isOpen={active}
            mountTo={popupsMountPoint}
            boundariesElement={popupsBoundariesElement}
            scrollableElement={popupsScrollableElement}
            fitHeight={360}
            fitWidth={106}
          >
            {toolbarButtonFactory(false)}
          </DropdownMenu>
          <Separator />
        </MenuWrapper>
      );
    }

    return (
      <Wrapper>
        {toolbarButtonFactory(true)}
        <Separator />
      </Wrapper>
    );
  }

  private handleTriggerClick = () => {
    this.onOpenChange({ isOpen: !this.state.active });
  };

  private createItems = () => {
    const { currentBlockType, availableBlockTypes } = this.state;
    let items: any[] = [];
    availableBlockTypes.forEach((blockType, blockTypeNo) => {
      items.push({
        content: blockType.title,
        value: blockType,
        // ED-2853, hiding tooltips as shortcuts are not working atm.
        // tooltipDescription: tooltip(findKeymapByDescription(blockType.title)),
        // tooltipPosition: 'right',
        isActive: currentBlockType === blockType,
      });
    });
    return [
      {
        items,
      },
    ];
  };

  private handlePluginStateChange = (pluginState: BlockTypeState) => {
    this.setState({
      active: this.state.active,
      availableBlockTypes: pluginState.availableBlockTypes,
      currentBlockType: pluginState.currentBlockType,
      blockTypesDisabled: pluginState.blockTypesDisabled,
    });
  };

  private handleSelectBlockType = ({ item }) => {
    const blockType = item.value;
    const { availableBlockTypes } = this.state;
    this.props.pluginState.toggleBlockType(
      blockType.name,
      this.props.editorView,
    );
    this.setState({
      active: false,
      availableBlockTypes,
      currentBlockType: blockType,
    });

    analytics.trackEvent(`atlassian.editor.format.${blockType.name}.button`);
  };
}
