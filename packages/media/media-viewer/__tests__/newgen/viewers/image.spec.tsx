import * as React from 'react';
import { mount } from 'enzyme';
import { Subject } from 'rxjs/Subject';
import { FileItem } from '@atlaskit/media-core';
import { Stubs } from '../../_stubs';
import {
  ImageViewer,
  REQUEST_CANCELLED,
} from '../../../src/newgen/viewers/image';

const imageItem: FileItem = {
  type: 'file',
  details: {
    id: 'some-id',
    processingStatus: 'succeeded',
    mediaType: 'image',
  },
};

function createContext(blobService?) {
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
    Stubs.mediaItemProvider(new Subject<FileItem>()),
    blobService,
  ) as any;
}

function createFixture(fetchImageBlobCancelableResponse, cancel?) {
  const blobService = Stubs.blobService();
  blobService.fetchImageBlobCancelable.mockReturnValue({
    response: fetchImageBlobCancelableResponse || Promise.resolve(new Blob()),
    cancel: cancel || jest.fn(),
  });
  const context = createContext(blobService);
  const el = mount(<ImageViewer context={context} item={imageItem} />);
  return { blobService, context, el };
}

async function awaitError(response, expectedMessage) {
  try {
    await response;
  } catch (err) {
    if (err.message !== expectedMessage) {
      throw err;
    }
  }
}

describe('ImageViewer', () => {
  it('assigns an object url for images when successful', async () => {
    const response = Promise.resolve(new Blob());
    const { el } = createFixture(response);

    await response;

    expect(el.state().objectUrl.data).toBeDefined();
  });

  it('shows an error when the image could not be fetched', async () => {
    const response = Promise.reject(new Error('test_error'));
    const { el } = createFixture(response);

    await awaitError(response, 'test_error');

    expect(el.state().objectUrl.err).toBeDefined();
  });

  it('does not update state when image fetch request is cancelled', async () => {
    const response = Promise.reject(new Error(REQUEST_CANCELLED));
    const { el } = createFixture(response);

    el.instance()['preventRaceCondition'] = jest.fn();

    await awaitError(response, REQUEST_CANCELLED);

    expect(el.instance()['preventRaceCondition'].mock.calls.length === 1);
  });

  it('cancels an image fetch request when unmounted', () => {
    const response = new Promise(() => {});
    const cancel = jest.fn();
    const { el } = createFixture(response, cancel);

    el.unmount();

    expect(cancel).toHaveBeenCalled();
  });

  it('revokes an existing object url when unmounted', async () => {
    const response = Promise.resolve(new Blob());
    const { el } = createFixture(response);

    const revokeObjectUrl = jest.fn();
    el.instance()['revokeObjectUrl'] = revokeObjectUrl;

    await response;
    el.unmount();

    expect(revokeObjectUrl).toHaveBeenCalled();
  });
});
