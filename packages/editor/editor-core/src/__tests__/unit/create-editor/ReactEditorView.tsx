import { name } from '../../../../package.json';
import { shallow } from 'enzyme';
import * as React from 'react';
import { TextSelection } from 'prosemirror-state';
import { ProviderFactory } from '@atlaskit/editor-common';
import {
  doc,
  p,
  mediaGroup,
  media,
  defaultSchema,
  storyMediaProviderFactory,
} from '@atlaskit/editor-test-helpers';
import ReactEditorView from '../../../create-editor/ReactEditorView';
import { toJSON } from '../../../utils';
import {
  patchEditorViewForJSDOM,
  mountWithIntl,
} from '@atlaskit/editor-test-helpers';
import { EditorView } from 'prosemirror-view';
import { EventDispatcher } from '../../../event-dispatcher';
import * as AnalyticsPlugin from '../../../plugins/analytics';
import {
  analyticsEventKey,
  AnalyticsEventPayload,
  ACTION,
  ACTION_SUBJECT,
  INPUT_METHOD,
  EVENT_TYPE,
  ACTION_SUBJECT_ID,
  addAnalytics,
} from '../../../plugins/analytics';
import { analyticsService } from '../../../analytics';

const portalProviderAPI: any = {
  render() {},
  remove() {},
};

const payload: AnalyticsEventPayload = {
  action: ACTION.CLICKED,
  actionSubject: ACTION_SUBJECT.BUTTON,
  actionSubjectId: ACTION_SUBJECT_ID.BUTTON_HELP,
  attributes: { inputMethod: INPUT_METHOD.TOOLBAR },
  eventType: EVENT_TYPE.UI,
};

describe(name, () => {
  describe('<ReactEditorView />', () => {
    it('should place the initial selection at the end of the document', () => {
      const document = doc(p('hello{endPos}'))(defaultSchema);
      const wrapper = shallow(
        <ReactEditorView
          editorProps={{ defaultValue: toJSON(document) }}
          providerFactory={new ProviderFactory()}
          portalProviderAPI={portalProviderAPI}
          onEditorCreated={() => {}}
          onEditorDestroyed={() => {}}
        />,
      );
      const { editorState } = wrapper.instance() as ReactEditorView;
      const cursorPos = (editorState.selection as TextSelection).$cursor!.pos;
      expect(cursorPos).toEqual(document.refs.endPos);
      wrapper.unmount();
    });

    it('should place the initial selection at the start of the document when in full-page appearance', () => {
      const document = doc(p('{startPos}hello'))(defaultSchema);
      const wrapper = shallow(
        <ReactEditorView
          editorProps={{
            defaultValue: toJSON(document),
            appearance: 'full-page',
          }}
          providerFactory={new ProviderFactory()}
          portalProviderAPI={portalProviderAPI}
          onEditorCreated={() => {}}
          onEditorDestroyed={() => {}}
        />,
      );
      const { editorState } = wrapper.instance() as ReactEditorView;
      const cursorPos = (editorState.selection as TextSelection).$cursor!.pos;
      expect(cursorPos).toEqual(document.refs.startPos);
      wrapper.unmount();
    });

    it('should place the initial selection at the start/end when document is empty', () => {
      const document = doc(p('{endPos}'))(defaultSchema);
      const wrapper = shallow(
        <ReactEditorView
          editorProps={{}}
          providerFactory={new ProviderFactory()}
          portalProviderAPI={portalProviderAPI}
          onEditorCreated={() => {}}
          onEditorDestroyed={() => {}}
        />,
      );
      const { editorState } = wrapper.instance() as ReactEditorView;
      const cursorPos = (editorState.selection as TextSelection).$cursor!.pos;
      expect(cursorPos).toEqual(document.refs.endPos);
      wrapper.unmount();
    });

    it('should place the initial selection near the end if a valid selection at the end does not exist', () => {
      // See ED-3507
      const mediaNode = media({ id: '1', type: 'file', collection: '2' });
      const document = doc(p('Start'), mediaGroup(mediaNode()))(defaultSchema);
      const mediaProvider = storyMediaProviderFactory();
      const wrapper = shallow(
        <ReactEditorView
          editorProps={{
            defaultValue: toJSON(document),
            media: { provider: mediaProvider },
          }}
          providerFactory={ProviderFactory.create({ mediaProvider })}
          portalProviderAPI={portalProviderAPI}
          onEditorCreated={() => {}}
          onEditorDestroyed={() => {}}
        />,
      );
      const { editorState } = wrapper.instance() as ReactEditorView;
      const selectionAtEndOfDocument = TextSelection.atEnd(editorState.doc);
      expect(editorState.selection.eq(selectionAtEndOfDocument)).toBe(false);
      expect(editorState.selection.toJSON()).toEqual({
        head: 6,
        anchor: 6,
        type: 'text',
      });
      wrapper.unmount();
    });

    it("should set `key` on the ProseMirror div node to aid React's reconciler", () => {
      const wrapper = mountWithIntl(
        <ReactEditorView
          editorProps={{}}
          providerFactory={ProviderFactory.create({})}
          portalProviderAPI={portalProviderAPI}
          onEditorCreated={() => {}}
          onEditorDestroyed={() => {}}
        />,
      );

      expect(wrapper.children().key()).toEqual('ProseMirror');
      wrapper.unmount();
    });

    it('should forward all events dispatched with analyticsEventKey to analytics plugin', () => {
      const mockFire = jest.fn();
      const mockAnalytics = jest
        .spyOn(AnalyticsPlugin, 'fireAnalyticsEvent')
        .mockReturnValue(mockFire);
      const wrapper = mountWithIntl(
        <ReactEditorView
          editorProps={{}}
          providerFactory={ProviderFactory.create({})}
          portalProviderAPI={portalProviderAPI}
          onEditorCreated={() => {}}
          onEditorDestroyed={() => {}}
          createAnalyticsEvent={jest.fn()}
          allowAnalyticsGASV3
        />,
      );

      (wrapper.instance() as ReactEditorView).eventDispatcher.emit(
        analyticsEventKey,
        { payload },
      );
      expect(mockFire).toHaveBeenCalledWith({ payload });
      mockAnalytics.mockRestore();
    });

    it('should trigger editor started analytics event', () => {
      const mockFire = jest.fn();
      const mockAnalytics = jest
        .spyOn(AnalyticsPlugin, 'fireAnalyticsEvent')
        .mockReturnValue(mockFire);
      mountWithIntl(
        <ReactEditorView
          editorProps={{}}
          providerFactory={ProviderFactory.create({})}
          portalProviderAPI={portalProviderAPI}
          onEditorCreated={() => {}}
          onEditorDestroyed={() => {}}
          createAnalyticsEvent={jest.fn()}
          allowAnalyticsGASV3
        />,
      );

      expect(mockFire).toHaveBeenCalledWith({
        payload: expect.objectContaining({
          action: 'started',
          actionSubject: 'editor',
        }),
      });
      mockAnalytics.mockRestore();
    });

    describe('when a transaction is dispatched', () => {
      it('should not trigger a re-render', () => {
        const wrapper = mountWithIntl(
          <ReactEditorView
            editorProps={{}}
            providerFactory={ProviderFactory.create({})}
            portalProviderAPI={portalProviderAPI}
            onEditorCreated={() => {}}
            onEditorDestroyed={() => {}}
          />,
        );

        const editor = wrapper.instance() as ReactEditorView;
        patchEditorViewForJSDOM(editor.view);

        const renderSpy = jest.spyOn(editor, 'render');
        editor.view!.dispatch(editor.view!.state.tr);

        expect(renderSpy).toHaveBeenCalledTimes(0);
        wrapper.unmount();
      });
    });

    describe('when an invalid transaction is dispatched', () => {
      const documents = {
        new: {
          type: 'doc',
          pos: 0,
          nodeSize: 5,
          content: [
            {
              type: 'codeBlock',
              pos: 1,
              nodeSize: 3,
              content: [{ type: 'date', pos: 1, nodeSize: 1 }],
            },
          ],
        },
        prev: {
          type: 'doc',
          pos: 0,
          nodeSize: 4,
          content: [{ type: 'paragraph', pos: 1, nodeSize: 2 }],
        },
      };

      /** dispatches an invalid transaction which adds a code block with a date node child */
      const dispatchInvalidTransaction = (tr = editor.view.state.tr) => {
        const { date, codeBlock } = editor.view.state.schema.nodes;
        invalidTr = tr.replaceRangeWith(
          1,
          1,
          codeBlock.create({}, date.create()),
        );
        editor.view.dispatch(invalidTr);
      };

      let wrapper;
      let editor;
      let invalidTr;

      beforeEach(() => {
        wrapper = mountWithIntl(
          <ReactEditorView
            editorProps={{
              allowCodeBlocks: true,
              allowDate: true,
            }}
            providerFactory={ProviderFactory.create({})}
            portalProviderAPI={portalProviderAPI}
            onEditorCreated={() => {}}
            onEditorDestroyed={() => {}}
          />,
        );
        editor = wrapper.instance() as ReactEditorView;
      });

      it('should not throw error', () => {
        expect(() => dispatchInvalidTransaction()).not.toThrowError();
      });

      it('sends V2 analytics event', () => {
        jest.spyOn(analyticsService, 'trackEvent');
        dispatchInvalidTransaction();

        expect(analyticsService.trackEvent).toHaveBeenCalledWith(
          'atlaskit.fabric.editor.invalidtransaction',
          { documents: JSON.stringify(documents) },
        );
      });

      it('sends V3 analytics event with info on failed transaction', () => {
        const { eventDispatcher } = wrapper.instance() as ReactEditorView;
        jest.spyOn(eventDispatcher, 'emit');

        const analyticsEventPayload: AnalyticsEventPayload = {
          action: ACTION.CLICKED,
          actionSubject: ACTION_SUBJECT.BUTTON,
          actionSubjectId: ACTION_SUBJECT_ID.BUTTON_HELP,
          attributes: { inputMethod: INPUT_METHOD.SHORTCUT },
          eventType: EVENT_TYPE.UI,
        };

        dispatchInvalidTransaction(
          // add v3 analytics meta to transaction as we want to check this info is sent on
          addAnalytics(editor.view.state.tr, analyticsEventPayload),
        );
        expect(eventDispatcher.emit).toHaveBeenCalledWith(analyticsEventKey, {
          payload: {
            action: 'dispatchedInvalidTransaction',
            actionSubject: 'editor',
            eventType: 'operational',
            attributes: {
              analyticsEventPayloads: [
                {
                  channel: undefined,
                  payload: analyticsEventPayload,
                },
              ],
              documents,
            },
          },
        });
      });

      it('does not apply the transaction', () => {
        const originalState = editor.editorState;
        dispatchInvalidTransaction();
        expect(editor.editorState).toEqual(originalState);
      });
    });

    it('should call onEditorCreated once the editor is initialised', () => {
      let handleEditorCreated = jest.fn();
      let wrapper = mountWithIntl(
        <ReactEditorView
          editorProps={{ appearance: 'comment' }}
          providerFactory={new ProviderFactory()}
          portalProviderAPI={portalProviderAPI}
          onEditorCreated={handleEditorCreated}
          onEditorDestroyed={() => {}}
        />,
      );

      expect(handleEditorCreated).toHaveBeenCalledTimes(1);
      expect(handleEditorCreated).toHaveBeenCalledWith({
        view: expect.any(EditorView),
        eventDispatcher: expect.any(EventDispatcher),
        config: {
          contentComponents: expect.anything(),
          marks: expect.anything(),
          nodes: expect.anything(),
          pmPlugins: expect.anything(),
          primaryToolbarComponents: expect.anything(),
          secondaryToolbarComponents: expect.anything(),
        },
      });
      wrapper.unmount();
    });

    it('should call onEditorDestroyed when the editor is unmounting', () => {
      let handleEditorDestroyed = jest.fn();
      const wrapper = mountWithIntl(
        <ReactEditorView
          editorProps={{ appearance: 'comment' }}
          providerFactory={new ProviderFactory()}
          portalProviderAPI={portalProviderAPI}
          onEditorCreated={() => {}}
          onEditorDestroyed={handleEditorDestroyed}
        />,
      );
      wrapper.unmount();

      expect(handleEditorDestroyed).toHaveBeenCalledTimes(1);
      expect(handleEditorDestroyed).toHaveBeenCalledWith({
        view: expect.any(EditorView),
        eventDispatcher: expect.any(EventDispatcher),
        config: {
          contentComponents: expect.anything(),
          marks: expect.anything(),
          nodes: expect.anything(),
          pmPlugins: expect.anything(),
          primaryToolbarComponents: expect.anything(),
          secondaryToolbarComponents: expect.anything(),
        },
      });
    });

    it('should call destroy() on plugin states when it gets unmounted', () => {
      let spies: Array<jest.SpyInstance> = [];
      const mediaProvider = storyMediaProviderFactory({
        includeUserAuthProvider: true,
      });
      const wrapper = mountWithIntl(
        <ReactEditorView
          editorProps={{
            mediaProvider: mediaProvider,
          }}
          providerFactory={ProviderFactory.create({ mediaProvider })}
          portalProviderAPI={portalProviderAPI}
          onEditorCreated={({ view }) => {
            spies = view.state.plugins
              .map(plugin => plugin.getState(view.state))
              .filter(state => !!state && !!state.destroy)
              .map(state => jest.spyOn(state, 'destroy'));
          }}
          onEditorDestroyed={() => {}}
        />,
      );

      expect(spies.length).toBeGreaterThan(0);
      wrapper.unmount();

      spies.forEach(spy => expect(spy).toHaveBeenCalledTimes(1));
    });

    it('should call destroy() on EventDispatcher when it gets unmounted', () => {
      let eventDispatcherDestroySpy;
      const wrapper = mountWithIntl(
        <ReactEditorView
          editorProps={{}}
          providerFactory={new ProviderFactory()}
          portalProviderAPI={portalProviderAPI}
          onEditorCreated={({ eventDispatcher }) => {
            eventDispatcherDestroySpy = jest.spyOn(eventDispatcher, 'destroy');
          }}
          onEditorDestroyed={() => {}}
        />,
      );
      wrapper.unmount();
      expect(eventDispatcherDestroySpy).toHaveBeenCalledTimes(1);
    });

    it('should disable grammarly in the editor', () => {
      const wrapper = mountWithIntl(
        <ReactEditorView
          editorProps={{}}
          providerFactory={ProviderFactory.create({})}
          portalProviderAPI={portalProviderAPI}
          onEditorCreated={() => {}}
          onEditorDestroyed={() => {}}
        />,
      );
      const editorDOM = (wrapper.instance() as ReactEditorView).view!.dom;
      expect(editorDOM.getAttribute('data-gramm')).toBe('false');
      wrapper.unmount();
    });

    describe('when re-creating the editor view after a props change', () => {
      it('should call onEditorDestroyed', () => {
        let handleEditorDestroyed = jest.fn();
        const wrapper = mountWithIntl(
          <ReactEditorView
            editorProps={{ appearance: 'comment' }}
            providerFactory={new ProviderFactory()}
            portalProviderAPI={portalProviderAPI}
            onEditorCreated={() => {}}
            onEditorDestroyed={handleEditorDestroyed}
          />,
        );

        // Force a re-mount of the editor-view by changing the React tree
        wrapper.setProps({
          render: ({ editor }: { editor: React.ReactChild }) => (
            <div>{editor}</div>
          ),
        });

        expect(handleEditorDestroyed).toHaveBeenCalledTimes(1);
        expect(handleEditorDestroyed).toHaveBeenCalledWith({
          view: expect.any(EditorView),
          eventDispatcher: expect.any(EventDispatcher),
          config: {
            contentComponents: expect.anything(),
            marks: expect.anything(),
            nodes: expect.anything(),
            pmPlugins: expect.anything(),
            primaryToolbarComponents: expect.anything(),
            secondaryToolbarComponents: expect.anything(),
          },
        });
      });

      it('should call destroy on the old EditorView', () => {
        let editorViewDestroy: jest.SpyInstance | undefined;
        const wrapper = mountWithIntl(
          <ReactEditorView
            editorProps={{}}
            providerFactory={new ProviderFactory()}
            portalProviderAPI={portalProviderAPI}
            onEditorCreated={({ view }) => {
              // So we don't accidently re-set this when we create the new editor view
              if (!editorViewDestroy) {
                editorViewDestroy = jest.spyOn(view, 'destroy');
              }
            }}
            onEditorDestroyed={() => {}}
          />,
        );

        // Force a re-mount of the editor-view by changing the React tree
        wrapper.setProps({
          render: ({ editor }: { editor: React.ReactChild }) => (
            <div>{editor}</div>
          ),
        });

        expect(editorViewDestroy).toHaveBeenCalled();
      });

      it('should call onEditorCreated with the new EditorView', () => {
        let oldEditorView;
        let newEditorView;
        const wrapper = mountWithIntl(
          <ReactEditorView
            editorProps={{}}
            providerFactory={new ProviderFactory()}
            portalProviderAPI={portalProviderAPI}
            onEditorCreated={({ view }) => {
              newEditorView = view;
            }}
            onEditorDestroyed={({ view }) => {
              oldEditorView = view;
            }}
          />,
        );

        // Force a re-mount of the editor-view by changing the React tree
        wrapper.setProps({
          render: ({ editor }: { editor: React.ReactChild }) => (
            <div>{editor}</div>
          ),
        });

        expect(newEditorView).toBeInstanceOf(EditorView);
        expect(oldEditorView).not.toBe(newEditorView);
      });

      it('should not re-create the event dispatcher', () => {
        let oldEventDispatcher: EventDispatcher | undefined;
        let eventDispatcherDestroySpy;
        const wrapper = mountWithIntl(
          <ReactEditorView
            editorProps={{}}
            providerFactory={new ProviderFactory()}
            portalProviderAPI={portalProviderAPI}
            onEditorCreated={({ eventDispatcher }) => {
              // So we don't accidently re-set this when we create the new editor view
              if (!oldEventDispatcher) {
                oldEventDispatcher = eventDispatcher;
                eventDispatcherDestroySpy = jest.spyOn(
                  eventDispatcher,
                  'destroy',
                );
              }
            }}
            onEditorDestroyed={() => {}}
          />,
        );

        // Force a re-mount of the editor-view by changing the React tree
        wrapper.setProps({
          render: ({ editor }: { editor: React.ReactChild }) => (
            <div>{editor}</div>
          ),
        });

        expect(oldEventDispatcher).toBe(
          (wrapper.instance() as ReactEditorView).eventDispatcher,
        );
        expect(eventDispatcherDestroySpy).not.toHaveBeenCalled();
      });
    });

    it('should re-setup analytics event forwarding when createAnalyticsEvent prop changes', () => {
      const mockFire = jest.fn();
      const mockAnalytics = jest
        .spyOn(AnalyticsPlugin, 'fireAnalyticsEvent')
        .mockReturnValue(mockFire);
      const wrapper = mountWithIntl(
        <ReactEditorView
          editorProps={{}}
          providerFactory={ProviderFactory.create({})}
          portalProviderAPI={portalProviderAPI}
          onEditorCreated={() => {}}
          onEditorDestroyed={() => {}}
          createAnalyticsEvent={jest.fn()}
          allowAnalyticsGASV3
        />,
      );
      const { eventDispatcher } = wrapper.instance() as ReactEditorView;
      jest.spyOn(eventDispatcher, 'on');
      jest.spyOn(eventDispatcher, 'off');

      const newCreateAnalyticsEvent = jest.fn();
      wrapper.setProps({ createAnalyticsEvent: newCreateAnalyticsEvent });

      expect(eventDispatcher.off).toHaveBeenCalled();
      expect(eventDispatcher.on).toHaveBeenCalled();
      expect(AnalyticsPlugin.fireAnalyticsEvent).toHaveBeenCalledWith(
        newCreateAnalyticsEvent,
      );
      mockAnalytics.mockRestore();
    });

    describe('dispatch analytics event', () => {
      function setupDispatchAnalyticsTest(allowAnalyticsGASV3: boolean) {
        jest
          .spyOn(AnalyticsPlugin, 'fireAnalyticsEvent')
          .mockReturnValue(() => null);
        let dispatch;
        const wrapper = mountWithIntl(
          <ReactEditorView
            editorProps={{}}
            providerFactory={ProviderFactory.create({})}
            portalProviderAPI={portalProviderAPI}
            onEditorCreated={() => {}}
            onEditorDestroyed={() => {}}
            createAnalyticsEvent={jest.fn()}
            allowAnalyticsGASV3={allowAnalyticsGASV3}
            render={({
              editor,
              config,
              eventDispatcher,
              dispatchAnalyticsEvent,
            }) => {
              dispatch = dispatchAnalyticsEvent;
              return <p>Component</p>;
            }}
          />,
        );
        const { eventDispatcher } = wrapper.instance() as ReactEditorView;
        jest.spyOn(eventDispatcher, 'emit');

        return {
          dispatch,
          eventDispatcher,
        };
      }

      it('should call event dispatcher if it is allowed to call analytics', () => {
        const { dispatch, eventDispatcher } = setupDispatchAnalyticsTest(true);

        dispatch(payload);
        expect(eventDispatcher.emit).toHaveBeenCalledWith(analyticsEventKey, {
          payload,
        });
      });

      it('should NOT call event dispatcher if it is NOT allowed to call analytics', () => {
        const { dispatch, eventDispatcher } = setupDispatchAnalyticsTest(false);

        dispatch(payload);
        expect(eventDispatcher.emit).not.toHaveBeenCalled();
      });
    });
  });
});
