import * as React from 'react';
import { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { colors, gridSize } from '@atlaskit/theme';
import Item, { itemThemeNamespace } from '@atlaskit/item';
import EditorDoneIcon from '@atlaskit/icon/glyph/editor/done';

import { DropdownOptionT } from './Dropdown';

export const menuItemDimensions = {
  width: 175,
  height: 32,
};

const Spacer = styled.span`
  display: flex;
  flex: 1;
  padding: 8px;
`;

const MenuContainer = styled.div`
  min-width: ${menuItemDimensions.width}px;
`;

const padding = gridSize();
export const itemSpacing = gridSize() / 2;

const editorItemTheme = {
  borderRadius: 0,
  beforeItemSpacing: {
    compact: itemSpacing,
  },
  padding: {
    compact: {
      bottom: padding,
      left: padding,
      right: padding,
      top: padding,
    },
  },
  height: {
    compact: menuItemDimensions.height,
  },
};

export interface Props {
  hide: Function;
  dispatchCommand: Function;
  items: Array<DropdownOptionT<Function>>;
}

export default class Dropdown extends Component<Props> {
  render() {
    const { hide, dispatchCommand, items } = this.props;
    return (
      <ThemeProvider theme={{ [itemThemeNamespace]: editorItemTheme }}>
        <MenuContainer>
          {items.filter(item => !item.hidden).map((item, idx) => (
            <Item
              key={idx}
              isCompact={true}
              elemBefore={this.renderSelected(item)}
              onClick={() => {
                hide();
                dispatchCommand(item.onClick);
              }}
              isDisabled={item.disabled}
            >
              {item.title}
            </Item>
          ))}
        </MenuContainer>
      </ThemeProvider>
    );
  }

  private renderSelected(item) {
    const { selected } = item;
    if (selected !== undefined) {
      return selected ? (
        <EditorDoneIcon
          primaryColor={colors.B400}
          size="small"
          label="test question"
        />
      ) : (
        <Spacer />
      );
    }
  }
}
