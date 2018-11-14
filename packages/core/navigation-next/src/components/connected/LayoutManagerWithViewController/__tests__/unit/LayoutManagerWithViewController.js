// @flow

import React from 'react';
import { mount } from 'enzyme';

import LayoutManagerWithViewController from '../../LayoutManagerWithViewController';
import { NavigationProvider } from '../../../../../index';

const GlobalNavigationComponent = () => null;

describe('LayoutManagerWithViewController', () => {
  let wrapper;

  let onCollapseStart;
  let onCollapseEnd;
  let onExpandStart;
  let onExpandEnd;
  let getRefs;

  beforeEach(() => {
    onCollapseStart = jest.fn();
    onCollapseEnd = jest.fn();
    onExpandStart = jest.fn();
    onExpandEnd = jest.fn();
    getRefs = jest.fn();

    wrapper = mount(
      <NavigationProvider cache={false} isDebugEnabled={false}>
        <LayoutManagerWithViewController
          globalNavigation={GlobalNavigationComponent}
          firstSkeletonToRender={'product'}
          onCollapseStart={onCollapseStart}
          onCollapseEnd={onCollapseEnd}
          onExpandStart={onExpandStart}
          onExpandEnd={onExpandEnd}
          getRefs={getRefs}
        >
          <div />
        </LayoutManagerWithViewController>
      </NavigationProvider>,
    );
  });

  afterEach(() => {
    onCollapseStart.mockReset();
    onCollapseEnd.mockReset();
    onExpandStart.mockReset();
    onExpandEnd.mockReset();
    getRefs.mockReset();
  });

  it('should render global navigation based on using `globalNavigation` as a reference', () => {
    expect(wrapper.find(GlobalNavigationComponent).length).toBe(1);
  });

  describe('LayerInitialised', () => {
    it('should be initialised when `onInitialised` method is called', () => {
      const layerInitialised = wrapper.find('LayerInitialised');

      expect(layerInitialised.props().initialised).toBe(false);

      layerInitialised.props().onInitialised();
      wrapper.update();

      expect(wrapper.find('LayerInitialised').props().initialised).toBe(true);
    });
  });

  describe('Skeleton management', () => {
    it('should render skeleton using `product` context', () => {
      expect(
        wrapper.find(LayoutManagerWithViewController).props()
          .firstSkeletonToRender,
      ).toBe('product');

      expect(
        wrapper
          .find('SkeletonItem')
          .first()
          .props().theme.context,
      ).toBe('product');
    });

    it('should render skeleton using `container` context', () => {
      const containerWrapper = mount(
        <NavigationProvider isDebugEnabled={false}>
          <LayoutManagerWithViewController
            globalNavigation={GlobalNavigationComponent}
            firstSkeletonToRender={'container'}
          >
            <div />
          </LayoutManagerWithViewController>
        </NavigationProvider>,
      );

      expect(
        containerWrapper.find(LayoutManagerWithViewController).props()
          .firstSkeletonToRender,
      ).toBe('container');

      expect(
        containerWrapper
          .find('SkeletonItem')
          .first()
          .props().theme.context,
      ).toBe('container');
    });
  });

  describe('Passing props to LayoutManager', () => {
    it('should pass expand/collapse listeners and getRefs', () => {
      const layoutManager = wrapper.find('LayoutManager');

      onCollapseStart(200);
      onCollapseEnd(0);
      onExpandStart(0);
      onExpandEnd(200);

      expect(layoutManager.props().onCollapseStart).toBeCalledWith(200);
      expect(layoutManager.props().onCollapseEnd).toBeCalledWith(0);
      expect(layoutManager.props().onExpandStart).toBeCalledWith(0);
      expect(layoutManager.props().onExpandEnd).toBeCalledWith(200);
      expect(layoutManager.props().getRefs).toHaveBeenCalled();
    });
  });

  describe('Rendering the outgoing view when transitioning between layers', () => {
    const ProductItem = () => <div />;
    const ContainerItem = () => <div />;
    const productView = {
      type: 'product',
      id: 'product-view',
      getItems: () => [{ type: ProductItem, id: 'product-item' }],
    };
    const containerView = {
      type: 'container',
      id: 'container-view',
      getItems: () => [{ type: ContainerItem, id: 'container-item' }],
    };

    it('should continue rendering the last product view when transitioning from product -> container', () => {
      const { viewController } = wrapper.instance();
      viewController.addView(productView);
      viewController.addView(containerView);
      viewController.setView(productView.id);
      wrapper.update();

      expect(wrapper.find(ProductItem)).toHaveLength(1);
      expect(wrapper.find(ContainerItem)).toHaveLength(0);

      viewController.setView(containerView.id);
      wrapper.update();

      expect(wrapper.find(ProductItem)).toHaveLength(1);
      expect(wrapper.find(ContainerItem)).toHaveLength(1);
    });

    it('should continue rendering the last container view when transitioning from container -> product', () => {
      const { viewController } = wrapper.instance();
      viewController.addView(productView);
      viewController.addView(containerView);
      viewController.setView(containerView.id);
      wrapper.update();

      expect(wrapper.find(ProductItem)).toHaveLength(0);
      expect(wrapper.find(ContainerItem)).toHaveLength(1);

      viewController.setView(productView.id);
      wrapper.update();

      expect(wrapper.find(ProductItem)).toHaveLength(1);
      expect(wrapper.find(ContainerItem)).toHaveLength(1);
    });
  });
});
