// @flow

import React from 'react';
import { mount } from 'enzyme';
import SearchIcon from '@atlaskit/icon/glyph/search';
import CreateIcon from '@atlaskit/icon/glyph/add';
import StarLargeIcon from '@atlaskit/icon/glyph/star-large';
import NotificationIcon from '@atlaskit/icon/glyph/notification';
import SignInIcon from '@atlaskit/icon/glyph/sign-in';
import QuestionIcon from '@atlaskit/icon/glyph/question-circle';
import GlobalNavigation from '../../index';
import ScreenTracker from '../../../ScreenTracker';

const DrawerContents = () => <div>drawer</div>;
const EmojiAtlassianIcon = () => <button>EmojiAtlassianIcon</button>;

const escKeyDown = () => {
  const event = document.createEvent('Events');
  event.initEvent('keydown', true, true);
  // $FlowFixMe
  event.key = 'Escape';
  global.window.dispatchEvent(event);
};

describe('GlobalNavigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();

    //  Silence GlobalNavigation warnings for improper props
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  describe('Product logo', () => {
    it('should not render product logo when href and onClick are absent', () => {
      const wrapper = mount(
        <GlobalNavigation productIcon={EmojiAtlassianIcon} />,
      );
      const productIcon = wrapper.find(EmojiAtlassianIcon);
      expect(productIcon.exists()).toBeFalsy();
    });

    it('should href for product logo', () => {
      const wrapper = mount(
        <GlobalNavigation
          productIcon={EmojiAtlassianIcon}
          productHref="/testtest"
        />,
      );

      const productIcon = wrapper.find(EmojiAtlassianIcon);
      expect(productIcon.exists()).toBeTruthy();
      expect(wrapper.find('a').props().href).toEqual('/testtest');
    });

    it('should pass both href and onClick for product logo', () => {
      const mockProductClick = jest.fn();
      const wrapper = mount(
        <GlobalNavigation
          productIcon={EmojiAtlassianIcon}
          productHref="/testtest"
          onProductClick={mockProductClick}
        />,
      );

      const productIcon = wrapper.find(EmojiAtlassianIcon);

      expect(productIcon.exists()).toBeTruthy();
      expect(wrapper.find('a').props().href).toEqual('/testtest');

      productIcon.simulate('click');
      expect(mockProductClick).toHaveBeenCalled();
    });
  });

  describe('Drawers', () => {
    const drawerItems = [
      {
        akIcon: SearchIcon,
        capitalisedName: 'Search',
        name: 'search',
      },
      {
        akIcon: CreateIcon,
        capitalisedName: 'Create',
        name: 'create',
      },
      {
        akIcon: StarLargeIcon,
        capitalisedName: 'Starred',
        name: 'starred',
      },
      {
        akIcon: NotificationIcon,
        capitalisedName: 'Notification',
        name: 'notification',
      },
    ];

    drawerItems.forEach(({ name, akIcon, capitalisedName }) => {
      describe(`"${name}" drawer`, () => {
        it(`should not add "${name}" icon if both "on${capitalisedName}Click" and "${name}DrawerContents" are absent`, () => {
          // Testing onXClick and XDrawerContents props (negative)
          const props = {
            [`${name}Tooltip`]: 'test tooltip',
          };
          const wrapper = mount(<GlobalNavigation {...props} />);
          const icon = wrapper.find(akIcon);
          expect(icon.exists()).toBeFalsy();
        });

        it(`should not bind "${name}Drawer" when "on${capitalisedName}Click" prop is passed`, () => {
          // Testing onXClick positive
          const props = {
            [`on${capitalisedName}Click`]: jest.fn(),
          };
          const wrapper = mount(<GlobalNavigation {...props} />);
          expect(wrapper.find(DrawerContents).exists()).toBeFalsy();

          const icon = wrapper.find(akIcon);
          expect(icon.exists()).toBeTruthy();
          icon.simulate('click');

          expect(props[`on${capitalisedName}Click`]).toHaveBeenCalled();
          expect(wrapper.find(DrawerContents).exists()).toBeFalsy();
        });

        it(`should honour the shouldUnmountOnExit prop for "${name}" drawer`, () => {
          // test shouldXUnmountOnExit
          const props = {
            [`${name}DrawerContents`]: DrawerContents,
            [`on${capitalisedName}DrawerClose`]: jest.fn(),
            [`on${capitalisedName}DrawerOpen`]: jest.fn(),
          };
          const wrapper = mount(<GlobalNavigation {...props} />);

          const icon = wrapper.find(akIcon);
          icon.simulate('click');
          expect(
            wrapper.find('DrawerBase').props().shouldUnmountOnExit,
          ).toBeFalsy();

          wrapper.setProps({
            [`should${capitalisedName}DrawerUnmountOnExit`]: true,
          });
          wrapper.update();
          expect(
            wrapper.find('DrawerBase').props().shouldUnmountOnExit,
          ).toBeTruthy();
        });

        describe('uncontrolled', () => {
          it(`should open "${name}" drawer when "${name}" icon is clicked`, () => {
            // Testing XDrawerContents positive
            const props = {
              [`${name}DrawerContents`]: DrawerContents,
            };
            const wrapper = mount(<GlobalNavigation {...props} />);
            expect(wrapper.find(DrawerContents).exists()).toBeFalsy();

            const icon = wrapper.find(akIcon);
            icon.simulate('click');

            expect(wrapper.find(DrawerContents).exists()).toBeTruthy();
          });

          it(`should trigger drawer "on${capitalisedName}DrawerOpen" for uncontrolled "${name}" drawer`, () => {
            // Test  onXDrawerClose, onXDrawerOpen
            const props = {
              [`${name}DrawerContents`]: DrawerContents,
              [`on${capitalisedName}DrawerOpen`]: jest.fn(),
            };
            const wrapper = mount(<GlobalNavigation {...props} />);

            const icon = wrapper.find(akIcon);
            icon.simulate('click');
            expect(props[`on${capitalisedName}DrawerOpen`]).toHaveBeenCalled();
          });

          it(`should fire drawer "on${capitalisedName}DrawerClose" for uncontrolled "${name}" drawer`, () => {
            // Test  onXDrawerClose, onXDrawerOpen
            const props = {
              [`${name}DrawerContents`]: DrawerContents,
              [`on${capitalisedName}DrawerClose`]: jest.fn(),
            };
            const wrapper = mount(<GlobalNavigation {...props} />);

            const icon = wrapper.find(akIcon);
            icon.simulate('click');
            escKeyDown();

            expect(props[`on${capitalisedName}DrawerClose`]).toHaveBeenCalled();
          });
        });

        describe('Controlled', () => {
          it(`should allow "${name}" drawer to be controlled by passing "is${capitalisedName}DrawerOpen"`, () => {
            // Test onXClick, onXDrawerClose, isXDrawerOpen
            const props = {
              [`${name}DrawerContents`]: DrawerContents,
              [`is${capitalisedName}DrawerOpen`]: false,
              [`on${capitalisedName}Click`]: jest.fn(),
            };
            const wrapper = mount(<GlobalNavigation {...props} />);
            expect(wrapper.find(DrawerContents).exists()).toBeFalsy();

            const icon = wrapper.find(akIcon);
            icon.simulate('click');
            expect(props[`on${capitalisedName}Click`]).toHaveBeenCalled();
            // Assert that it should not behave as an uncontrolled drawer
            expect(wrapper.find(DrawerContents).exists()).toBeFalsy();
          });

          it(`should display "${name}" drawer when "is${capitalisedName}DrawerOpen" is true`, () => {
            const props = {
              [`${name}DrawerContents`]: DrawerContents,
              [`is${capitalisedName}DrawerOpen`]: true,
              [`on${capitalisedName}Click`]: jest.fn(),
            };
            const wrapper = mount(<GlobalNavigation {...props} />);

            expect(wrapper.find(DrawerContents).exists()).toBeTruthy();
          });

          it(`should NOT display "${name}" drawer when "is${capitalisedName}DrawerOpen" is false`, () => {
            const props = {
              [`${name}DrawerContents`]: DrawerContents,
              [`is${capitalisedName}DrawerOpen`]: false,
              [`on${capitalisedName}Click`]: jest.fn(),
            };
            const wrapper = mount(<GlobalNavigation {...props} />);

            // Cannot assert for the drawer to be absent because it is
            // dismounted by ReactTransitionGroup on animationEnd, which is not
            // being captured by enzyme.
            expect(wrapper.find('DrawerPrimitive').props().in).toBeFalsy();
          });

          //  There is no onXOpen callback for controlled drawers. A consumer can
          //  perform necessary callbacks in the onXClick method.

          it(`should trigger "on${capitalisedName}DrawerClose" callback for "${name}" drawer`, () => {
            // Test  onXDrawerClose
            const props = {
              [`is${capitalisedName}DrawerOpen`]: true,
              [`${name}DrawerContents`]: DrawerContents,
              [`on${capitalisedName}DrawerClose`]: jest.fn(),
            };
            const wrapper = mount(<GlobalNavigation {...props} />);

            wrapper.setProps({
              isSearchDrawerOpen: false,
            });
            wrapper.update();
            escKeyDown();
            expect(props[`on${capitalisedName}DrawerClose`]).toHaveBeenCalled();
          });
        });
      });
    });
  });

  describe('Tooltips', () => {
    const customTooltipWrapper = mount(
      <GlobalNavigation
        productIcon={EmojiAtlassianIcon}
        productHref="#"
        productTooltip="product tooltip"
        onProductClick={() => console.log('product clicked')}
        createTooltip="create tooltip"
        onCreateClick={() => console.log('create clicked')}
        searchTooltip="search tooltip"
        onSearchClick={() => console.log('search clicked')}
        starredTooltip="starred tooltip"
        onStarredClick={() => console.log('your work clicked')}
        notificationTooltip="notification tooltip"
        onNotificationClick={() => console.log('notification clicked')}
        profileTooltip="profile tooltip"
        loginHref="#login"
        helpItems={() => <div>items</div>}
        helpTooltip="help tooltip"
      />,
    );
    const defaultWrapper = mount(
      <GlobalNavigation
        productIcon={EmojiAtlassianIcon}
        productHref="#"
        onProductClick={() => console.log('product clicked')}
        onCreateClick={() => console.log('create clicked')}
        onSearchClick={() => console.log('search clicked')}
        onStarredClick={() => console.log('your work clicked')}
        onNotificationClick={() => console.log('notification clicked')}
        loginHref="#login"
        helpItems={() => <div>items</div>}
      />,
    );

    const navItems = [
      {
        icon: EmojiAtlassianIcon,
        name: 'product',
        defaultTooltip: 'Atlassian',
      },
      {
        icon: StarLargeIcon,
        name: 'starred',
        defaultTooltip: 'Starred and recent',
      },
      {
        icon: SearchIcon,
        name: 'search',
        defaultTooltip: 'Search',
      },
      {
        icon: CreateIcon,
        name: 'create',
        defaultTooltip: 'Create',
      },
      {
        icon: NotificationIcon,
        name: 'notification',
        defaultTooltip: 'Notifications',
      },
      {
        icon: SignInIcon,
        name: 'profile',
        defaultTooltip: 'Your profile and Settings',
      },
      {
        icon: QuestionIcon,
        name: 'help',
        defaultTooltip: 'Help',
      },
    ];

    navItems.forEach(({ icon, name, defaultTooltip }) => {
      it(`should render default tooltip for "${name}" item`, () => {
        expect(
          defaultWrapper
            .find(icon)
            .parents('Tooltip')
            .props().content,
        ).toBe(defaultTooltip);
        expect(defaultWrapper.find(icon).props().label).toBe(defaultTooltip);
      });
    });

    navItems.forEach(({ icon, name }) => {
      it(`should render a custom tooltip for "${name}" item`, () => {
        expect(
          customTooltipWrapper
            .find(icon)
            .parents('Tooltip')
            .props().content,
        ).toBe(`${name} tooltip`);
        expect(customTooltipWrapper.find(icon).props().label).toBe(
          `${name} tooltip`,
        );
      });
    });
  });

  describe('Section and ranking of global nav items', () => {
    const wrapper = mount(
      <GlobalNavigation
        productIcon={EmojiAtlassianIcon}
        productHref="#"
        onProductClick={() => console.log('product clicked')}
        onCreateClick={() => console.log('create clicked')}
        onSearchClick={() => console.log('search clicked')}
        onStarredClick={() => console.log('your work clicked')}
        onNotificationClick={() => console.log('notification clicked')}
        loginHref="#login"
        helpItems={() => <div>items</div>}
      />,
    );
    const navItems = [
      {
        id: 'productLogo',
        name: 'product',
        section: 'primary',
        rank: 1,
      },
      {
        id: 'starDrawer',
        name: 'starred',
        section: 'primary',
        rank: 2,
      },
      {
        id: 'quickSearch',
        name: 'search',
        section: 'primary',
        rank: 3,
      },
      {
        id: 'create',
        name: 'create',
        section: 'primary',
        rank: 4,
      },
      {
        id: 'notifications',
        name: 'notification',
        section: 'secondary',
        rank: 1,
      },
      {
        id: 'profile',
        name: 'profile',
        section: 'secondary',
        rank: 3,
      },
      {
        id: 'help',
        name: 'help',
        section: 'secondary',
        rank: 2,
      },
    ];

    navItems.forEach(({ id, section, rank, name }) => {
      const globalSection =
        section === 'primary' ? 'PrimaryItemsList' : 'SecondaryItemsList';

      it(`should pick up section for "${name}" from defaultConfig`, () => {
        expect(
          wrapper
            .find(`[id="${id}"]`)
            .filter('GlobalItemBase')
            .parents()
            .exists(globalSection),
        ).toBeTruthy();
      });

      it(`should pick up rank for "${name}" from defaultConfig`, () => {
        expect(
          wrapper
            .find(globalSection)
            .find('GlobalItemBase')
            .at(rank - 1) // arrays start at 0
            .is(`[id="${id}"]`),
        ).toBeTruthy();
      });
    });
  });

  describe('Notification', () => {
    it('should handle the notificationCount prop', () => {
      const wrapper = mount(
        <GlobalNavigation
          onNotificationClick={() => {}}
          notificationCount={5}
        />,
      );
      expect(wrapper.find('Badge').text()).toEqual('5');
    });

    it('should show "9+" when notificationCount is more than 10', () => {
      const wrapper = mount(
        <GlobalNavigation
          onNotificationClick={() => {}}
          notificationCount={15}
        />,
      );

      expect(wrapper.find('Badge').text()).toEqual('9+');
    });

    it('should not show a badge when notificationCount is 0', () => {
      const wrapper = mount(
        <GlobalNavigation
          onNotificationClick={() => {}}
          notificationCount={0}
        />,
      );
      expect(wrapper.find('Badge').exists()).toBeFalsy();
    });
  });

  describe('AppSwitcher', () => {
    it('should not render AppSwitcher when appSwitcherComponent is missing', () => {
      const wrapper = mount(
        <GlobalNavigation appSwitcherTooltip="appSwitcher tooltip" />,
      );
      expect(wrapper.find('[id="appSwitcher"]').exists()).toBeFalsy();
    });

    const AppSwitcher = () => <div />;
    AppSwitcher.displayName = 'AppSwitcher';
    const defaultWrapper = mount(
      <GlobalNavigation
        productIcon={EmojiAtlassianIcon}
        productHref="#"
        onProductClick={() => console.log('product clicked')}
        onCreateClick={() => console.log('create clicked')}
        onSearchClick={() => console.log('search clicked')}
        onStarredClick={() => console.log('your work clicked')}
        onNotificationClick={() => console.log('notification clicked')}
        appSwitcherComponent={AppSwitcher}
        appSwitcherTooltip="appSwitcher tooltip"
        loginHref="#login"
        helpItems={() => <div>items</div>}
      />,
    );
    it('should render the AppSwitcher component', () => {
      expect(defaultWrapper.children().exists(AppSwitcher)).toBeTruthy();
    });

    it('should render the correct tooltip', () => {
      // AppSwitcher doesn't have a default tooltip in global navigation as it's handled by the base app switcher component
      expect(defaultWrapper.find(AppSwitcher).props().label).toBe(
        'appSwitcher tooltip',
      );
      expect(defaultWrapper.find(AppSwitcher).props().tooltip).toBe(
        'appSwitcher tooltip',
      );
    });
    it('should render in SecondaryItemsList by default', () => {
      expect(
        defaultWrapper
          .find(AppSwitcher)
          .parents()
          .exists('SecondaryItemsList'),
      ).toBeTruthy();
    });

    it('should render at 2nd position in the SecondaryItemsList by default', () => {
      const appSwitcherRank = 2;
      expect(
        defaultWrapper
          .find('SecondaryItemsList')
          .find('AnalyticsContext')
          .children()
          .at(appSwitcherRank - 1) // arrays start at 0
          .is('[id="appSwitcher"]'),
      ).toBeTruthy();
    });
  });

  describe('Help', () => {
    it('should render help menu when "helpItems" is passed', () => {
      const HelpItems = () => <div />;
      HelpItems.displayName = 'HelpItems';
      const wrapper = mount(<GlobalNavigation helpItems={HelpItems} />);

      expect(wrapper.find('[id="help"]').exists()).toBeTruthy();
      expect(wrapper.children().exists(HelpItems)).toBeTruthy();
      expect(wrapper.children().exists('DropdownItem')).toBeTruthy();
    });

    it('should not render help menu when "helpItems" is not passed', () => {
      const wrapper = mount(<GlobalNavigation helpTooltip="help tooltip" />);
      expect(wrapper.find('[id="help"]').exists()).toBeFalsy();
    });
  });

  describe('Profile', () => {
    it('should render neither avatar nor login icon if loginHref and profileItems are missing', () => {
      const wrapper = mount(
        <GlobalNavigation profileTooltip="profile tooltip" />,
      );
      expect(wrapper.find('[id="profile"]').exists()).toBeFalsy();
    });

    it('should render login icon if loginHref is passed', () => {
      const wrapper = mount(
        <GlobalNavigation
          loginHref="/test_login"
          profileTooltip="profile tooltip"
        />,
      );
      expect(wrapper.find('[id="profile"]').exists()).toBeTruthy();
      expect(wrapper.find('a[href="/test_login"]').exists()).toBeTruthy();
      expect(wrapper.find('SignInIcon').exists()).toBeTruthy();
    });

    it('should render dropdown menu if profileItems is passed', () => {
      const ProfileItems = () => <div />;
      const wrapper = mount(
        <GlobalNavigation
          profileItems={ProfileItems}
          profileTooltip="profile tooltip"
        />,
      );
      expect(wrapper.find('[id="profile"]').exists()).toBeTruthy();
      expect(wrapper.children().exists(ProfileItems)).toBeTruthy();
      expect(wrapper.children().exists('DropdownItem')).toBeTruthy();
    });

    it('should show default avatar when profileIconUrl is missing', () => {
      const ProfileItems = () => <div />;
      const wrapper = mount(<GlobalNavigation profileItems={ProfileItems} />);
      expect(wrapper.find('DefaultImage').exists()).toBeTruthy();
    });

    it('should show profile photo when profileIconUrl is present', () => {
      const ProfileItems = () => <div />;
      const wrapper = mount(
        <GlobalNavigation
          profileItems={ProfileItems}
          profileIconUrl="//url.to.image/fancy"
        />,
      );

      expect(wrapper.find('DefaultImage').exists()).toBeFalsy();
      expect(wrapper.find('Avatar').props().src).toEqual(
        '//url.to.image/fancy',
      );
    });
  });

  describe('Analytics', () => {
    it('should call fireDrawerDismissedEvents when drawer is closed', () => {
      const mockFireDrawerDismissedEvents = jest.fn();
      jest.doMock('../../analytics', () => ({
        fireDrawerDismissedEvents: mockFireDrawerDismissedEvents,
        analyticsIdMap: {},
      }));

      const GlobalNavigationWithMock = require('../../index').default;
      const wrapper = mount(
        <GlobalNavigationWithMock searchDrawerContents={DrawerContents} />,
      );

      const searchIcon = wrapper.find('SearchIcon');
      searchIcon.simulate('click');

      expect(mockFireDrawerDismissedEvents).not.toHaveBeenCalled();

      escKeyDown();

      expect(mockFireDrawerDismissedEvents).toHaveBeenCalledWith(
        'search',
        expect.objectContaining({
          payload: expect.objectContaining({
            action: 'dismissed',
            actionSubject: 'drawer',
            attributes: expect.objectContaining({
              trigger: 'escKey',
            }),
          }),
        }),
      );
    });

    [
      {
        drawerName: 'search',
        analyticsId: 'quickSearchDrawer',
      },
      {
        drawerName: 'create',
        analyticsId: 'createDrawer',
      },
      {
        drawerName: 'notification',
        analyticsId: 'notificationsDrawer',
      },
      {
        drawerName: 'starred',
        analyticsId: 'starDrawer',
      },
    ].forEach(({ drawerName, analyticsId }) => {
      it(`should render ScreenTracker with correct props for "${drawerName}" drawer when drawer is open`, () => {
        const capitalisedDrawerName = `${drawerName[0].toUpperCase()}${drawerName.slice(
          1,
        )}`;
        const isOpenPropName = `is${capitalisedDrawerName}DrawerOpen`;
        const props = {
          [`${drawerName}DrawerContents`]: DrawerContents,
          [`on${capitalisedDrawerName}Click`]: () => {},
          [isOpenPropName]: false,
        };

        const wrapper = mount(<GlobalNavigation {...props} />);
        expect(wrapper.find(ScreenTracker).exists()).toBeFalsy();
        wrapper.setProps({
          [isOpenPropName]: true,
        });
        wrapper.update();

        const screenTracker = wrapper.find(ScreenTracker);
        expect(screenTracker.exists()).toBeTruthy();
        expect(screenTracker.props()).toEqual({
          name: analyticsId,
          isVisible: true,
        });

        wrapper.setProps({
          [isOpenPropName]: false,
        });
        wrapper.update();
        expect(wrapper.find(ScreenTracker).props()).toEqual({
          name: analyticsId,
          isVisible: false,
        });
      });
    });
  });
});
