declare var window: any;
import * as util from '../../src/newgen/utils';
const constructAuthTokenUrlSpy = jest.spyOn(util, 'constructAuthTokenUrl');

import * as React from 'react';
import { createContext } from '../_stubs';
import { Observable } from 'rxjs';
import { mount, ReactWrapper } from 'enzyme';
import { MediaItemType, MediaType, FileState } from '@atlaskit/media-core';
import Header from '../../src/newgen/header';
import { FeedbackButton } from '../../src/newgen/feedback-button';
import { MetadataFileName, MetadataSubText } from '../../src/newgen/styled';
import DownloadIcon from '@atlaskit/icon/glyph/download';
import { LeftHeader } from '../../src/newgen/styled';

const identifier = {
  id: 'some-id',
  occurrenceKey: 'some-custom-occurrence-key',
  type: 'file' as MediaItemType,
};

const identifier2 = {
  id: 'some-id-2',
  occurrenceKey: 'some-custom-occurrence-key',
  type: 'file' as MediaItemType,
};

const processedImageState: FileState = {
  id: '123',
  mediaType: 'image',
  mimeType: 'jpeg',
  status: 'processed',
  name: 'my image',
  size: 0,
  artifacts: {},
  binaryUrl: '',
};

describe('<Header />', () => {
  afterEach(() => {
    constructAuthTokenUrlSpy.mockClear();
  });

  it('shows an empty header while loading', () => {
    const context = {
      getFile: () => Observable.empty(),
    } as any;
    const el = mount(<Header context={context} identifier={identifier} />);
    const metadata = el.find(LeftHeader);
    expect(metadata.text()).toEqual('');
  });

  it('resubscribes to the provider when the data property value is changed', () => {
    const context = createContext({
      getFile: () => Observable.of(processedImageState),
    });
    const el = mount(<Header context={context} identifier={identifier} />);
    el.update();
    expect(el.find(MetadataFileName).text()).toEqual('my image');

    expect(context.getFile).toHaveBeenCalledTimes(1);
    el.setProps({ identifier: identifier2 });
    expect(context.getFile).toHaveBeenCalledTimes(2);
  });

  it('component resets initial state when new props are passed', () => {
    const context = createContext({
      getFile: () => Observable.of(processedImageState),
    });
    const el = mount(<Header context={context} identifier={identifier} />);
    expect(el.state().item.status).toEqual('SUCCESSFUL');

    // since the test is executed synchronously
    // let's prevent the second call to getFile form immediately resolving and
    // updating the state to SUCCESSFUL before we run the assertion.
    context.getFile = () => Observable.never();

    el.setProps({ identifier: identifier2 });
    expect(el.state().item.status).toEqual('PENDING');
  });

  describe('Metadata', () => {
    describe('File collectionName', () => {
      it('shows the title when loaded', () => {
        const context = createContext({
          getFile: () => Observable.of(processedImageState),
        });
        const el = mount(<Header context={context} identifier={identifier} />);
        el.update();
        expect(el.find(MetadataFileName).text()).toEqual('my image');
      });

      it('shows unknown if file collectionName not provided on metadata', () => {
        const unNamedImage = {
          ...processedImageState,
          name: '',
        };
        const context = createContext({
          getFile: () => Observable.of(unNamedImage),
        });
        const el = mount(<Header context={context} identifier={identifier} />);
        el.update();
        expect(el.find(MetadataFileName).text()).toEqual('unknown');
      });
    });

    describe('File metadata', () => {
      const testMediaTypeText = (
        mediaType: MediaType,
        expectedText: string,
      ) => {
        const testItem: FileState = {
          id: '123',
          mediaType,
          mimeType: 'jpeg',
          status: 'processed',
          name: 'my item',
          size: 12222222,
          artifacts: {},
          binaryUrl: '',
        };
        const context = createContext({
          getFile: () => Observable.of(testItem),
        });
        const el = mount(<Header context={context} identifier={identifier} />);
        el.update();
        expect(el.find(MetadataSubText).text()).toEqual(
          `${expectedText} · 11.7 MB`,
        );
      };

      it('should render media type text and file size for each media type', () => {
        testMediaTypeText('image', 'image');
        testMediaTypeText('audio', 'audio');
        testMediaTypeText('video', 'video');
        testMediaTypeText('unknown', 'unknown');
        testMediaTypeText('doc', 'document');
      });

      it('should no render file size if not available', () => {
        const noSizeImage = {
          ...processedImageState,
          size: 0,
        };
        const context = createContext({
          getFile: () => Observable.of(noSizeImage),
        });
        const el = mount(<Header context={context} identifier={identifier} />);
        el.update();
        expect(el.find(MetadataSubText).text()).toEqual('image');
      });

      it('should no render media type if not available', () => {
        const noMediaTypeElement = {
          ...processedImageState,
          mediaType: '' as MediaType,
          size: 23232323,
        };
        const context = createContext({
          getFile: () => Observable.of(noMediaTypeElement),
        });
        const el = mount(<Header context={context} identifier={identifier} />);
        el.update();
        expect(el.find(MetadataSubText).text()).toEqual('unknown · 22.2 MB');
      });
    });

    it('shows nothing when metadata failed to be retrieved', () => {
      const context = createContext({
        getFile: () => Observable.throw('something bad happened!'),
      });
      const el = mount(<Header context={context} identifier={identifier} />);
      const metadata = el.find(LeftHeader);
      expect(metadata.text()).toEqual('');
    });

    it('MSW-720: passes the collectionName to getFile', () => {
      const collectionName = 'some-collection';
      const context = createContext({
        getFile: () => Observable.of(processedImageState),
      });
      const identifierWithCollection = { ...identifier, collectionName };
      const el = mount(
        <Header context={context} identifier={identifierWithCollection} />,
      );
      el.update();
      expect(context.getFile).toHaveBeenCalledWith('some-id', {
        collectionName: 'some-collection',
      });
    });
  });

  describe('Feedback button', () => {
    let jquery: any;

    beforeEach(() => {
      jquery = window.jQuery;
    });

    afterEach(() => {
      window.jQuery = jquery;
    });

    it('should not show the feedback button if jQuery is not found in window object', () => {
      const context = createContext({
        getFile: () => Observable.of(processedImageState),
      });
      const el = mount(<Header context={context} identifier={identifier} />);
      expect(el.find(FeedbackButton).html()).toBeNull();
    });

    it('should show the feedback button if jQuery is found in window object', () => {
      const context = createContext({
        getFile: () => Observable.of(processedImageState),
      });
      window.jQuery = {};
      const el = mount(<Header context={context} identifier={identifier} />);
      expect(el.find(FeedbackButton).html()).not.toBeNull();
    });
  });

  describe('Download button', () => {
    const assertDownloadButton = (
      el: ReactWrapper<any, any>,
      enabled: boolean,
    ) => {
      expect(
        el.find({ type: 'button', label: 'Download', isDisabled: !enabled }),
      ).toHaveLength(1);
      expect(el.find(DownloadIcon)).toHaveLength(1);
    };

    it('should show the download button disabled while the item metadata is loading', () => {
      const context = createContext({
        getFile: () => Observable.empty(),
      });
      const el = mount(<Header context={context} identifier={identifier} />);
      el.update();
      assertDownloadButton(el, false);
    });

    it('should show the download button enabled when the item is loaded', () => {
      const context = createContext({
        getFile: () => Observable.of(processedImageState),
      });
      const el = mount(<Header context={context} identifier={identifier} />);
      el.update();
      assertDownloadButton(el, true);
    });

    it('should show the download button disabled when there is an error', () => {
      const context = createContext({
        getFile: () => Observable.throw('something bad happened!'),
      });
      const el = mount(<Header context={context} identifier={identifier} />);
      el.update();
      assertDownloadButton(el, false);
    });

    it('should use a fresh token for the download link', () => {
      const context = createContext({
        getFile: () => Observable.of(processedImageState),
        config: {
          authProvider: jest.fn(),
        },
      });
      const el = mount(<Header context={context} identifier={identifier} />);
      el.update();
      el.find(DownloadIcon).simulate('click');
      expect(context.config.authProvider).toHaveBeenCalled();
    });
  });
});
