import * as React from 'react';
import { PureComponent, ReactElement } from 'react';
import styled from 'styled-components';
import DropList from '@atlaskit/droplist';
import Item, { ItemGroup } from '@atlaskit/item';
import Tooltip from '@atlaskit/tooltip';
import {
  Popup,
  akEditorToolbarDropdownMenuZIndex,
} from '@atlaskit/editor-common';
import withOuterListeners from '../with-outer-listeners';

export interface Props {
  mountTo?: HTMLElement;
  boundariesElement?: HTMLElement;
  scrollableElement?: HTMLElement;
  isOpen?: boolean;
  onOpenChange?: (attrs) => void;
  onItemActivated?: (attrs) => void;
  onMouseEnter?: (attrs) => void;
  onMouseLeave?: (attrs) => void;
  fitWidth?: number;
  fitHeight?: number;
  offset?: Array<number>;
  items: Array<{
    items: Array<{
      content: string | ReactElement<any>;
      elemBefore?: React.ReactNode;
      elemAfter?: React.ReactNode;
      tooltipDescription?: string;
      tooltipPosition?: string;
      isActive: boolean;
      isDisabled?: boolean;
    }>;
  }>;
}

export interface State {
  target?: HTMLElement;
  popupPlacement: [string, string];
}

const DropListWithOutsideListeners: any = withOuterListeners(DropList);

/**
 * Hack for item to imitate old dropdown-menu selected styles
 */
const ItemWrapper: any = styled.div`
  ${(props: any) =>
    props.isSelected
      ? '&& > span, && > span:hover { background: #6c798f; color: #fff; }'
      : ''};
`;

const ItemContentWrapper: any = styled.span`
  ${(props: any) => (props.hasElemBefore ? 'margin-left: 8px;' : '')};
`;

/**
 * Wrapper around @atlaskit/droplist which uses Popup and Portal to render
 * dropdown-menu outside of "overflow: hidden" containers when needed.
 *
 * Also it controls popper's placement.
 */
export default class DropdownMenuWrapper extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      popupPlacement: ['bottom', 'left'],
    };
  }

  private handleRef = target => {
    this.setState({ target });
  };

  private updatePopupPlacement = placement => {
    this.setState({ popupPlacement: placement });
  };

  private handleClose = () => {
    if (this.props.onOpenChange) {
      this.props.onOpenChange({ isOpen: false });
    }
  };

  private renderItem(item) {
    const { onItemActivated, onMouseEnter, onMouseLeave } = this.props;

    // onClick and value.name are the action indicators in the handlers
    // If neither are present, don't wrap in an Item.
    if (!item.onClick && !item.value && !item.value.name) {
      return <span key={item.content}>{item.content}</span>;
    }

    const dropListItem = (
      <ItemWrapper key={item.key || item.content} isSelected={item.isActive}>
        <Item
          elemBefore={item.elemBefore}
          elemAfter={item.elemAfter}
          isDisabled={item.isDisabled}
          onClick={() => onItemActivated && onItemActivated({ item })}
          onMouseEnter={() => onMouseEnter && onMouseEnter({ item })}
          onMouseLeave={() => onMouseLeave && onMouseLeave({ item })}
          className={item.className}
        >
          <ItemContentWrapper hasElemBefore={!!item.elemBefore}>
            {item.content}
          </ItemContentWrapper>
        </Item>
      </ItemWrapper>
    );

    if (item.tooltipDescription) {
      return (
        <Tooltip
          key={item.content}
          content={item.tooltipDescription}
          position={item.tooltipPosition}
        >
          {dropListItem}
        </Tooltip>
      );
    }

    return dropListItem;
  }

  private renderDropdownMenu() {
    const { target, popupPlacement } = this.state;
    const {
      items,
      mountTo,
      boundariesElement,
      scrollableElement,
      offset,
      fitHeight,
      fitWidth,
      isOpen,
    } = this.props;

    return (
      <Popup
        target={isOpen ? target : undefined}
        mountTo={mountTo}
        boundariesElement={boundariesElement}
        scrollableElement={scrollableElement}
        onPlacementChanged={this.updatePopupPlacement}
        fitHeight={fitHeight}
        fitWidth={fitWidth}
        zIndex={akEditorToolbarDropdownMenuZIndex}
        offset={offset}
      >
        <DropListWithOutsideListeners
          isOpen={true}
          appearance="tall"
          position={popupPlacement.join(' ')}
          shouldFlip={false}
          shouldFitContainer={true}
          isTriggerNotTabbable={true}
          handleClickOutside={this.handleClose}
          handleEscapeKeydown={this.handleClose}
        >
          <div style={{ height: 0, minWidth: fitWidth || 0 }} />
          {items.map((group, index) => (
            <ItemGroup key={index}>
              {group.items.map(item => this.renderItem(item))}
            </ItemGroup>
          ))}
        </DropListWithOutsideListeners>
      </Popup>
    );
  }

  render() {
    const { children, isOpen } = this.props;

    return (
      <div>
        <div ref={this.handleRef}>{children}</div>
        {isOpen ? this.renderDropdownMenu() : null}
      </div>
    );
  }
}
