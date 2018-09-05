// @flow

import React from 'react';
import { mount } from 'enzyme';
import { HashRouter } from 'react-router-dom';

import LayoutManagerWithViewController from '../../LayoutManagerWithViewController';

import {
  DefaultGlobalNavigation,
  ProjectSwitcher,
} from '../../../../../examples/shared/components';

import { NavigationProvider } from '../../../../index';

describe('LayoutManagerWithViewController', () => {
  let wrapper;
  let originalLocalStorage;

  let onCollapseStart;
  let onCollapseEnd;
  let onExpandStart;
  let onExpandEnd;

  beforeEach(() => {
    originalLocalStorage = global.localStorage;

    global.localStorage = {
      setItem: Function.prototype,
      getItem: Function.prototype,
      clear: Function.prototype,
      removeItem: Function.prototype,
      key: Function.prototype,
    };

    jest.spyOn(global.localStorage, 'setItem');
    jest.spyOn(global.localStorage, 'getItem');

    onCollapseStart = jest.fn();
    onCollapseEnd = jest.fn();
    onExpandStart = jest.fn();
    onExpandEnd = jest.fn();

    wrapper = mount(
      <HashRouter>
        <NavigationProvider
          initialPeekViewId="root/index"
          isDebugEnabled={false}
        >
          <LayoutManagerWithViewController
            customComponents={{ ProjectSwitcher }}
            globalNavigation={DefaultGlobalNavigation}
            firstSkeletonToRender={'product'}
            onCollapseStart={onCollapseStart}
            onCollapseEnd={onCollapseEnd}
            onExpandStart={onExpandStart}
            onExpandEnd={onExpandEnd}
          >
            <p>
              Children requires to have `NavigationProvider` as a parent Because
              of `unstated`. This is an issue
            </p>
          </LayoutManagerWithViewController>
        </NavigationProvider>
      </HashRouter>,
    );
  });

  afterEach(() => {
    global.localStorage.setItem.mockRestore();
    global.localStorage.getItem.mockRestore();

    global.localStorage = originalLocalStorage;

    onCollapseStart.mockReset();
    onCollapseEnd.mockReset();
    onExpandStart.mockReset();
    onExpandEnd.mockReset();
  });

  it('should render global navigation based on using `globalNavigation` as a reference', () => {
    expect(wrapper.find(DefaultGlobalNavigation).length).toBe(1);
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
        <HashRouter>
          <NavigationProvider
            initialPeekViewId="root/index"
            isDebugEnabled={false}
          >
            <LayoutManagerWithViewController
              customComponents={{ ProjectSwitcher }}
              globalNavigation={DefaultGlobalNavigation}
              firstSkeletonToRender={'container'}
            >
              <p>
                Children requires to have `NavigationProvider` as a parent
                Because of `unstated`. This is an issue
              </p>
            </LayoutManagerWithViewController>
          </NavigationProvider>
        </HashRouter>,
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

  describe('Passing Props to LayerManager', () => {
    it('should pass Collapse Listeners props', () => {
      const layoutManager = wrapper.find('LayoutManager');

      onCollapseStart(200);
      onCollapseEnd(0);
      onExpandStart(0);
      onExpandEnd(200);

      expect(layoutManager.props().onCollapseStart).toBeCalledWith(200);
      expect(layoutManager.props().onCollapseEnd).toBeCalledWith(0);
      expect(layoutManager.props().onExpandStart).toBeCalledWith(0);
      expect(layoutManager.props().onExpandEnd).toBeCalledWith(200);
    });
  });
});
