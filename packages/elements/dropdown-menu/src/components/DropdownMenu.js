// @flow
import React, { Component } from 'react';
import StatelessMenu from './DropdownMenuStateless';
import type {
  DropdownMenuStatefulProps,
  DeprecatedItemGroup,
  OnItemActivatedArgs,
  OnOpenChangeArgs,
} from '../types';

type State = {
  isOpen: boolean,
  items: Array<DeprecatedItemGroup>,
};

export default class DropdownMenu extends Component<
  DropdownMenuStatefulProps,
  State,
> {
  props: DropdownMenuStatefulProps; // eslint-disable-line react/sort-comp

  static defaultProps = {
    appearance: 'default',
    boundariesElement: 'viewport',
    defaultOpen: false,
    isLoading: false,
    isOpen: false,
    items: [],
    onItemActivated: () => {},
    onOpenChange: () => {},
    position: 'bottom left',
    shouldAllowMultilineItems: false,
    shouldFitContainer: false,
    shouldFlip: true,
    triggerButtonProps: {},
    triggerType: 'default',
  };

  state = {
    isOpen: this.props.defaultOpen,
    items: [...this.props.items],
  };

  componentWillReceiveProps(nextProps: DropdownMenuStatefulProps) {
    if (nextProps.items !== this.state.items) {
      this.setState({ items: [...nextProps.items] });
    }
    if (nextProps.isOpen !== this.props.isOpen) {
      this.setState({ isOpen: nextProps.isOpen });
    }
  }

  findActivatedGroup = (item: Object) =>
    this.state.items.filter(group => group.items.indexOf(item) > -1)[0]; // eslint-disable-line

  handleItemActivation = (attrs: OnItemActivatedArgs) => {
    const activatedItem = attrs.item;
    const activatedGroup = this.findActivatedGroup(activatedItem);
    const items = [...this.state.items];

    switch (activatedItem.type) {
      case 'checkbox':
        activatedItem.isChecked = !activatedItem.isChecked;
        this.props.onItemActivated({ item: activatedItem });
        this.setState({ items });
        break;
      case 'radio':
        activatedGroup.items.forEach(i => {
          if (i === activatedItem) {
            i.isChecked = true; // eslint-disable-line no-param-reassign
          } else {
            i.isChecked = false; // eslint-disable-line no-param-reassign
          }
        });
        this.props.onItemActivated({ item: activatedItem });
        this.setState({ items });
        break;
      case 'link':
      default:
        this.props.onItemActivated({ item: activatedItem });
        this.close();
        break;
    }
  };

  handleOpenChange = (attrs: OnOpenChangeArgs) => {
    this.setState({ isOpen: attrs.isOpen });
    this.props.onOpenChange(attrs);
  };

  close = () => {
    this.setState({ isOpen: false });
    this.props.onOpenChange({ isOpen: false });
  };

  render() {
    const { isOpen } = this.state;
    const {
      appearance,
      boundariesElement,
      children,
      isLoading,
      items,
      position,
      shouldAllowMultilineItems,
      shouldFitContainer,
      shouldFlip,
      trigger,
      triggerButtonProps,
      triggerType,
    } = this.props;

    return (
      <StatelessMenu
        appearance={appearance}
        boundariesElement={boundariesElement}
        isOpen={isOpen}
        isLoading={isLoading}
        items={items}
        onItemActivated={this.handleItemActivation}
        onOpenChange={this.handleOpenChange}
        position={position}
        shouldAllowMultilineItems={shouldAllowMultilineItems}
        shouldFitContainer={shouldFitContainer}
        shouldFlip={shouldFlip}
        trigger={trigger}
        triggerButtonProps={triggerButtonProps}
        triggerType={triggerType}
      >
        {children}
      </StatelessMenu>
    );
  }
}
