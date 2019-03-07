import { name } from '../../../package.json';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { ProviderFactory } from '@atlaskit/editor-common';
import {
  doc,
  p,
  randomId,
  createEditorFactory,
  storyMediaProviderFactory,
} from '@atlaskit/editor-test-helpers';

import {
  MediaPluginState,
  stateKey,
} from '../../../src/plugins/media/pm-plugins/main';
import { insertFileFromDataUrl } from '../../../src/utils/action';
import mediaPlugin from '../../../src/plugins/media';

const testCollectionName = `media-plugin-mock-collection-${randomId()}`;
const getFreshMediaProvider = () =>
  storyMediaProviderFactory({
    collectionName: testCollectionName,
  });
const mediaProvider = getFreshMediaProvider();
const providerFactory = new ProviderFactory();
providerFactory.setProvider('mediaProvider', mediaProvider);

describe(name, () => {
  const createEditor = createEditorFactory<MediaPluginState>();

  const editor = (doc: any, uploadErrorHandler?: () => void) =>
    createEditor({
      doc,
      editorPlugins: [mediaPlugin()],
      pluginKey: stateKey,
      providerFactory,
    });

  describe('Utils -> Action', () => {
    describe('#insertFileFromDataUrl', () => {
      it('should invoke binary picker when calling insertFileFromDataUrl', async () => {
        const { pluginState, editorView } = editor(doc(p('{<>}')));
        const collectionFromProvider = sinon
          .stub(pluginState, 'collectionFromProvider' as any)
          .returns(testCollectionName);

        const provider = await mediaProvider;
        await provider.uploadContext;

        // wait a tick for await MediaPicker in picker-facade
        await new Promise(resolve => setTimeout(resolve, 0));

        pluginState.binaryPicker!.upload = sinon.spy();

        insertFileFromDataUrl(
          editorView.state,
          'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
          'test.gif',
        );

        sinon.assert.calledOnce(pluginState.binaryPicker!.upload as any);
        expect((pluginState.binaryPicker!.upload as any).calledOnce).to.equal(
          true,
        );
        collectionFromProvider.restore();
        pluginState.destroy();
      });
    });
  });
});
