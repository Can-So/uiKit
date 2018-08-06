import * as util from '../../../src/newgen/utils';
const constructAuthTokenUrlSpy = jest.spyOn(util, 'constructAuthTokenUrl');

import * as React from 'react';
import { mount } from 'enzyme';
import { createContext } from '../../_stubs';
import { FileItem, Auth } from '@atlaskit/media-core';
import { awaitError } from '@atlaskit/media-test-helpers';
import { AudioViewer } from '../../../src/newgen/viewers/audio';
import Spinner from '@atlaskit/spinner';
import { DefaultCoverWrapper, AudioCover } from '../../../src/newgen/styled';
import { ErrorMessage } from '../../../src/newgen/error';
import Button from '@atlaskit/button';

const token = 'some-token';
const clientId = 'some-client-id';
const baseUrl = 'some-base-url';

const audioItem: FileItem = {
  type: 'file',
  details: {
    id: 'some-id',
    processingStatus: 'succeeded',
    mediaType: 'audio',
    artifacts: {
      'audio.mp3': {
        url: '/audio',
      },
    },
  },
};

const audioItemWithNoArtifacts: FileItem = {
  type: 'file',
  details: {
    id: 'some-id',
    processingStatus: 'succeeded',
    mediaType: 'audio',
    artifacts: {},
  },
};

function createFixture(
  authPromise: Promise<Auth>,
  collectionName?: string,
  item?: FileItem,
) {
  const context = createContext({ authPromise });
  const el = mount(
    <AudioViewer
      context={context}
      item={item || audioItem}
      collectionName={collectionName}
      previewCount={0}
    />,
  );
  return { context, el };
}

describe('Audio viewer', () => {
  afterEach(() => {
    constructAuthTokenUrlSpy.mockClear();
  });

  it('assigns a src for audio files when successful', async () => {
    const authPromise = Promise.resolve({ token, clientId, baseUrl });
    const { el } = createFixture(authPromise);
    await (el as any).instance()['init']();
    el.update();
    expect(el.find('audio').prop('src')).toEqual(
      'some-base-url/audio?client=some-client-id&token=some-token',
    );
  });

  it('shows spinner when pending', async () => {
    const authPromise: any = new Promise(() => {});
    const { el } = createFixture(authPromise);
    el.update();
    expect(el.find(Spinner)).toHaveLength(1);
  });

  it('shows error message with a download button if there is an error displaying the preview', async () => {
    const authPromise = Promise.reject(new Error('test error'));
    const { el } = createFixture(authPromise);
    await awaitError(authPromise, 'test error');
    el.update();
    const errorMessage = el.find(ErrorMessage);
    expect(errorMessage).toHaveLength(1);
    expect(errorMessage.text()).toContain(
      "We couldn't generate a preview for this file",
    );

    // download button
    expect(errorMessage.text()).toContain(
      'Try downloading the file to view it',
    );
    expect(errorMessage.find(Button)).toHaveLength(1);
  });

  it('shows error if no audio artifacts found', async () => {
    const authPromise: any = new Promise(() => {});
    const { el } = createFixture(
      authPromise,
      undefined,
      audioItemWithNoArtifacts,
    );
    el.update();
    const errorMessage = el.find(ErrorMessage);
    expect(errorMessage).toHaveLength(1);
    expect(errorMessage.text()).toContain(
      "We couldn't generate a preview for this file",
    );
  });

  describe('cover', () => {
    it('it should show the default cover while the audio cover is loading', async () => {
      const authPromise = Promise.resolve({ token, clientId, baseUrl });
      const { el } = createFixture(authPromise);
      await (el as any).instance()['init']();
      el.update();
      expect(el.find(DefaultCoverWrapper)).toHaveLength(1);
    });

    it('it should show the default cover when the audio cover is errored', async () => {
      const authPromise = Promise.resolve({ token, clientId, baseUrl });
      const { el } = createFixture(authPromise);
      const instance: any = el.instance();

      instance['loadCover'] = () => Promise.reject('no cover found');
      await instance['init']();
      el.update();
      expect(el.find(DefaultCoverWrapper)).toHaveLength(1);
    });

    it('it should show the audio cover if exists', async () => {
      const authPromise = Promise.resolve({ token, clientId, baseUrl });
      const { el } = createFixture(authPromise);
      const instance: any = el.instance();
      const promiseSrc = Promise.resolve('cover-src');

      instance['loadCover'] = () => promiseSrc;
      await instance['init']();
      await promiseSrc;
      el.update();

      expect(el.find(DefaultCoverWrapper)).toHaveLength(0);
      expect(el.find(AudioCover).prop('src')).toEqual(
        'some-base-url/file/some-id/image?client=some-client-id&token=some-token',
      );
    });

    it('MSW-720: pass the collectionName to calls to constructAuthTokenUrl', async () => {
      const collectionName = 'collectionName';
      const authPromise = Promise.resolve({ token, clientId, baseUrl });
      const { el } = createFixture(authPromise, collectionName);
      const instance: any = el.instance();
      const promiseSrc = Promise.resolve('cover-src');

      instance['loadCover'] = () => promiseSrc;
      await instance['init']();
      await promiseSrc;
      el.update();

      expect(constructAuthTokenUrlSpy.mock.calls[0][2]).toEqual(collectionName);
      expect(constructAuthTokenUrlSpy.mock.calls[1][2]).toEqual(collectionName);
    });

    describe('AutoPlay', () => {
      async function createAutoPlayFixture(previewCount: number) {
        const authPromise = Promise.resolve({ token, clientId, baseUrl });
        const context = createContext({ authPromise });
        const el = mount(
          <AudioViewer
            context={context}
            item={audioItem}
            collectionName="collectionName"
            previewCount={previewCount}
          />,
        );
        const instance: any = el.instance();
        await instance['init']();
        el.update();
        return el;
      }

      it('should auto play when it is the first preview', async () => {
        const el = await createAutoPlayFixture(0);
        expect(el.find({ autoPlay: true })).toHaveLength(2);
      });

      it('should not auto play when it is not the first preview', async () => {
        const el = await createAutoPlayFixture(1);
        expect(el.find({ autoPlay: true })).toHaveLength(0);
      });
    });
  });
});
