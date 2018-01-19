// @flow
import React from 'react';
import GlobalItem from '../src/components/js/GlobalItem';
import DefaultLinkComponent from '../src/components/js/DefaultLinkComponent';
import GlobalItemInner from '../src/components/styled/GlobalItemInner';
import { shallowWithTheme, mountWithRootTheme } from './_theme-util';

describe('<GlobalItem />', () => {
  describe('rendering', () => {
    it('if no href prop supplied, renders a GlobalItemInner (with tabIndex 0) and no DefaultLinkComponent', () => {
      const wrapper = mountWithRootTheme(<GlobalItem />);
      expect(
        wrapper
          .find(GlobalItemInner)
          .find('button')
          .exists(),
      ).toBe(true);
      expect(wrapper.find(DefaultLinkComponent).exists()).toBe(false);
    });
    it('if href prop supplied, renders a DefaultLinkComponent containing a GlobalItemInner (without tabIndex', () => {
      const wrapper = mountWithRootTheme(<GlobalItem href="/" />);
      expect(wrapper.find(DefaultLinkComponent).exists()).toBe(true);
    });
  });

  describe('props', () => {
    describe('size', () => {
      it('default size prop is small', () => {
        expect(
          shallowWithTheme(<GlobalItem />)
            .find(GlobalItemInner)
            .props().size,
        ).toBe('small');
      });

      ['small', 'medium', 'large'].forEach(supportedSize => {
        it(`${supportedSize} size prop renders small global item`, () => {
          const wrapper = shallowWithTheme(<GlobalItem size={supportedSize} />);
          expect(wrapper.find(GlobalItemInner).prop('size')).toBe(
            supportedSize,
          );
        });
      });
    });

    describe('linkComponent', () => {
      it('defaults to the internal DefaultLinkComponent', () => {
        const item = mountWithRootTheme(
          <GlobalItem href="http://google.com" />,
        );
        expect(item.find(DefaultLinkComponent).prop('href')).toBe(
          'http://google.com',
        );
      });

      it('can be used to render an arbitrary link', () => {
        const item = mountWithRootTheme(
          <GlobalItem
            href="http://google.com"
            linkComponent={({ href, children }) => (
              <a href={href} data-foo="foo">
                {children}
              </a>
            )}
            role="button"
            aria-haspopup="true"
          />,
        );
        expect(item.find('[data-foo]').length).toBe(1);
        expect(item.find('linkComponent').prop('href')).toBe(
          'http://google.com',
        );
        expect(item.find('linkComponent').prop('role')).toBe('button');
        expect(item.find('linkComponent').prop('aria-haspopup')).toBe('true');
      });
    });

    describe('aria-haspopup', () => {
      it('is not applied by default', () => {
        const wrapper = mountWithRootTheme(<GlobalItem />);
        expect(wrapper.find(GlobalItemInner).prop('aria-haspopup')).toBe(
          undefined,
        );
      });
      it('is applied by to GlobalItemInner if no href prop supplied', () => {
        const wrapper = mountWithRootTheme(<GlobalItem aria-haspopup="true" />);
        expect(wrapper.find(GlobalItemInner).prop('aria-haspopup')).toBe(
          'true',
        );
      });
      it('is applied by to DefaultLinkComponent if href prop supplied', () => {
        const wrapper = mountWithRootTheme(
          <GlobalItem href="/" aria-haspopup="true" />,
        );
        expect(wrapper.find(DefaultLinkComponent).prop('aria-haspopup')).toBe(
          'true',
        );
      });
    });

    describe('role', () => {
      it('is not applied by default', () => {
        const wrapper = mountWithRootTheme(<GlobalItem />);
        expect(wrapper.find(GlobalItemInner).prop('role')).toBe(undefined);
      });
      it('is applied by to GlobalItemInner if no href prop supplied', () => {
        // eslint-disable-next-line jsx-a11y/aria-role
        const wrapper = mountWithRootTheme(<GlobalItem role="button" />);
        expect(wrapper.find(GlobalItemInner).prop('role')).toBe('button');
      });
      it('is applied by to DefaultLinkComponent if href prop supplied', () => {
        // eslint-disable-next-line jsx-a11y/aria-role
        const wrapper = mountWithRootTheme(
          <GlobalItem href="/" role="button" />,
        );
        expect(wrapper.find(DefaultLinkComponent).prop('role')).toBe('button');
      });
    });

    describe('onClick', () => {
      it('is called when GlobalItemInner is clicked if no href prop supplied', () => {
        const spy = jest.fn();
        const wrapper = mountWithRootTheme(<GlobalItem onClick={spy} />);
        wrapper.find(GlobalItemInner).simulate('click');
        expect(spy).toHaveBeenCalled();
      });
      it('is called when DefaultLinkComponent is clicked if href prop supplied', () => {
        const spy = jest.fn();
        const wrapper = mountWithRootTheme(
          <GlobalItem href="/" onClick={spy} />,
        );
        wrapper.find(DefaultLinkComponent).simulate('click');
        expect(spy).toHaveBeenCalled();
      });
      it('is called when Enter pressed on GlobalItemInner if no href prop supplied', () => {
        const spy = jest.fn();
        const wrapper = mountWithRootTheme(<GlobalItem onClick={spy} />);
        wrapper.find(GlobalItemInner).simulate('keydown', { key: 'Enter' });
        expect(spy).toHaveBeenCalled();
      });
      it('is called when Enter pressed on DefaultLinkComponent if href prop supplied', () => {
        const spy = jest.fn();
        const wrapper = mountWithRootTheme(
          <GlobalItem href="/" onClick={spy} />,
        );
        wrapper
          .find(DefaultLinkComponent)
          .simulate('keydown', { key: 'Enter' });
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('onMouseDown', () => {
      it('is called when GlobalItemInner is clicked if no href prop supplied', () => {
        const spy = jest.fn();
        const wrapper = mountWithRootTheme(<GlobalItem onMouseDown={spy} />);
        wrapper.find(GlobalItemInner).simulate('mousedown');
        expect(spy).toHaveBeenCalled();
      });
      it('is called when DefaultLinkComponent is clicked if href prop supplied', () => {
        const spy = jest.fn();
        const wrapper = mountWithRootTheme(
          <GlobalItem href="/" onMouseDown={spy} />,
        );
        wrapper.find(DefaultLinkComponent).simulate('mousedown');
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('isSelected', () => {
      it('is passed down to the styled component', () => {
        const styledComponent = shallowWithTheme(
          <GlobalItem isSelected />,
        ).find(GlobalItemInner);
        expect(styledComponent.props().isSelected).toBe(true);
      });
    });
  });
});
