import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { waitUntil } from '@atlaskit/media-test-helpers';
import {
  withDataURI,
  WithDataURI,
  WithDataURIProps,
  WithDataURIState,
} from '../src/root/withDataURI';

const DemoComponent = () => null; // tslint:disable-line:variable-name
const DemoComponentWithDataURI = withDataURI(DemoComponent); // tslint:disable-line:variable-name

const createDataURIService = () => ({
  fetchImageDataUri: jest.fn(() => Promise.resolve('data:jpg')),
  fetchOriginalDataUri: jest.fn(() => Promise.resolve('data:gif')),
});

const waitUntilDataURIIsTruthy = (
  card: ShallowWrapper<WithDataURIProps, WithDataURIState>,
) => {
  return waitUntil(() => Boolean(card.state().dataURI), 50);
};

describe('WithDataURI', () => {
  describe('.componentWillReceiveProps()', () => {
    it('should attempt to update the dataURI when the dataURIService prop changes', () => {
      const element = shallow<WithDataURIProps, WithDataURIState>(
        <DemoComponentWithDataURI />,
      );

      const instance = element.instance() as WithDataURI;
      const updateDataURI = jest.spyOn(instance, 'updateDataURI');

      instance.componentWillReceiveProps({
        dataURIService: createDataURIService(),
      });

      expect(updateDataURI).toHaveBeenCalledTimes(1);
    });

    it('should attempt to update the dataURI when the metadata prop changes', () => {
      const element = shallow<WithDataURIProps, WithDataURIState>(
        <DemoComponentWithDataURI />,
      );

      const instance = element.instance() as WithDataURI;
      const updateDataURI = jest.spyOn(instance, 'updateDataURI');

      instance.componentWillReceiveProps({ metadata: {} });

      expect(updateDataURI).toHaveBeenCalledTimes(1);
    });

    it('should not attempt to update the dataURI when another prop changes', () => {
      const element = shallow<WithDataURIProps, WithDataURIState>(
        <DemoComponentWithDataURI />,
      );

      const instance = element.instance() as WithDataURI;
      const updateDataURI = jest.spyOn(instance, 'updateDataURI');
      instance.componentWillReceiveProps({ foo: 'bar' });

      expect(updateDataURI).not.toHaveBeenCalled();
    });
  });

  describe('.updateDataURI()', () => {
    it('should clear the dataURI when the metadata is undefined', () => {
      const dataURIService = createDataURIService();

      const metadata = {
        name: 'foobar.gif',
      };

      const element = shallow<WithDataURIProps, WithDataURIState>(
        <DemoComponentWithDataURI
          dataURIService={dataURIService}
          metadata={metadata}
        />,
      );

      element.setState({ dataURI: 'data:png' });

      const instance = element.instance() as WithDataURI;
      instance.updateDataURI({ dataURIService, metadata: undefined });

      expect(element.state().dataURI).toBe(undefined);
    });

    it('should clear the dataURI when the metadata is a link', () => {
      const dataURIService = createDataURIService();

      const metadata = {
        url: 'https://example.com',
        title: 'Example link',
      };

      const element = shallow<WithDataURIProps, WithDataURIState>(
        <DemoComponentWithDataURI
          dataURIService={dataURIService}
          metadata={metadata}
        />,
      );

      element.setState({ dataURI: 'data:png' });
      const instance = element.instance() as WithDataURI;
      instance.updateDataURI({ dataURIService, metadata: undefined });

      expect(element.state().dataURI).toBe(undefined);
    });

    it('should set the dataURI to a GIF when the mimeType indicates the item is a GIF', () => {
      const dataURIService = createDataURIService();

      const metadata = {
        mimeType: 'image/gif',
      };

      const element = shallow<WithDataURIProps, WithDataURIState>(
        <DemoComponentWithDataURI
          dataURIService={dataURIService}
          metadata={metadata}
        />,
      );
      const instance = element.instance() as WithDataURI;
      instance.updateDataURI({ dataURIService, metadata });

      return waitUntilDataURIIsTruthy(element).then(() =>
        expect(element.state().dataURI).toBe('data:gif'),
      );
    });

    it('should set the dataURI to a JPG when the mimeType indicates the item is not a GIF', () => {
      const dataURIService = createDataURIService();

      const metadata = {
        mimeType: 'image/jpeg',
      };

      const element = shallow<WithDataURIProps, WithDataURIState>(
        <DemoComponentWithDataURI
          dataURIService={dataURIService}
          metadata={metadata}
        />,
      );

      const instance = element.instance() as WithDataURI;
      instance.updateDataURI({ dataURIService, metadata });

      return waitUntilDataURIIsTruthy(element).then(() =>
        expect(element.state().dataURI).toBe('data:jpg'),
      );
    });
  });

  describe('.render()', () => {
    it('should pass down dataURI when I have one', () => {
      const element = shallow<WithDataURIProps, WithDataURIState>(
        <DemoComponentWithDataURI />,
      );

      element.setState({ dataURI: 'data:png' });

      expect(element.find(DemoComponent).props().dataURI).toBe('data:png');
    });

    it('should pass down other props when I am passed them', () => {
      const element = shallow<WithDataURIProps, WithDataURIState>(
        <DemoComponentWithDataURI data-test="foobar" />,
      );

      expect(element.find(DemoComponent).prop('data-test')).toBe('foobar');
    });

    it('should not pass down dataURIService when I have one', () => {
      const dataURIService = createDataURIService();

      const element = shallow<WithDataURIProps, WithDataURIState>(
        <DemoComponentWithDataURI dataURIService={dataURIService} />,
      );

      expect(element.find(DemoComponent).prop('dataURIService')).toBe(
        undefined,
      );
    });
  });
});
