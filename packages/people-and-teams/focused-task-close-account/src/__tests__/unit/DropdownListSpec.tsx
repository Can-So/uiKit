import * as React from 'react';
import { shallow } from 'enzyme';
import { DropdownList } from '../../components/DropdownList';
import Button from '@atlaskit/button';

const accessibleSites = [
  'hello.atlassian.net',
  'acme.atlassian.net',
  'test.atlassian.net',
];

const defaultProps = {
  accessibleSites,
};

const render = (props = {}) =>
  shallow(<DropdownList {...defaultProps} {...props} />);

describe('Dropdown list button', () => {
  test('not display if accessibleSites < 3', () => {
    const wrapper = render();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Button).exists()).toBeFalsy();
  });

  test('display if accessibleSites > 3', () => {
    const sites = [
      'hello.atlassian.net',
      'acme.atlassian.net',
      'test.atlassian.net',
      'bitflix.atlassian.net',
    ];
    expect(
      render({
        accessibleSites: sites,
      }),
    ).toMatchDocSnapshot();
  });
});
describe('Dropdown list', () => {
  test('displayed if accessibleSites > 3', () => {
    const sites = [
      'hello.atlassian.net',
      'acme.atlassian.net',
      'test.atlassian.net',
      'bitflix.atlassian.net',
    ];
    const wrapper = render({
      accessibleSites: sites,
    });
    const expandButton = wrapper.find(Button);
    expandButton.simulate('click');
    wrapper.update();

    expect(wrapper).toMatchSnapshot();
  });
});
describe('Dropdown collapse button', () => {
  test('displayed if accessibleSites > 3', () => {
    const sites = [
      'hello.atlassian.net',
      'acme.atlassian.net',
      'test.atlassian.net',
      'bitflix.atlassian.net',
    ];
    const wrapper = render({
      accessibleSites: sites,
    });
    const expandButton = wrapper.find(Button);
    expandButton.simulate('click');
    wrapper.update();

    expect(wrapper.find(Button).exists()).toBeTruthy();
  });
  test('onClick renders expand button', () => {
    const sites = [
      'hello.atlassian.net',
      'acme.atlassian.net',
      'test.atlassian.net',
      'bitflix.atlassian.net',
    ];
    const wrapper = render({
      accessibleSites: sites,
    });
    wrapper.setState({ isExpanded: true });

    const collapseButton = wrapper.find(Button);
    collapseButton.simulate('click');
    wrapper.update();

    expect(wrapper).toMatchSnapshot();
  });
});
