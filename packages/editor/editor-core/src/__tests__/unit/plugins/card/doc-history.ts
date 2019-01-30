jest.mock('prosemirror-history');
import { closeHistory } from 'prosemirror-history';

import { doc, createEditorFactory, p, a } from '@atlaskit/editor-test-helpers';

import { pluginKey } from '../../../../plugins/card/pm-plugins/main';
import cardPlugin from '../../../../plugins/card';
import { CardProvider } from '../../../../plugins/card/types';
import {
  setProvider,
  queueCards,
} from '../../../../plugins/card/pm-plugins/actions';

describe('card', () => {
  const createEditor = createEditorFactory();

  const editor = (doc: any) => {
    return createEditor({
      doc,
      editorPlugins: [cardPlugin],
      pluginKey,
    });
  };

  beforeAll(() => {
    (closeHistory as jest.Mock).mockImplementation(tr => {
      return tr;
    });
  });

  afterAll(() => {
    (closeHistory as jest.Mock).mockClear();
  });

  describe('doc', () => {
    describe('changed document', () => {
      let promises: Promise<any>[] = [];
      let provider: CardProvider;
      const cardAdf = {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'hello world',
          },
        ],
      };

      beforeEach(() => {
        provider = new class implements CardProvider {
          resolve(url: string): Promise<any> {
            const promise = new Promise(resolve => resolve(cardAdf));
            promises.push(promise);
            return promise;
          }
        }();
      });

      afterEach(() => {
        promises = [];
      });

      describe('replacedQueuedCardWithUrl', async () => {
        it('closes history around the transaction', async () => {
          const href = 'http://www.atlassian.com/';
          const initialDoc = doc(
            p('hello have a link '),
            p('{<>}', a({ href })(href)),
          );

          const { editorView } = editor(initialDoc);
          const { dispatch } = editorView;

          dispatch(setProvider(provider)(editorView.state.tr));

          dispatch(
            queueCards([
              {
                url: href,
                pos: editorView.state.selection.from,
                appearance: 'inline',
              },
            ])(editorView.state.tr),
          );

          expect(closeHistory).not.toBeCalled();

          // resolve the provider promise and convert links to cards
          await Promise.all(promises);

          expect(closeHistory).toBeCalledTimes(1);
        });
      });
    });
  });
});
