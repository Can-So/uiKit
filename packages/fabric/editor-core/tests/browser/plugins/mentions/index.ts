import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { mention as mentionNode } from '@atlaskit/editor-common';
import mentionsPlugins, { MentionsState } from '../../../../src/plugins/mentions';
import ProviderFactory from '../../../../src/providerFactory';
import {
  chaiPlugin,
  makeEditor,
  sendKeyToPm,
  blockquote,
  br,
  doc,
  mention,
  mentionQuery,
  li,
  p,
  ul,
  code,
  insertText
} from '../../../../src/test-helper';
import defaultSchema from '../../../../src/test-helper/schema';
import { storyData as mentionStoryData } from '@atlaskit/mention/dist/es5/support';
import { analyticsService } from '../../../../src/analytics';

const mentionProvider = new Promise<any>(resolve => {
  resolve(mentionStoryData.resourceProvider);
});

chai.use(chaiPlugin);

describe('mentions', () => {
  let sandbox;
  const editor = (doc: any) => makeEditor<MentionsState>({
    doc,
    plugins: mentionsPlugins(defaultSchema, new ProviderFactory()),
  });

  const forceUpdate = (pluginState, editorView: any) => {
    pluginState.apply(null, editorView.state);
    editorView.updateState(editorView.state);
  };

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('keymap', () => {

    describe('ArrowUp', () => {
      it('should be ignored if there is no mentionProvider', () => {
        const { editorView, pluginState } = editor(doc(p(mentionQuery()('@o{<>}'))));
        const spy = sandbox.spy(pluginState, 'onSelectPrevious');

        forceUpdate(pluginState, editorView); // Force update to ensure active query.
        sendKeyToPm(editorView, 'ArrowUp');
        expect(spy.called).to.equal(false);
        editorView.destroy();
      });

      it('should be ignored if there is no active query', () => {
        const { editorView, pluginState } = editor(doc(p('Hello')));
        const spy = sandbox.spy(pluginState, 'onSelectPrevious');

        return pluginState
          .setMentionProvider(mentionProvider)
          .then(() => {
            forceUpdate(pluginState, editorView); // Force update to ensure active query.

            sendKeyToPm(editorView, 'ArrowUp');
            expect(spy.called).to.equal(false);
            editorView.destroy();
          });
      });

      it('should call "onSelectPrevious" which should return false by default', () => {
        const { editorView, pluginState } = editor(doc(p(mentionQuery()('@o{<>}'))));
        const spy = sandbox.spy(pluginState, 'onSelectPrevious');

        return pluginState
          .setMentionProvider(mentionProvider)
          .then(() => {
            forceUpdate(pluginState, editorView); // Force update to ensure active query.

            sendKeyToPm(editorView, 'ArrowUp');
            expect(spy.called).to.equal(true);
            expect(spy.returned(false)).to.equal(true);
            editorView.destroy();
          });
      });
    });

    describe('ArrowDown', () => {
      it('should be ignored if there is no mentionProvider', () => {
        const { editorView, pluginState } = editor(doc(p(mentionQuery()('@o{<>}'))));
        const spy = sandbox.spy(pluginState, 'onSelectNext');

        forceUpdate(pluginState, editorView); // Force update to ensure active query.
        sendKeyToPm(editorView, 'ArrowDown');
        expect(spy.called).to.equal(false);
      });

      it('should be ignored if there is no active query', () => {
        const { editorView, pluginState } = editor(doc(p('Hello')));
        const spy = sandbox.spy(pluginState, 'onSelectNext');

        return pluginState
          .setMentionProvider(mentionProvider)
          .then(() => {
            forceUpdate(pluginState, editorView); // Force update to ensure active query.

            sendKeyToPm(editorView, 'ArrowDown');
            expect(spy.called).to.equal(false);
            editorView.destroy();
          });
      });

      it('should call "onSelectNext" which should return false by default', () => {
        const { editorView, pluginState } = editor(doc(p(mentionQuery()('@o{<>}'))));
        const spy = sandbox.spy(pluginState, 'onSelectNext');

        return pluginState
          .setMentionProvider(mentionProvider)
          .then(() => {
            forceUpdate(pluginState, editorView); // Force update to ensure active query.

            sendKeyToPm(editorView, 'ArrowDown');
            expect(spy.called).to.equal(true);
            expect(spy.returned(false)).to.equal(true);
            editorView.destroy();
          });
      });
    });

    describe('Enter', () => {
      it('should be ignored if there is no mentionProvider', () => {
        const { editorView, pluginState } = editor(doc(p(mentionQuery()('@o{<>}'))));
        const spy = sandbox.spy(pluginState, 'onSelectCurrent');

        forceUpdate(pluginState, editorView); // Force update to ensure active query.
        sendKeyToPm(editorView, 'Enter');
        expect(spy.called).to.equal(false);
        editorView.destroy();
      });

      it('should be ignored if there is no active query', () => {
        const { editorView, pluginState } = editor(doc(p('Hello')));
        const spy = sandbox.spy(pluginState, 'onSelectCurrent');

        return pluginState
          .setMentionProvider(mentionProvider)
          .then(() => {
            forceUpdate(pluginState, editorView); // Force update to ensure active query.

            sendKeyToPm(editorView, 'Enter');
            expect(spy.called).to.equal(false);
            editorView.destroy();
          });
      });

      it('should call "onSelectCurrent" which should return false by default', () => {
        const { editorView, pluginState } = editor(doc(p(mentionQuery()('@o{<>}'))));
        const spy = sandbox.spy(pluginState, 'onSelectCurrent');

        return pluginState
          .setMentionProvider(mentionProvider)
          .then(() => {
            forceUpdate(pluginState, editorView); // Force update to ensure active query.

            sendKeyToPm(editorView, 'Enter');
            expect(spy.called).to.equal(true);
            expect(spy.returned(false)).to.equal(true);
            editorView.destroy();
          });
      });
    });

    describe('Shift-Enter', () => {
      it('should be ignored if there is no mentionProvider', () => {
        const { editorView, pluginState } = editor(doc(p(mentionQuery()('@o{<>}'))));
        const spy = sandbox.spy(pluginState, 'onSelectCurrent');

        forceUpdate(pluginState, editorView); // Force update to ensure active query.
        sendKeyToPm(editorView, 'Shift-Enter');
        expect(spy.called).to.equal(false);
        editorView.destroy();
      });

      it('should be ignored if there is no active query', async () => {
        const { editorView, pluginState } = editor(doc(p('Hello')));
        const spy = sandbox.spy(pluginState, 'onSelectCurrent');

        await pluginState.setMentionProvider(mentionProvider);
        forceUpdate(pluginState, editorView); // Force update to ensure active query.

        sendKeyToPm(editorView, 'Shift-Enter');
        expect(spy.called).to.equal(false);
        editorView.destroy();
      });

      it('should call "onSelectCurrent"', async () => {
        const { editorView, pluginState } = editor(doc(p(mentionQuery()('@o{<>}'))));
        const spy = sandbox.spy(pluginState, 'onSelectCurrent');

        await pluginState.setMentionProvider(mentionProvider);
        forceUpdate(pluginState, editorView); // Force update to ensure active query.

        sendKeyToPm(editorView, 'Shift-Enter');
        expect(spy.called).to.equal(true);
        editorView.destroy();
      });
    });

    describe('Space', () => {
      it('should be ignored if there is no mentionProvider', () => {
        const { editorView, pluginState } = editor(doc(p(mentionQuery()('@o{<>}'))));
        const spy = sandbox.spy(pluginState, 'trySelectCurrent');

        forceUpdate(pluginState, editorView); // Force update to ensure active query.
        sendKeyToPm(editorView, 'Space');
        expect(spy.called).to.equal(false);
        editorView.destroy();
      });

      it('should be ignored if there is no active query', () => {
        const { editorView, pluginState } = editor(doc(p('Hello')));
        const spy = sandbox.spy(pluginState, 'trySelectCurrent');

        return pluginState
          .setMentionProvider(mentionProvider)
          .then(() => {
            forceUpdate(pluginState, editorView); // Force update to ensure active query.

            sendKeyToPm(editorView, 'Space');
            expect(spy.called).to.equal(false);
            editorView.destroy();
          });
      });

      it('should call "trySelectCurrent"', () => {
        const { editorView, pluginState } = editor(doc(p(mentionQuery()('@kai{<>}'))));
        const spy = sandbox.spy(pluginState, 'trySelectCurrent');
        const trackEvent = sinon.spy();
        analyticsService.trackEvent = trackEvent;

        return pluginState
          .setMentionProvider(mentionProvider)
          .then(() => {
            forceUpdate(pluginState, editorView); // Force update to ensure active query.

            sendKeyToPm(editorView, 'Space');
            expect(spy.called).to.equal(true);
            expect(trackEvent.calledWith('atlassian.editor.mention.try.insert.previous')).to.equal(true);
            editorView.destroy();
          });
      });
    });

    describe('Escape', () => {
      it('should be ignored if there is no mentionProvider', () => {
        const { editorView, pluginState } = editor(doc(p(mentionQuery()('@o{<>}'))));
        const spy = sandbox.spy(pluginState, 'dismiss');

        forceUpdate(pluginState, editorView); // Force update to ensure active query.
        sendKeyToPm(editorView, 'Esc');
        expect(spy.called).to.equal(false);
        editorView.destroy();
      });

      it('should be ignored if there is no active query', () => {
        const { editorView, pluginState } = editor(doc(p('Hello')));
        const spy = sandbox.spy(pluginState, 'dismiss');

        return pluginState
          .setMentionProvider(mentionProvider)
          .then(() => {
            forceUpdate(pluginState, editorView); // Force update to ensure active query.

            sendKeyToPm(editorView, 'Esc');
            expect(spy.called).to.equal(false);
            editorView.destroy();
          });
      });

      it('should call "dismiss" which should return true by default', () => {
        const { editorView, pluginState } = editor(doc(p(mentionQuery()('@kai{<>}'))));
        const spy = sandbox.spy(pluginState, 'dismiss');

        return pluginState
          .setMentionProvider(mentionProvider)
          .then(() => {
            forceUpdate(pluginState, editorView); // Force update to ensure active query.
            sendKeyToPm(editorView, 'Esc');
            expect(spy.called).to.equal(true);
            expect(spy.returned(true)).to.equal(true);
            editorView.destroy();
          });
      });
    });

  });

  describe('insertMention', () => {

    it('should replace mention-query-mark with mention-node', () => {
      const { editorView, pluginState } = editor(doc(p(mentionQuery()('@os'))));

      pluginState.insertMention({
        name: 'Oscar Wallhult',
        mentionName: 'oscar',
        id: '1234'
      });

      expect(editorView.state.doc.nodeAt(1)).to.be.of.nodeSpec(mentionNode);
      editorView.destroy();
    });

    it('should insert a space after the mention-node', () => {
      const { editorView, pluginState } = editor(doc(p(mentionQuery()('@os{<>}'))));

      pluginState.insertMention({
        name: 'Oscar Wallhult',
        mentionName: 'oscar',
        id: '1234'
      });

      expect(editorView.state.doc).to.deep.equal(
        doc(
          p(
            mention({
              text: '@Oscar Wallhult',
              id: '1234'
            }),
            ' '
          )
        )
      );
      editorView.destroy();
    });

    it('should not insert a space after the mention-node if next character is already a space', () => {
      const { editorView, pluginState } = editor(doc(p(mentionQuery()('@os{<>}'), ' text')));

      pluginState.insertMention({
        name: 'Oscar Wallhult',
        mentionName: 'oscar',
        id: '1234'
      });

      expect(editorView.state.doc).to.deep.equal(
        doc(
          p(
            mention({
              text: '@Oscar Wallhult',
              id: '1234'
            }),
            ' text'
          )
        )
      );
      editorView.destroy();
    });

    it('should render the mention-node using a nickname if present', () => {
      const { editorView, pluginState } = editor(doc(p(mentionQuery()('@ta'))));

      pluginState.insertMention({
        name: 'Tara Tjandra',
        mentionName: 'ttjandra',
        nickname: 'tara',
        id: '1234'
      });

      expect(editorView.state.doc).to.deep.equal(
        doc(
          p(
            mention({
              text: '@tara',
              id: '1234'
            }),
            ' '
          )
        )
      );
      editorView.destroy();
    });

    it('should allow inserting multiple @-mentions next to eachother', () => {
      const { editorView, pluginState } = editor(doc(p(mention({ id: '1234', text: '@Oscar Wallhult' }), ' ', mentionQuery()('@{<>}'))));

      pluginState.insertMention({
        name: 'Bradley Ayers',
        mentionName: 'brad',
        id: '5678'
      });

      expect(editorView.state.doc).to.deep.equal(
        doc(
          p(
            mention({
              text: '@Oscar Wallhult',
              id: '1234'
            }),
            ' ',
            mention({
              text: '@Bradley Ayers',
              id: '5678'
            }),
            ' '
          )
        )
      );
      editorView.destroy();
    });

    it('should allow inserting @-mention on new line after hard break', () => {
      const { editorView, pluginState } = editor(doc(p(br, mentionQuery()('@{<>}'))));

      pluginState.insertMention({
        name: 'Oscar Wallhult',
        mentionName: 'oscar',
        id: '1234'
      });

      expect(editorView.state.doc).to.deep.equal(
        doc(
          p(
            br,
            mention({
              id: '1234',
              text: '@Oscar Wallhult'
            }),
            ' '
          )
        )
      );
      editorView.destroy();
    });

    it('should not break list into two when inserting mention inside list item', () => {
      const { editorView, pluginState } = editor(doc(p(ul(li(p('One')), li(p('Two ', mentionQuery()('@{<>}'))), li(p('Three'))))));

      pluginState.insertMention({
        name: 'Oscar Wallhult',
        mentionName: 'oscar',
        id: '1234'
      });

      expect(editorView.state.doc).to.deep.equal(
        doc(
          p(
            ul(
              li(p('One')),
              li(
                p(
                  'Two ',
                  mention({
                    id: '1234',
                    text: '@Oscar Wallhult'
                  }),
                  ' '
                )
              ),
              li(p('Three'))
            )
          )
        )
      );
      editorView.destroy();
    });

    it('should insert only 1 mention at a time inside blockqoute', () => {
      const { editorView, pluginState } = editor(doc(blockquote(p('Hello ', mentionQuery()('@{<>}')))));

      pluginState.insertMention({
        name: 'Oscar Wallhult',
        mentionName: 'oscar',
        id: '1234'
      });

      expect(editorView.state.doc).to.deep.equal(
        doc(
          blockquote(
            p(
              'Hello ',
              mention({
                id: '1234',
                text: '@Oscar Wallhult'
              }),
              ' '
            )
          )
        )
      );

      expect(editorView.state.doc.nodeAt(8)).to.be.of.nodeSpec(mentionNode);
      expect(editorView.state.doc.nodeAt(10)).to.equal(null);
      editorView.destroy();
    });

    it('should insert mention at the position of the provided inactive mark', () => {
      const { editorView, pluginState } = editor(doc(p('Hello ', mentionQuery({ active: false })('@os{<>}'), ' text')));

      pluginState.insertMention({
        name: 'Oscar Wallhult',
        mentionName: 'oscar',
        id: '1234'
      }, {
          start: 7,
          end: 10
        });

      expect(editorView.state.doc).to.deep.equal(
        doc(
          p(
            'Hello ',
            mention({
              text: '@Oscar Wallhult',
              id: '1234'
            }),
            ' text'
          )
        )
      );
      editorView.destroy();
    });
  });

  describe('remove', () => {
    it('should remove active mark when all text of mark is removed', () => {
      const { editorView } = editor(doc(p(mentionQuery({ active: true })('{<}@os{>}'))));
      sendKeyToPm(editorView, 'Delete');
      expect(editorView.state.doc).to.deep.equal(doc(p()));
      editorView.destroy();
    });

    it('should call changeHandlers when mention is removed', () => {
      const spy = sinon.spy();
      const { editorView, pluginState } = editor(doc(p(mentionQuery({ active: true })('{<}@os{>}'))));
      pluginState.subscribe(spy);
      sendKeyToPm(editorView, 'Delete');
      expect(editorView.state.doc).to.deep.equal(doc(p()));
      expect(spy.callCount).to.deep.equal(1);
      editorView.destroy();
    });
  });

  describe('onMentionResult', () => {
    it('should not replace active mark ', () => {
      const { editorView, pluginState } = editor(doc(p(mentionQuery({ active: true })('@os{<>}'))));

      pluginState.onMentionResult([
        {
          name: 'Oscar Wallhult',
          nickname: 'os',
          id: '1234'
        }
      ], 'os');

      expect(editorView.state.doc).to.deep.equal(
        doc(
          p(
            mentionQuery({ active: true })('@os{<>}')
          )
        )
      );
      editorView.destroy();
    });

    it('should not modify current selection when resolving', () => {
      const { editorView, pluginState } = editor(doc(p(mentionQuery({ active: false })('@os', ' abcd{<>}'))));

      pluginState.onMentionResult([
        {
          name: 'Oscar Wallhult',
          nickname: 'os',
          id: '1234'
        }
      ], 'os');

      const newSelectionFrom = editorView.state.selection.from;
      expect(newSelectionFrom).to.equal(9);
      editorView.destroy();
    });

  });

  describe('dismiss', () => {
    it('should remove active mark and keep text', () => {
      const { editorView, pluginState } = editor(doc(p(mentionQuery({ active: true })('@os{<>}'))));

      pluginState.dismiss();

      expect(editorView.state.doc).to.deep.equal(
        doc(
          p(
            '@os'
          )
        )
      );
      editorView.destroy();
    });

    it('should remove stored mentions  mark', () => {
      const { editorView, pluginState } = editor(doc(p(mentionQuery({ active: true })('@os{<>}'))));

      pluginState.dismiss();

      expect(editorView.state.storedMarks).to.equal(null);
      editorView.destroy();
    });
  });

  describe('isEnabled', () => {
    it('returns true when the mention mark can be applied', () => {
      const { editorView, pluginState } = editor(doc(p('te{<>}xt')));
      expect(pluginState.isEnabled()).to.equal(true);
      editorView.destroy();
    });

    it('returns false when the mention mark cannot be applied', () => {
      const { editorView, pluginState } = editor(doc(p(code('te{<>}xt'))));
      expect(pluginState.isEnabled()).to.equal(false);
      editorView.destroy();
    });
  });

  describe('trySelectCurrent', () => {
    it('should select current if there is only one result', () => {
      const { editorView, pluginState } = editor(doc(p(mentionQuery({ active: true })('@O w{<>}'))));
      const spy = sandbox.spy(pluginState, 'onSelectCurrent');

      return pluginState.setMentionProvider(mentionProvider)
        .then(() => {
          const trackEvent = sinon.spy();
          analyticsService.trackEvent = trackEvent;

          forceUpdate(pluginState, editorView); // Force update to ensure active query.

          pluginState.onMentionResult([
            {
              name: 'Oscar Wallhult',
              nickname: 'os',
              id: '1234'
            }
          ], 'O w');

          pluginState.trySelectCurrent();

          expect(spy.called).to.equal(true);
          expect(trackEvent.calledWith('atlassian.editor.mention.try.select.current')).to.equal(true);
          editorView.destroy();
        });
    });

    it('should not select exact match if non unique', () => {
      const { editorView, pluginState } = editor(doc(p(mentionQuery({ active: true })('@os{<>}'))));
      const spy = sandbox.spy(pluginState, 'insertMention');

      return pluginState.setMentionProvider(mentionProvider)
        .then(() => {
          forceUpdate(pluginState, editorView); // Force update to ensure active query.

          pluginState.onMentionResult([
            {
              name: 'Oscar Wallhult',
              nickname: 'os',
              id: '1234'
            },
            {
              name: 'Oscar Wallhult 2',
              nickname: 'os',
              id: '666'
            },
          ], 'os');

          pluginState.trySelectCurrent();

          expect(spy.called).to.equal(false);
          editorView.destroy();
        });
    });

    it('should do nothing if the user is still searching (no exact match)', () => {
      const { editorView, pluginState } = editor(doc(p(mentionQuery({ active: true })('@oscar{<>}'))));

      return pluginState.setMentionProvider(mentionProvider)
        .then(() => {
          forceUpdate(pluginState, editorView); // Force update to ensure active query.

          pluginState.onMentionResult([
            {
              name: 'Oscar Wallhult',
              nickname: 'os',
              id: '1234'
            },
            {
              name: 'Oscar Wilde',
              id: '456'
            }
          ], 'oscar');

          expect(pluginState.trySelectCurrent()).to.equal(false);
          editorView.destroy();
        });
    });

    it('should try inserting exact match for previous result if previous query has no result', () => {
      const { editorView, pluginState } = editor(doc(p(mentionQuery({ active: true })('@oscar{<>}'))));
      const spy = sandbox.spy(pluginState, 'tryInsertingPreviousMention');

      return pluginState.setMentionProvider(mentionProvider)
        .then(() => {
          forceUpdate(pluginState, editorView); // Force update to ensure active query.

          pluginState.onMentionResult([], 'osc');

          pluginState.trySelectCurrent();

          expect(spy.called).to.equal(true);
          editorView.destroy();
        });
    });

    it('should try inserting exact match for previous result if no query in flight and no current result', () => {
      const { editorView, pluginState } = editor(doc(p(mentionQuery({ active: true })('@oscar{<>}'))));
      const spy = sandbox.spy(pluginState, 'tryInsertingPreviousMention');

      return pluginState.setMentionProvider(mentionProvider)
        .then(() => {
          forceUpdate(pluginState, editorView); // Force update to ensure active query.

          pluginState.onMentionResult([], 'oscar');

          pluginState.trySelectCurrent();

          expect(spy.called).to.equal(true);
          editorView.destroy();
        });
    });

    it('should dismiss if there is no result and none coming', () => {
      const { editorView, pluginState } = editor(doc(p(mentionQuery({ active: true })('@xyz{<>}'))));
      const spy = sandbox.spy(pluginState, 'dismiss');

      return pluginState.setMentionProvider(mentionProvider)
        .then((mentionResource) => {
          const trackEvent = sinon.spy();
          analyticsService.trackEvent = trackEvent;
          const isFilteringStub = sandbox.stub(mentionResource, 'isFiltering');
          forceUpdate(pluginState, editorView); // Force update to ensure active query.

          isFilteringStub.returns(false);
          pluginState.onMentionResult([], 'xyz');

          pluginState.trySelectCurrent();

          expect(spy.called).to.equal(true);
          expect(trackEvent.calledWith('atlassian.editor.mention.insert.previous.match.no.match')).to.equal(true);
          editorView.destroy();
        });
    });
  });

  describe('Insert mention using previous exact match', () => {
    it('should insert mention if one previous query has exact match result', () => {
      const { editorView, pluginState } = editor(doc(p(mentionQuery({ active: true })('@oscar{<>}'))));

      return pluginState.setMentionProvider(mentionProvider)
        .then(() => {
          const trackEvent = sinon.spy();
          analyticsService.trackEvent = trackEvent;
          forceUpdate(pluginState, editorView); // Force update to ensure active query.

          pluginState.onMentionResult([
            {
              name: 'Oscar Wallhult',
              nickname: 'oscar',
              id: '1234'
            }
          ], 'oscar');

          sendKeyToPm(editorView, 'Space');
          insertText(editorView, ' How', editorView.state.selection.from);

          pluginState.onMentionResult([], 'oscar How');

          sendKeyToPm(editorView, 'Space');

          expect(editorView.state.doc.nodeAt(1)).to.be.of.nodeSpec(mentionNode);
          expect(trackEvent.calledWith('atlassian.editor.mention.insert.previous.match.success')).to.equal(true);
          editorView.destroy();
        });
    });
  });
});
