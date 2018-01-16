import { shallow } from 'enzyme';
import * as React from 'react';
import {
  getComponentClassWithStore,
  mockState,
  mockStore,
} from '../../../mocks';
import { StatelessSidebar, default as ConnectedSidebar } from '../sidebar';
import { ServiceList, Separator } from '../styled';
import SidebarItem from '../item/sidebarItem';

const ConnectedSidebarWithStore = getComponentClassWithStore(ConnectedSidebar);

const createConnectedComponent = () => {
  const store = mockStore();
  const dispatch = store.dispatch;
  const component = shallow(<ConnectedSidebarWithStore store={store} />).find(
    StatelessSidebar,
  );
  return { component, dispatch };
};

describe('<Sidebar />', () => {
  it('should deliver all required props to stateless component', () => {
    const { component } = createConnectedComponent();
    const props = component.props();
    expect(props.selected).toEqual(mockState.view.service.name);
  });

  describe('#render()', () => {
    it('should render ServiceList, 3 SidebarItems and Separator', () => {
      const element = shallow(<StatelessSidebar selected="" />);

      expect(element.find(ServiceList)).toHaveLength(1);
      expect(element.find(SidebarItem)).toHaveLength(3);
      expect(element.find(Separator)).toHaveLength(1);
    });

    it('should use selected prop to pass isActive prop to SidebarItem components', () => {
      const uploadElement = shallow(<StatelessSidebar selected="upload" />);

      const dropBoxElement = shallow(<StatelessSidebar selected="dropbox" />);

      const googleElement = shallow(<StatelessSidebar selected="google" />);

      expect(
        uploadElement
          .find(SidebarItem)
          .find({ serviceName: 'upload' })
          .prop('isActive'),
      ).toBe(true);
      expect(
        uploadElement
          .find(SidebarItem)
          .find({ serviceName: 'dropbox' })
          .prop('isActive'),
      ).toBe(false);
      expect(
        uploadElement
          .find(SidebarItem)
          .find({ serviceName: 'google' })
          .prop('isActive'),
      ).toBe(false);

      expect(
        dropBoxElement
          .find(SidebarItem)
          .find({ serviceName: 'upload' })
          .prop('isActive'),
      ).toBe(false);
      expect(
        dropBoxElement
          .find(SidebarItem)
          .find({ serviceName: 'dropbox' })
          .prop('isActive'),
      ).toBe(true);
      expect(
        dropBoxElement
          .find(SidebarItem)
          .find({ serviceName: 'google' })
          .prop('isActive'),
      ).toBe(false);

      expect(
        googleElement
          .find(SidebarItem)
          .find({ serviceName: 'upload' })
          .prop('isActive'),
      ).toBe(false);
      expect(
        googleElement
          .find(SidebarItem)
          .find({ serviceName: 'dropbox' })
          .prop('isActive'),
      ).toBe(false);
      expect(
        googleElement
          .find(SidebarItem)
          .find({ serviceName: 'google' })
          .prop('isActive'),
      ).toBe(true);
    });
  });
});
