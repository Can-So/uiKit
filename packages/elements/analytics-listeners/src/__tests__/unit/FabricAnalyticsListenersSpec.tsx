import * as React from 'react';
import { mount, shallow } from 'enzyme';
import FabricAnalyticsListeners from '../../FabricAnalyticsListeners';
import FabricElementsListener from '../../FabricElementsListener';
import AtlaskitListener from '../../atlaskit/AtlaskitListener';
import {
  DummyComponentWithAnalytics,
  DummyComponent,
  IncorrectEventType,
  DummyAtlaskitComponentWithAnalytics,
  DummyNavigationComponentWithAnalytics,
} from '../../../examples/helpers';
import { AnalyticsWebClient } from '../../types';
import { LOG_LEVEL } from '../../helpers/logger';
import { FabricChannel } from '../../index';
import NavigationListener from '../../navigation/NavigationListener';

declare const global: any;

describe('<FabricAnalyticsListeners />', () => {
  let analyticsWebClientMock: AnalyticsWebClient;
  let clientPromise: Promise<AnalyticsWebClient>;

  beforeEach(() => {
    analyticsWebClientMock = {
      sendUIEvent: jest.fn(),
      sendOperationalEvent: jest.fn(),
      sendTrackEvent: jest.fn(),
      sendScreenEvent: jest.fn(),
    };
    clientPromise = Promise.resolve(analyticsWebClientMock);
  });

  describe('FabricAnalyticsListener', () => {
    it('should throw an error when no client is provided', () => {
      const compOnClick = jest.fn();
      expect(() =>
        mount(
          // @ts-ignore
          <FabricAnalyticsListeners>
            <DummyComponentWithAnalytics onClick={compOnClick} />
          </FabricAnalyticsListeners>,
        ),
      ).toThrow();
    });

    it('should log an error when an invalid event type is captured and error logging is enabled', () => {
      const originalConsoleError = global.console.error;
      global.console.error = jest.fn();
      const compOnClick = jest.fn();
      const component = mount(
        <FabricAnalyticsListeners
          client={clientPromise}
          logLevel={LOG_LEVEL.ERROR}
        >
          <IncorrectEventType onClick={compOnClick} />
        </FabricAnalyticsListeners>,
      );

      const analyticsListener = component.find(FabricElementsListener);
      const dummyComponent = analyticsListener.find(DummyComponent);
      expect(dummyComponent).toHaveLength(1);

      dummyComponent.simulate('click');
      expect(global.console.error).toHaveBeenCalledTimes(1);

      global.console.error = originalConsoleError;
    });

    it('should render all listeners', () => {
      const component = shallow(
        <FabricAnalyticsListeners client={clientPromise}>
          <div>Child</div>
        </FabricAnalyticsListeners>,
      );

      expect(component).toMatchSnapshot();
    });

    it('should render a FabricElementsListener', () => {
      const component = shallow(
        <FabricAnalyticsListeners client={clientPromise}>
          <div>Child</div>
        </FabricAnalyticsListeners>,
      );

      const elementsListener = component.find(FabricElementsListener);

      expect(elementsListener).toHaveLength(1);
      expect(elementsListener.props()).toEqual(
        expect.objectContaining({
          client: clientPromise,
        }),
      );
    });

    it('should render an AtlaskitListener', () => {
      const component = shallow(
        <FabricAnalyticsListeners client={clientPromise}>
          <div>Child</div>
        </FabricAnalyticsListeners>,
      );

      const atlaskitListener = component.find(AtlaskitListener);

      expect(atlaskitListener).toHaveLength(1);
      expect(atlaskitListener.props()).toEqual(
        expect.objectContaining({
          client: clientPromise,
        }),
      );
    });

    it('should render a NavigationListener', () => {
      const component = shallow(
        <FabricAnalyticsListeners client={clientPromise}>
          <div>Child</div>
        </FabricAnalyticsListeners>,
      );

      const navigationListener = component.find(NavigationListener);

      expect(navigationListener).toHaveLength(1);
      expect(navigationListener.props()).toEqual(
        expect.objectContaining({
          client: clientPromise,
        }),
      );
    });

    it('should exclude the AtlaskitListener if excludedChannels includes atlaskit', () => {
      const component = shallow(
        <FabricAnalyticsListeners
          client={clientPromise}
          excludedChannels={[FabricChannel.atlaskit]}
        >
          <div>Child</div>
        </FabricAnalyticsListeners>,
      );

      const atlaskitListener = component.find(AtlaskitListener);

      expect(atlaskitListener).toHaveLength(0);

      const elementsListener = component.find(FabricElementsListener);
      expect(elementsListener).toHaveLength(1);
    });

    it('should exclude the ElementsListener if excludedChannels includes elements', () => {
      const component = shallow(
        <FabricAnalyticsListeners
          client={clientPromise}
          excludedChannels={[FabricChannel.elements]}
        >
          <div>Child</div>
        </FabricAnalyticsListeners>,
      );

      const elementsListener = component.find(FabricElementsListener);

      expect(elementsListener).toHaveLength(0);

      const atlaskitListener = component.find(AtlaskitListener);
      expect(atlaskitListener).toHaveLength(1);
    });

    it('should exclude the NavigationListener if excludedChannels includes navigation', () => {
      const component = shallow(
        <FabricAnalyticsListeners
          client={clientPromise}
          excludedChannels={[FabricChannel.navigation]}
        >
          <div>Child</div>
        </FabricAnalyticsListeners>,
      );

      const navigationListener = component.find(NavigationListener);

      expect(navigationListener).toHaveLength(0);

      const atlaskitListener = component.find(AtlaskitListener);
      expect(atlaskitListener).toHaveLength(1);

      const elementsListener = component.find(FabricElementsListener);
      expect(elementsListener).toHaveLength(1);
    });

    it('should exclude both atlaskit and elements listeners if excludedChannels includes both their channels', () => {
      const component = shallow(
        <FabricAnalyticsListeners
          client={clientPromise}
          excludedChannels={[FabricChannel.elements, FabricChannel.atlaskit]}
        >
          <div>Child</div>
        </FabricAnalyticsListeners>,
      );

      const elementsListener = component.find(FabricElementsListener);

      expect(elementsListener).toHaveLength(0);

      const atlaskitListener = component.find(AtlaskitListener);
      expect(atlaskitListener).toHaveLength(0);

      expect(component.find('div').text()).toBe('Child');
    });

    it('should not exclude any listeners if excludeChannels is empty', () => {
      const component = shallow(
        <FabricAnalyticsListeners client={clientPromise} excludedChannels={[]}>
          <div>Child</div>
        </FabricAnalyticsListeners>,
      );

      const elementsListener = component.find(FabricElementsListener);

      expect(elementsListener).toHaveLength(1);

      const atlaskitListener = component.find(AtlaskitListener);
      expect(atlaskitListener).toHaveLength(1);
    });
  });

  describe('<FabricElementsListener />', () => {
    it('should listen and fire a UI event with analyticsWebClient', () => {
      const compOnClick = jest.fn();
      const component = mount(
        <FabricAnalyticsListeners client={clientPromise}>
          <DummyComponentWithAnalytics onClick={compOnClick} />
        </FabricAnalyticsListeners>,
      );

      const analyticsListener = component.find(FabricElementsListener);
      expect(analyticsListener.props()).toHaveProperty('client', clientPromise);

      const dummyComponent = analyticsListener.find(DummyComponent);
      expect(dummyComponent).toHaveLength(1);

      dummyComponent.simulate('click');

      return clientPromise.then(client =>
        expect(client.sendUIEvent).toBeCalled(),
      );
    });
  });

  describe('<AtlaskitListener />', () => {
    it('should listen and fire a UI event with analyticsWebClient', () => {
      const compOnClick = jest.fn();
      const component = mount(
        <FabricAnalyticsListeners client={clientPromise}>
          <DummyAtlaskitComponentWithAnalytics onClick={compOnClick} />
        </FabricAnalyticsListeners>,
      );

      const analyticsListener = component.find(AtlaskitListener);
      expect(analyticsListener.props()).toHaveProperty('client', clientPromise);

      const dummyComponent = analyticsListener.find(DummyComponent);
      expect(dummyComponent).toHaveLength(1);

      dummyComponent.simulate('click');

      return clientPromise.then(client =>
        expect(client.sendUIEvent).toBeCalled(),
      );
    });
  });

  describe('<NavigationListener />', () => {
    it('should listen and fire a UI event with analyticsWebClient', () => {
      const compOnClick = jest.fn();
      const component = mount(
        <FabricAnalyticsListeners client={clientPromise}>
          <DummyNavigationComponentWithAnalytics onClick={compOnClick} />
        </FabricAnalyticsListeners>,
      );

      const analyticsListener = component.find(NavigationListener);
      expect(analyticsListener.props()).toHaveProperty('client', clientPromise);

      const dummyComponent = analyticsListener.find(DummyComponent);
      expect(dummyComponent).toHaveLength(1);

      dummyComponent.simulate('click');

      return clientPromise.then(client =>
        expect(client.sendUIEvent).toBeCalled(),
      );
    });
  });
});
