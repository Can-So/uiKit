import { createEditorFactory, insertText } from '@atlaskit/editor-test-helpers';
import { doc, p } from '@atlaskit/editor-test-helpers';
import { MockMentionResource } from '@atlaskit/util-data-test';
import { selectCurrentItem } from '../../../../plugins/type-ahead/commands/select-item';
import { dismissCommand } from '../../../../plugins/type-ahead/commands/dismiss';
import { ProviderFactory } from '@atlaskit/editor-common';
import { MentionProvider, MentionDescription } from '@atlaskit/mention';
import { EditorView } from 'prosemirror-view';
import { CreateUIAnalyticsEventSignature } from '@atlaskit/analytics-next-types';

describe('mentionTypeahead', () => {
  const createEditor = createEditorFactory();
  const sessionIdRegex = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i;

  type TestDependencies = {
    editorView: EditorView;
    sel: number;
    mentionProvider: MentionProvider;
    createAnalyticsEvent: CreateUIAnalyticsEventSignature;
    event;
  };
  type TestExecutor = (
    deps: TestDependencies,
    ...args: any[]
  ) => void | Promise<void>;

  /**
   * Higher order function automatically creating the editor and triggering the
   * mention typeahead with the provided query.
   *
   * @param query The mention query to insert in the editor.
   * @param test Test case function to be passed to Jest
   * @return Promise resolving with the return value of the test.
   */
  const withMentionQuery = (query, test: TestExecutor) => async (
    ...args: any[]
  ) => {
    const { event, createAnalyticsEvent } = analyticsMocks();
    const { editorView, sel, mentionProvider } = await editor({
      createAnalyticsEvent,
    });
    const mentionResults = subscribe(mentionProvider, query);
    insertText(editorView, `@${query}`, sel);
    // Ensures results have been handled by the plugin before moving on
    await mentionResults;

    return await Promise.resolve(
      test(
        {
          editorView,
          sel,
          mentionProvider,
          createAnalyticsEvent,
          event,
        },
        ...args,
      ),
    );
  };

  /**
   * Sets the editor up to be used in the test suite, using default options
   * relevant to all tests.
   *
   * @param options List of options to add or override when creating the editor.
   * @return Object containing `editorView`, `sel` and `mentionProvider`.
   */
  const editor = async (options?) => {
    const mentionProvider = Promise.resolve(new MockMentionResource({}));
    const { editorView, sel } = createEditor({
      doc: doc(p('{<>}')),
      editorProps: { mentionProvider },
      providerFactory: ProviderFactory.create({
        mentionProvider,
      }),
      ...options,
    });

    return {
      editorView,
      sel,
      // Ensures the mention provider is resolved before inserting in the editor
      mentionProvider: await mentionProvider,
    };
  };

  /**
   * Subscribes to the given `mentionProvider` and returns a promise that only
   * resolves when it gets notified of results for the given `query`.
   *
   * @param mentionProvider Mention provider to listen to for change events.
   * @param query Query string for which the subscrition resolves.
   *              Default: empty string.
   * @return Promise resolving with `MentionDescription[]`
   */
  const subscribe = (mentionProvider: MentionProvider, query = '') => {
    return new Promise<MentionDescription[]>(resolve => {
      const subscribeKey = 'mentionPluginTest';
      mentionProvider.subscribe(subscribeKey, (mentions, resultQuery) => {
        if (query === resultQuery) {
          mentionProvider.unsubscribe(subscribeKey);
          resolve(mentions);
        }
      });
    });
  };

  /**
   * Creates and return mocks for analytics to be passed to the editor.
   *
   * @return Object containing the mocks `event` and `createAnalyticsEvent`.
   */
  const analyticsMocks = () => {
    const event = { fire: jest.fn().mockName('event.fire') };
    const createAnalyticsEvent = jest
      .fn(() => event)
      .mockName('createAnalyticsEvent');

    return {
      createAnalyticsEvent,
      event,
    };
  };

  describe('analytics', () => {
    it(
      'should fire typeahead cancelled event',
      withMentionQuery('all', ({ editorView, event, createAnalyticsEvent }) => {
        jest.clearAllMocks();
        dismissCommand()(editorView.state, editorView.dispatch);

        expect(createAnalyticsEvent).toHaveBeenCalledWith(
          expect.objectContaining({
            action: 'cancelled',
            actionSubject: 'mentionTypeahead',
            eventType: 'ui',
            attributes: expect.objectContaining({
              packageName: '@atlaskit/editor-core',
              packageVersion: expect.any(String),
              sessionId: expect.stringMatching(sessionIdRegex),
              spaceInQuery: false,
              queryLength: 3,
              duration: expect.any(Number),
            }),
          }),
        );
        expect(event.fire).toHaveBeenCalledTimes(1);
        expect(event.fire).toHaveBeenCalledWith('fabric-elements');
      }),
    );

    it.each([
      ['pressed', () => selectCurrentItem('enter'), 'enter'],
      ['clicked', () => selectCurrentItem(), undefined],
    ])(
      'should fire typeahead %s event',
      withMentionQuery(
        'here',
        (
          { editorView, event, createAnalyticsEvent },
          expectedActionName,
          selectCurrentItem,
          keyboardKey,
        ) => {
          jest.clearAllMocks();
          selectCurrentItem()(editorView.state, editorView.dispatch);

          expect(createAnalyticsEvent).toHaveBeenCalledWith(
            expect.objectContaining({
              action: expectedActionName,
              actionSubject: 'mentionTypeahead',
              eventType: 'ui',
              attributes: expect.objectContaining({
                packageName: '@atlaskit/editor-core',
                packageVersion: expect.any(String),
                duration: expect.any(Number),
                position: 0,
                keyboardKey: keyboardKey,
                queryLength: 4,
                spaceInQuery: false,
                accessLevel: 'CONTAINER',
                userType: 'SPECIAL',
                userId: 'here',
              }),
            }),
          );
          expect(event.fire).toHaveBeenCalledTimes(1);
          expect(event.fire).toHaveBeenCalledWith('fabric-elements');
        },
      ),
    );

    it(
      'should fire typeahead rendered event on bootstrap',
      withMentionQuery('', ({ event, createAnalyticsEvent }) => {
        expect(createAnalyticsEvent).toHaveBeenCalledWith(
          expect.objectContaining({
            action: 'rendered',
            actionSubject: 'mentionTypeahead',
            eventType: 'operational',
            attributes: expect.objectContaining({
              packageName: '@atlaskit/editor-core',
              packageVersion: expect.any(String),
              duration: expect.any(Number),
              queryLength: 0,
              spaceInQuery: false,
              userIds: expect.any(Array),
              sessionId: expect.any(String),
            }),
          }),
        );
        expect(event.fire).toHaveBeenCalledTimes(1);
        expect(event.fire).toHaveBeenCalledWith('fabric-elements');
      }),
    );

    it(
      'should fire typeahead rendered event',
      withMentionQuery('all', ({ event, createAnalyticsEvent }) => {
        expect(createAnalyticsEvent).toHaveBeenCalledWith(
          expect.objectContaining({
            action: 'rendered',
            actionSubject: 'mentionTypeahead',
            eventType: 'operational',
            attributes: expect.objectContaining({
              packageName: '@atlaskit/editor-core',
              packageVersion: expect.any(String),
              duration: expect.any(Number),
              queryLength: 3,
              spaceInQuery: false,
              userIds: expect.any(Array),
              sessionId: expect.any(String),
            }),
          }),
        );
        expect(event.fire).toHaveBeenCalledTimes(4);
        expect(event.fire).toHaveBeenCalledWith('fabric-elements');
      }),
    );
  });

  describe('mentionProvider', () => {
    describe('when selecting a user', () => {
      it(
        'should record the selection',
        withMentionQuery('here', ({ editorView, mentionProvider }) => {
          const recordMentionSelectionSpy = jest.spyOn(
            mentionProvider,
            'recordMentionSelection',
          );

          selectCurrentItem()(editorView.state, editorView.dispatch);

          expect(recordMentionSelectionSpy).toHaveBeenCalledTimes(1);
          expect(recordMentionSelectionSpy).toHaveBeenCalledWith(
            expect.objectContaining({
              id: 'here',
            }),
          );
        }),
      );
    });
  });
});
