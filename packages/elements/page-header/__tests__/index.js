// @flow
import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import PageHeader from '../src';
import { name } from '../package.json';
import { StyledTitle } from '../src/PageHeader/styled';

describe(name, () => {
  it('should renders correctly', () => {
    const BreadCrumbs = () => <div>Breadcrumb</div>;
    const Actions = () => <div>Action</div>;
    const Bar = () => <div>Bar</div>;

    const wrapper = (
      <PageHeader
        breadcrumbs={<BreadCrumbs />}
        actions={<Actions />}
        bottomBar={<Bar />}
      >
        Test
      </PageHeader>
    );
    const Component = renderer.create(wrapper).toJSON();
    expect(Component).toMatchSnapshot();
  });

  it('should renders correctly with disableTitleStyles prop', () => {
    const BreadCrumbs = () => <div>Breadcrumb</div>;
    const Actions = () => <div>Action</div>;
    const Bar = () => <div>Bar</div>;

    const wrapper = (
      <PageHeader
        breadcrumbs={<BreadCrumbs />}
        actions={<Actions />}
        bottomBar={<Bar />}
        disableTitleStyles
      >
        Test
      </PageHeader>
    );

    const Component = renderer.create(wrapper).toJSON();
    expect(Component).toMatchSnapshot();
  });

  it('should render passed children', () => {
    const wrapper = shallow(<PageHeader>Title</PageHeader>);
    expect(wrapper.contains('Title')).toBe(true);
  });

  it('should render passed breadcrumbs', () => {
    const BreadCrumbs = () => <div>Breadcrumb</div>;
    const wrapper = shallow(
      <PageHeader breadcrumbs={<BreadCrumbs />}>Title</PageHeader>,
    );
    expect(wrapper.find(BreadCrumbs).length).toBe(1);
  });

  it('should render passed actions', () => {
    const Actions = () => <div>Breadcrumb</div>;
    const wrapper = shallow(
      <PageHeader actions={<Actions />}>Title</PageHeader>,
    );
    expect(wrapper.find(Actions).length).toBe(1);
  });

  it('should render passed bottom bar', () => {
    const Bar = () => <div>Breadcrumb</div>;
    const wrapper = shallow(<PageHeader bottomBar={<Bar />}>Title</PageHeader>);
    expect(wrapper.find(Bar).length).toBe(1);
  });

  it('should render custom component without the StyledTitle when disableTitleStyles is true', () => {
    const CustomTitle = () => <span>Custom component</span>;
    const wrapper = shallow(
      <PageHeader disableTitleStyles>
        <CustomTitle />
      </PageHeader>,
    );
    expect(wrapper.find(StyledTitle)).toHaveLength(0);
  });
});
