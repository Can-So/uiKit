// @flow
import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';

import Tabs, { TabsStateless } from '../src/index';
import { sampleTabsNoDefault, sampleTabsDefaultSelected } from './_constants';
import { name } from '../package.json';
import { NavItem } from '../src/styled';

describe(name, () => {
  describe('Tabs', () => {
    describe('construction', () => {
      it('should be able to create a component', () => {
        const wrapper = shallow(<Tabs />);
        expect(wrapper).not.toBe(undefined);
        expect(wrapper.instance()).toBeInstanceOf(Component);
      });

      it('should render the TabsStateless', () => {
        const wrapper = shallow(<Tabs tabs={sampleTabsDefaultSelected} />);
        const statelessTabs = wrapper.find(TabsStateless);
        expect(statelessTabs).toHaveLength(1);
      });
    });

    describe('props', () => {
      describe('tabs prop', () => {
        it('is reflected to the TabsStateless with no selection when no defaultSelected tab is specified', () => {
          const wrapper = shallow(<Tabs tabs={sampleTabsNoDefault} />);
          expect(
            wrapper
              .find(TabsStateless)
              .prop('tabs')
              .filter(tab => tab.isSelected).length,
          ).toBe(0);
        });

        it('is reflected to the TabsStateless with no selection when isSelected tab is specified', () => {
          const wrapper = shallow(<Tabs tabs={sampleTabsNoDefault} />);
          expect(
            wrapper
              .find(TabsStateless)
              .prop('tabs')
              .filter(tab => tab.isSelected).length,
          ).toBe(0);
        });

        it('is reflected to the TabsStateless with selection when defaultSelected is specified', () => {
          const wrapper = shallow(<Tabs tabs={sampleTabsDefaultSelected} />);
          expect(
            wrapper
              .find(TabsStateless)
              .prop('tabs')
              .filter(tab => tab.isSelected).length,
          ).toBe(1);
          expect(wrapper.find(TabsStateless).prop('tabs')[1].isSelected).toBe(
            true,
          );
        });

        it('is reflected to the TabsStateless with selection when defaultSelected is specified and the first tab is selected', () => {
          const wrapper = shallow(<Tabs tabs={sampleTabsDefaultSelected} />);
          wrapper.setState({ selectedTab: 0 });
          expect(
            wrapper
              .find(TabsStateless)
              .prop('tabs')
              .filter(tab => tab.isSelected).length,
          ).toBe(1);
          expect(wrapper.find(TabsStateless).prop('tabs')[0].isSelected).toBe(
            true,
          );
        });
      });

      describe('onSelect prop', () => {
        it('is not fired for default selected tab', () => {
          const spy = jest.fn();
          mount(<Tabs onSelect={spy} tabs={sampleTabsDefaultSelected} />);
          expect(spy).not.toHaveBeenCalled();
        });
        it('is fired with selected tab index when new tab selected by click', () => {
          const spy = jest.fn();
          const wrapper = mount(
            <Tabs onSelect={spy} tabs={sampleTabsDefaultSelected} />,
          );

          // Clicks on the tab at index 2, then checks that the spy is called with 2 as argument
          wrapper
            .find(NavItem)
            .at(2)
            .simulate('click');
          expect(spy).toHaveBeenCalledTimes(1);
          expect(spy).toHaveBeenCalledWith(2);
        });
        it('is fired with selected tab index when new tab selected by keyboard', () => {
          const spy = jest.fn();
          const wrapper = mount(
            <Tabs onSelect={spy} tabs={sampleTabsDefaultSelected} />,
          );

          // Triggers right arrow click on the tabs, then checks that handler prop was called
          // with correct new selected tab index
          wrapper
            .find(NavItem)
            .at(1)
            .simulate('keyDown', {
              key: 'ArrowRight',
            });
          expect(spy).toHaveBeenCalledTimes(1);
          expect(spy).toHaveBeenCalledWith(2);
        });
      });
    });

    describe('behaviour', () => {
      describe('keyboard navigation', () => {
        describe('with 3 tabs, when the 2nd tab is selected', () => {
          let wrapper;
          const simulateKeyboardNav = key => {
            wrapper
              .find(NavItem)
              .findWhere(n => n.prop('isSelected'))
              .simulate('keyDown', { key });
          };

          beforeEach(() => {
            wrapper = mount(<Tabs tabs={sampleTabsDefaultSelected} />);
          });

          it('pressing LEFT arrow selects the first tab', () => {
            expect(wrapper.state().selectedTab).toBe(1);
            simulateKeyboardNav('ArrowLeft');
            expect(wrapper.state().selectedTab).toBe(0);
          });

          it('pressing the RIGHT arrow selects the last tab', () => {
            expect(wrapper.state().selectedTab).toBe(1);
            simulateKeyboardNav('ArrowRight');
            expect(wrapper.state().selectedTab).toBe(2);
          });

          it('pressing the LEFT arrow twice leaves selection on the first tab', () => {
            expect(wrapper.state().selectedTab).toBe(1);
            simulateKeyboardNav('ArrowLeft');
            simulateKeyboardNav('ArrowLeft');
            expect(wrapper.state().selectedTab).toBe(0);
          });

          it('pressing the RIGHT arrow twice leaves selection on the last tab', () => {
            expect(wrapper.state().selectedTab).toBe(1);
            simulateKeyboardNav('ArrowRight');
            simulateKeyboardNav('ArrowRight');
            expect(wrapper.state().selectedTab).toBe(2);
          });
        });
      });
    });
  });
});
