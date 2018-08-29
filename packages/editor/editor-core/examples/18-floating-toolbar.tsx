// tslint:disable:no-console

import * as React from 'react';
import { Component } from 'react';
import styled from 'styled-components';

import {
  tableBackgroundColorPalette,
  tableBackgroundBorderColors,
} from '@atlaskit/editor-common';
import { colors } from '@atlaskit/theme';
import Button, { ButtonGroup } from '@atlaskit/button';
import { Skeleton } from '@atlaskit/icon';

import Toolbar from '../src/plugins/floating-toolbar/ui/Toolbar';
import { FloatingToolbarItem } from '../src/plugins/floating-toolbar/types';
import ColorPalette from '../src/ui/ColorPalette';
import { Content } from '../example-helpers/styles';

const SAVE_ACTION = () => console.log('Save');
// const analyticsHandler = (actionName, props) => console.log(actionName, props);

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 96px);
`;

const RedIcon = () => <Skeleton weight="strong" color={colors.R500} />;
const YellowIcon = () => <Skeleton weight="strong" color={colors.Y500} />;
const GreenIcon = () => <Skeleton weight="strong" color={colors.G500} />;

const BUTTONS: Array<FloatingToolbarItem<Function>> = [
  {
    type: 'button',
    icon: RedIcon,
    onClick: () => {},
    title: 'Red button',
    hidden: true,
  },
  {
    type: 'button',
    icon: YellowIcon,
    onClick: () => {},
    title: 'Yellow button',
  },
  {
    type: 'button',
    icon: GreenIcon,
    onClick: () => {},
    title: 'Green button',
  },
];

const BUTTONS_WITH_SEPARATORS: Array<FloatingToolbarItem<Function>> = [
  {
    type: 'button',
    icon: RedIcon,
    onClick: () => {},
    title: 'Red button',
    hidden: true,
  },
  {
    type: 'separator',
    hidden: true,
  },
  {
    type: 'button',
    icon: YellowIcon,
    onClick: () => {},
    title: 'Yellow button',
  },
  {
    type: 'separator',
  },
  {
    type: 'button',
    icon: GreenIcon,
    onClick: () => {},
    title: 'Green button',
  },
];

const DROPDOWNS: Array<FloatingToolbarItem<Function>> = [
  {
    type: 'dropdown',
    title: 'Yellow dropdown',
    icon: YellowIcon,
    options: [
      {
        title: 'Header row',
        selected: false,
        onClick: () => {},
      },
      {
        title: 'Header column',
        selected: true,
        onClick: () => {},
      },
      {
        title: 'Number column',
        selected: false,
        onClick: () => {},
      },
    ],
  },
  {
    type: 'dropdown',
    title: 'Green dropdown',
    icon: GreenIcon,
    options: {
      render: ({ hide }) => (
        <ColorPalette
          palette={tableBackgroundColorPalette}
          borderColors={tableBackgroundBorderColors}
          onClick={() => {
            SAVE_ACTION();
            hide();
          }}
        />
      ),
      width: 146,
      height: 72,
    },
  },
];

export default class Example extends Component {
  state = {
    active: 'buttons',
  };

  render() {
    return (
      <Content>
        <Container>
          <Toolbar
            items={this.getActiveItems()}
            dispatchCommand={() => SAVE_ACTION}
          />
        </Container>
        <div className="toolsDrawer">
          <div>
            <ButtonGroup>
              {this.renderButton('buttons', 'Buttons')}
              {this.renderButton(
                'buttons-with-separators',
                'Buttons with separator',
              )}
              {this.renderButton('dropdowns', 'Dropdowns')}
            </ButtonGroup>
          </div>
        </div>
      </Content>
    );
  }

  renderButton = (name, label) => (
    <Button
      theme="dark"
      spacing="compact"
      ariaLabel={name}
      appearance={this.state.active === name ? 'primary' : 'default'}
      onClick={() => this.setState({ active: name })}
    >
      {label}
    </Button>
  );

  getActiveItems = () => {
    switch (this.state.active) {
      case 'buttons-with-separators':
        return BUTTONS_WITH_SEPARATORS;
      case 'dropdowns':
        return DROPDOWNS;
      default:
        return BUTTONS;
    }
  };
}
