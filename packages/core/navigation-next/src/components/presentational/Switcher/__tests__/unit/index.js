// @flow

import React from 'react';
import NodeResolver from 'react-node-resolver';
import { shallow } from 'enzyme';
import { PopupSelect } from '@atlaskit/select';
import {
  BaseSwitcher,
  Footer,
  Control,
  createStyles,
  filterOption,
  isOptionSelected,
  getOptionValue,
} from '../../index';
import Option from '../../Option';

const Target = () => 'A target';

describe('Switcher', () => {
  let baseProps;

  beforeEach(() => {
    baseProps = {
      navWidth: 240,
      options: [
        {
          avatar: 'endeavour',
          id: 'endeavour',
          pathname: '/projects/endeavour',
          text: 'Endeavour',
          subText: 'Software project',
        },
        {
          avatar: 'design-system-support',
          id: 'design-system-support',
          pathname: '/projects/design-system-support',
          text: 'Design System Support',
          subText: 'Service desk project',
        },
      ],
      target: <Target />,
    };
  });

  it('should render correctly', () => {
    expect(shallow(<BaseSwitcher {...baseProps} />)).toMatchSnapshot();
  });

  it('should render a PopupSelect />', () => {
    const wrapper = shallow(<BaseSwitcher {...baseProps} />);
    expect(wrapper.find(PopupSelect)).toHaveLength(1);
  });

  it('should pass expected props to <PopupSelect />', () => {
    const wrapper = shallow(<BaseSwitcher {...baseProps} />);
    expect(wrapper.find(PopupSelect).props()).toEqual(
      expect.objectContaining({
        filterOption,
        isOptionSelected,
        getOptionValue,
        onOpen: wrapper.instance().handleOpen,
        onClose: wrapper.instance().handleClose,
        options: wrapper.prop('options'),
        maxMenuWidth: expect.any(Number),
        minMenuWidth: expect.any(Number),
      }),
    );
    expect(wrapper.find(PopupSelect).prop('target').type).toEqual(NodeResolver);
  });

  it('should pass default components to <PopupSelect /> if components prop is missing', () => {
    const wrapper = shallow(<BaseSwitcher {...baseProps} />);
    expect(wrapper.find(PopupSelect).prop('components')).toEqual({
      Control,
      Option,
    });
  });

  it('should pass merged components to <PopupSelect /> if components prop is present', () => {
    const customComponents = {
      Control: () => <div> overriding control </div>,
      NewComponent: () => <div> new component </div>,
    };

    const wrapper = shallow(
      <BaseSwitcher {...baseProps} components={customComponents} />,
    );

    expect(wrapper.find(PopupSelect).prop('components')).toEqual({
      Control: customComponents.Control,
      Option,
      NewComponent: customComponents.NewComponent,
    });
  });

  it('should pass default styles to <PopupSelect /> if styles prop is missing', () => {
    const wrapper = shallow(<BaseSwitcher {...baseProps} />);
    const styles = wrapper.prop('styles');
    expect(styles).toEqual(
      expect.objectContaining({
        option: expect.any(Function),
      }),
    );
    expect(wrapper.find(PopupSelect).prop('styles')).toEqual(styles);
  });

  it('should pass merged custom styles to <PopupSelect /> if styles prop is present', () => {
    const customStyles = {
      option: base => ({
        ...base,
        color: 'green',
        paddingLeft: 16,
        marginBottom: 2,
      }),
      control: base => ({
        ...base,
        color: 'red',
      }),
      groupHeading: base => ({ ...base, color: 'red' }),
      singleValue: base => ({ ...base, color: 'red' }),
    };
    const wrapper = shallow(
      <BaseSwitcher {...baseProps} styles={customStyles} />,
    );
    expect(wrapper.find(PopupSelect).prop('styles')).toEqual(
      expect.objectContaining({
        option: expect.any(Function),
        control: expect.any(Function),
        groupHeading: expect.any(Function),
        singleValue: expect.any(Function),
      }),
    );
  });

  it('should pass footer prop to <PopupSelect /> when present', () => {
    const CustomFooter = () => <button>Footer</button>;
    const wrapper = shallow(
      <BaseSwitcher {...baseProps} footer={<CustomFooter />} />,
    );
    expect(wrapper.find(PopupSelect).prop('footer')).toEqual(<CustomFooter />);
  });

  it('should not pass footer prop to <PopupSelect /> when create and footer are missing', () => {
    const wrapper = shallow(<BaseSwitcher {...baseProps} />);
    expect(wrapper.find(PopupSelect).prop('footer')).toEqual(null);
  });

  it('should pass default footer prop to <PopupSelect /> when create is present', () => {
    const create = {
      onClick: () => {},
      text: 'create text',
    };

    const wrapper = shallow(<BaseSwitcher {...baseProps} create={create} />);

    const popUpSelect = wrapper.find(PopupSelect);
    expect(popUpSelect.prop('footer').type).toEqual(Footer);
    expect(popUpSelect.prop('footer').props).toEqual(
      expect.objectContaining({
        text: create.text,
        onClick: expect.any(Function),
      }),
    );
  });
});

describe('createStyles()', () => {
  let defaultState;

  beforeEach(() => {
    defaultState = {
      isFocused: false,
      isActive: false,
    };
  });

  it('should return an object with option property', () => {
    const styles = createStyles();
    expect(styles).toEqual({
      option: expect.any(Function),
    });
  });

  it('should return default option styles if no custom option styles is given', () => {
    const styles = createStyles();
    expect(styles.option({}, defaultState)).toEqual({
      alignItems: 'center',
      border: 'none',
      backgroundColor: 'transparent',
      boxSizing: 'border-box',
      color: 'inherit',
      cursor: 'default',
      display: 'flex',
      flexShrink: 0,
      fontSize: 'inherit',
      height: 8 * 6,
      outline: 'none',
      paddingRight: 8,
      paddingLeft: 8,
      textAlign: 'left',
      textDecoration: 'none',
      width: '100%',
    });
  });

  it('should merge default option styles and custom option styles', () => {
    const customStyles = {
      option: base => ({
        ...base,
        color: 'red',
        backgroundColor: 'blue',
      }),
    };
    const styles = createStyles(customStyles);
    const option = styles.option({}, defaultState);
    expect(option).toEqual({
      alignItems: 'center',
      border: 'none',
      backgroundColor: 'blue',
      boxSizing: 'border-box',
      color: 'red',
      cursor: 'default',
      display: 'flex',
      flexShrink: 0,
      fontSize: 'inherit',
      height: 8 * 6,
      outline: 'none',
      paddingRight: 8,
      paddingLeft: 8,
      textAlign: 'left',
      textDecoration: 'none',
      width: '100%',
    });
  });

  it('should return focus option styles when isFocused is true', () => {
    const styles = createStyles();
    const state = {
      isFocused: true,
      isActive: false,
    };

    expect(styles.option({}, state)).toEqual({
      alignItems: 'center',
      border: 'none',
      backgroundColor: '#EBECF0',
      boxSizing: 'border-box',
      color: 'inherit',
      cursor: 'default',
      display: 'flex',
      flexShrink: 0,
      fontSize: 'inherit',
      height: 8 * 6,
      outline: 'none',
      paddingRight: 8,
      paddingLeft: 8,
      textAlign: 'left',
      textDecoration: 'none',
      width: '100%',
    });
  });

  it('should return expected option styles when isFocused and isActive are true', () => {
    const styles = createStyles();
    const state = {
      isFocused: true,
      isActive: true,
    };

    expect(styles.option({}, state)).toEqual({
      alignItems: 'center',
      border: 'none',
      backgroundColor: '#DEEBFF',
      boxSizing: 'border-box',
      color: 'inherit',
      cursor: 'default',
      display: 'flex',
      flexShrink: 0,
      fontSize: 'inherit',
      height: 8 * 6,
      outline: 'none',
      paddingRight: 8,
      paddingLeft: 8,
      textAlign: 'left',
      textDecoration: 'none',
      width: '100%',
    });
  });
});

describe('filterOption()', () => {
  const option = {
    text: 'Design System Support',
  };
  it('should return true when option text contains "input" text', () => {
    expect(filterOption({ data: option }, 'DeSiGn s')).toBe(true);
    expect(filterOption({ data: option }, 'SuPpo')).toBe(true);
  });

  it('should return false when option text does not contain "input" text', () => {
    expect(filterOption({ data: option }, 'blabla')).toBe(false);
    expect(filterOption({ data: option }, 'x')).toBe(false);
    expect(filterOption({ data: option }, 'dx')).toBe(false);
  });
});

describe('isOptionSelected()', () => {
  it('should return false when selected array is empty or undefined', () => {
    const selected = [];
    expect(isOptionSelected({}, selected)).toBe(false);
    expect(isOptionSelected({}, undefined)).toBe(false);
  });
  it('should returen false when option id is different than selected id', () => {
    const selected = [{ id: 'my-id' }];
    const option = { id: 'another-id' };
    expect(isOptionSelected(option, selected)).toBe(false);
  });
  it('should return true when option id is equal to selected id', () => {
    const selected = [{ id: 'my-id' }];
    const option = { id: 'my-id' };
    expect(isOptionSelected(option, selected)).toBe(true);
  });
});

describe('getOptionValue()', () => {
  it('should return option id property', () => {
    const option = { id: 'an-id' };
    expect(getOptionValue(option)).toEqual('an-id');
  });
});
