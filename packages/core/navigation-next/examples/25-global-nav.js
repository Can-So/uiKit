// @flow

import React, {
  Component,
  Fragment,
  type ComponentType,
  type Node,
} from 'react';
import Avatar from '@atlaskit/avatar';
import Drawer from '@atlaskit/drawer';
import {
  DropdownItem,
  DropdownItemGroup,
  DropdownMenuStateless,
} from '@atlaskit/dropdown-menu';
import CreateIcon from '@atlaskit/icon/glyph/add';
import SearchIcon from '@atlaskit/icon/glyph/search';
import HelpIcon from '@atlaskit/icon/glyph/question-circle';
import { AtlassianIcon } from '@atlaskit/logo';
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';

import { GlobalItem, GlobalNav } from '../src';

type GlobalItemWithDropdownProps = {
  items: Node,
  trigger: ComponentType<{ isOpen: boolean }>,
};
type GlobalItemWithDropdownState = { isOpen: boolean };
class GlobalItemWithDropdown extends Component<
  GlobalItemWithDropdownProps,
  GlobalItemWithDropdownState,
> {
  state = {
    isOpen: false,
  };
  handleOpenChange = ({ isOpen }) => this.setState({ isOpen });
  render() {
    const { items, trigger: Trigger } = this.props;
    const { isOpen } = this.state;
    return (
      <DropdownMenuStateless
        boundariesElement="window"
        isOpen={isOpen}
        onOpenChange={this.handleOpenChange}
        position="right bottom"
        trigger={<Trigger isOpen={isOpen} />}
      >
        {items}
      </DropdownMenuStateless>
    );
  }
}
const ItemComponent = ({ dropdownItems: DropdownItems, ...itemProps }: *) => {
  if (DropdownItems) {
    return (
      <GlobalItemWithDropdown
        trigger={({ isOpen }) => (
          <GlobalItem isSelected={isOpen} {...itemProps} />
        )}
        items={<DropdownItems />}
      />
    );
  }
  return <GlobalItem {...itemProps} />;
};

const Row = props => (
  <div css={{ display: 'flex', flexDirection: 'row' }} {...props} />
);
const Variation = props => (
  <div
    css={{ display: 'flex', flexDirection: 'row', padding: '0 40px' }}
    {...props}
  />
);
const Title = props => (
  <div
    css={{
      fontWeight: 'bold',
      marginRight: 20,
      paddingTop: 20,
      textAlign: 'right',
      width: 80,
    }}
    {...props}
  />
);

const GlobalNavWithRegularItems = () => (
  <GlobalNav
    primaryItems={[
      {
        icon: () => <AtlassianIcon label="Atlassian" size="medium" />,
        id: 'logo',
        tooltip: 'Atlassian',
        onClick: () => console.log('Logo item clicked'),
      },
      {
        icon: SearchIcon,
        id: 'search',
        tooltip: 'Search',
        onClick: () => console.log('Search item clicked'),
      },
      {
        icon: CreateIcon,
        id: 'create',
        tooltip: 'Create',
        onClick: () => console.log('Create item clicked'),
      },
    ]}
    secondaryItems={[
      {
        icon: HelpIcon,
        id: 'help',
        onClick: () => console.log('Help item clicked'),
        tooltip: 'Help',
      },
      {
        component: ({ className, onClick }: *) => (
          <span className={className}>
            <Avatar
              borderColor="transparent"
              isActive={false}
              isHover={false}
              size="small"
              onClick={onClick}
            />
          </span>
        ),
        icon: null,
        id: 'profile',
        onClick: () => console.log('Profile item clicked'),
        tooltip: 'Profile',
      },
    ]}
  />
);

const ExampleDropdown = () => (
  <DropdownItemGroup title="Heading">
    <DropdownItem onClick={() => console.log('Dropdown item clicked')}>
      Dropdown item with onClick
    </DropdownItem>
    <DropdownItem href="//atlassian.com" target="_new">
      Dropdown item with href
    </DropdownItem>
  </DropdownItemGroup>
);
const GlobalNavWithDropdowns = () => (
  <GlobalNav
    itemComponent={ItemComponent}
    primaryItems={[]}
    secondaryItems={[
      {
        dropdownItems: ExampleDropdown,
        icon: HelpIcon,
        id: 'help',
        onClick: () => console.log('Help item clicked'),
        tooltip: 'Regular item opening a dropdown',
      },
      {
        component: ({ className, onClick }: *) => (
          <span className={className}>
            <Avatar
              borderColor="transparent"
              isActive={false}
              isHover={false}
              size="small"
              onClick={onClick}
            />
          </span>
        ),
        dropdownItems: ExampleDropdown,
        icon: null,
        id: 'profile',
        onClick: () => console.log('Profile item clicked'),
        tooltip: 'Item with an avatar opening a dropdown',
      },
    ]}
  />
);

type State = {
  isModalOpen: boolean,
  isDrawerOpen: boolean,
};
// eslint-disable-next-line react/no-multi-comp
class GlobalNavWithModalsAndDrawers extends Component<{}, State> {
  state = {
    isModalOpen: false,
    isDrawerOpen: false,
  };

  openModal = () => this.setState({ isModalOpen: true });
  closeModal = () => this.setState({ isModalOpen: false });
  openDrawer = () => this.setState({ isDrawerOpen: true });
  closeDrawer = () => this.setState({ isDrawerOpen: false });

  render() {
    const { isModalOpen, isDrawerOpen } = this.state;
    return (
      <Fragment>
        <GlobalNav
          itemComponent={ItemComponent}
          primaryItems={[
            { component: () => null, icon: () => null, id: 'logo' },
            {
              icon: CreateIcon,
              id: 'create',
              tooltip: 'Open a modal',
              onClick: this.openModal,
            },
            {
              icon: SearchIcon,
              id: 'search',
              tooltip: 'Open a drawer',
              onClick: this.openDrawer,
            },
          ]}
          secondaryItems={[
            {
              dropdownItems: () => (
                <DropdownItemGroup title="Heading">
                  <DropdownItem onClick={this.openModal}>
                    Open a modal
                  </DropdownItem>
                  <DropdownItem onClick={this.openDrawer}>
                    Open a drawer
                  </DropdownItem>
                </DropdownItemGroup>
              ),
              icon: HelpIcon,
              id: 'help',
              tooltip: 'Open dropdown',
            },
          ]}
        />

        <ModalTransition>
          {isModalOpen && (
            <Modal
              actions={[{ text: 'Close', onClick: this.closeModal }]}
              onClose={this.closeModal}
              heading="Modal Title"
            >
              Modal content
            </Modal>
          )}
        </ModalTransition>

        <Drawer onClose={this.closeDrawer} isOpen={isDrawerOpen} width="wide">
          <code>Drawer contents</code>
        </Drawer>
      </Fragment>
    );
  }
}

export default () => (
  <Row>
    <Variation>
      <Title>Regular items:</Title>
      <GlobalNavWithRegularItems />
    </Variation>
    <Variation>
      <Title>Opening a dropdown:</Title>
      <GlobalNavWithDropdowns />
    </Variation>
    <Variation>
      <Title>Opening modals and drawers</Title>
      <GlobalNavWithModalsAndDrawers />
    </Variation>
  </Row>
);
