import * as React from 'react';
import { mount } from 'enzyme';
import { Subject } from 'rxjs/Subject';
import Blanket from '@atlaskit/blanket';
import { MediaItem, MediaItemType, LinkItem } from '@atlaskit/media-core';
import { waitUntil } from '@atlaskit/media-test-helpers';
import { Stubs } from '../_stubs';
import { MediaViewer } from '../../src/newgen/media-viewer';
import { MediaViewerRenderer } from '../../src/newgen/media-viewer-renderer';

function createContext(subject, blobService?) {
  const token = 'some-token';
  const clientId = 'some-client-id';
  const serviceHost = 'some-service-host';
  const authProvider = jest.fn(() => Promise.resolve({ token, clientId }));
  const contextConfig = {
    serviceHost,
    authProvider,
  };
  return Stubs.context(
    contextConfig,
    undefined,
    subject && Stubs.mediaItemProvider(subject),
    blobService,
  ) as any;
}

function createFixture(identifier) {
  const subject = new Subject<MediaItem>();
  const blobService = Stubs.blobService();
  const context = createContext(subject, blobService);
  const onClose = jest.fn();
  const el = mount(
    <MediaViewer data={identifier} context={context} onClose={onClose} />,
  );
  return { blobService, subject, context, el, onClose };
}

function getModel(el) {
  return el.find(MediaViewerRenderer).props().model;
}

describe('<MediaViewer />', () => {
  const identifier = {
    id: 'some-id',
    occurrenceKey: 'some-custom-occurrence-key',
    type: 'file' as MediaItemType,
  };

  it('previews an indicator while loading', () => {
    const { el } = createFixture(identifier);
    el.update();

    expect(getModel(el)).toMatchObject({
      fileDetails: {
        status: 'PENDING',
      },
    });
  });

  it('previews a single file when processing was successful', () => {
    const item: MediaItem = {
      type: 'file',
      details: {
        id: 'some-id',
        processingStatus: 'succeeded',
      },
    };
    const { subject, el } = createFixture(identifier);

    subject.next(item);
    el.update();

    expect(getModel(el)).toMatchObject({
      fileDetails: {
        status: 'SUCCESSFUL',
      },
    });
  });

  it('previews an error when processing failed', () => {
    const item: MediaItem = {
      type: 'file',
      details: {
        id: 'some-id',
        processingStatus: 'failed',
      },
    };
    const { subject, el } = createFixture(identifier);

    subject.next(item);
    el.update();

    expect(getModel(el)).toMatchObject({
      fileDetails: {
        status: 'FAILED',
      },
    });
  });

  it('previews an error when opening a link', () => {
    const item: LinkItem = {
      type: 'link',
      details: {} as any,
    };
    const { subject, el } = createFixture(identifier);

    subject.next(item);
    el.update();

    expect(getModel(el)).toMatchObject({
      fileDetails: {
        status: 'FAILED',
      },
    });
  });

  it('previews an error message on error', () => {
    const { subject, el } = createFixture(identifier);

    subject.error(new Error('test'));
    el.update();

    expect(getModel(el)).toMatchObject({
      fileDetails: {
        status: 'FAILED',
      },
    });
  });

  it('assigns an object url when successful', async () => {
    const item: MediaItem = {
      type: 'file',
      details: {
        id: 'some-id',
        processingStatus: 'succeeded',
      },
    };
    const { subject, el } = createFixture(identifier);

    subject.next(item);

    await waitUntil(() => {
      el.update();
      return getModel(el).previewData.status === 'SUCCESSFUL';
    }, 5);

    expect(getModel(el).previewData.data.objectUrl).toBeDefined();
  });

  it('should handle errors', async () => {
    const item: MediaItem = {
      type: 'file',
      details: {
        id: 'some-id',
        processingStatus: 'succeeded',
      },
    };
    const { blobService, subject, el } = createFixture(identifier);

    blobService.fetchImageBlob.mockReturnValue(
      Promise.reject(new Error('error')),
    );

    subject.next(item);

    await waitUntil(() => {
      el.update();
      return getModel(el).previewData.status === 'FAILED';
    }, 5);

    expect(getModel(el).previewData.err).toBeDefined();
  });

  it('should close Media Viewer on click', () => {
    const { el, onClose } = createFixture(identifier);
    el.find(Blanket).simulate('click');
    expect(onClose).toHaveBeenCalled();
  });

  it('unsubscribes from the provider when unmounted', () => {
    const { el, subject } = createFixture(identifier);
    expect(subject.observers).toHaveLength(1);
    el.unmount();
    expect(subject.observers).toHaveLength(0);
  });

  it('resubscribes to the provider when the data property value is changed', () => {
    const identifierCopy = { ...identifier };

    const { el, context } = createFixture(identifier);
    expect(context.getMediaItemProvider).toHaveBeenCalledTimes(1);

    // if the values stay the same, we will not resubscribe
    el.setProps({ data: identifierCopy });
    expect(context.getMediaItemProvider).toHaveBeenCalledTimes(1);

    // ... but if the values change we will resubscribe
    const identifier2 = {
      ...identifier,
      id: 'some-other-id',
    };
    el.setProps({ data: identifier2 });
    expect(context.getMediaItemProvider).toHaveBeenCalledTimes(2);
  });

  it('resubscribes to the provider when a new context is passed', () => {
    const { el } = createFixture(identifier);
    const subject = new Subject<MediaItem>();
    const context = createContext(subject);
    el.setProps({ context });
    expect(context.getMediaItemProvider).toHaveBeenCalledTimes(1);
  });

  it('resets the state when the context property value is changed', () => {
    const { el, subject } = createFixture(identifier);
    const item: MediaItem = {
      type: 'file',
      details: {
        id: 'some-id',
        processingStatus: 'succeeded',
      },
    };

    subject.next(item);
    el.update();

    expect(getModel(el)).toMatchObject({
      fileDetails: {
        status: 'SUCCESSFUL',
      },
    });

    const context = createContext(new Subject<MediaItem>());

    el.setProps({ context });
    el.update();

    expect(getModel(el)).toMatchObject({
      fileDetails: {
        status: 'PENDING',
      },
    });
  });
});
