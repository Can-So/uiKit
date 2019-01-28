import { createEditor, insertText } from '@atlaskit/editor-test-helpers';
import { doc, p } from '@atlaskit/editor-test-helpers';
import { MockMentionResource } from '@atlaskit/util-data-test';
import { selectCurrentItem } from '../../../../plugins/type-ahead/commands/select-item';
import { dismissCommand } from '../../../../plugins/type-ahead/commands/dismiss';
import { ProviderFactory } from '@atlaskit/editor-common';
import { MentionProvider, MentionDescription } from '@atlaskit/mention';
import { EditorView } from 'prosemirror-view';

describe('mentionTypeahead', () => {
  const sessionIdRegex = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i;
  const mentionProvider = new Promise<any>(resolve => {
    resolve(new MockMentionResource({}));
  });
  let editorView: EditorView;
  let sel: number;
  let provider: MentionProvider;

  /**
   * Sets the editor up to be used in the test suite, using default options
   * relevant to all tests.
   *
   * @param options List of options to add or override when creating the editor.
   */
  const setUpEditor = async (options?) => {
    ({ editorView, sel } = createEditor({
      doc: doc(p('{<>}')),
      editorProps: { mentionProvider },
      providerFactory: ProviderFactory.create({ mentionProvider }),
      ...options,
    }));
    provider = await mentionProvider;
  };

  /**
   * Triggers the mention typeahead in the editor with the provided text to be
   * used as the query. This is a helper that can be used to ensure that
   * results have resolved in the typeahead before executing expectations.
   *
   * @param query Text to be used as the mention query.
   * @returns A promise that resolves once mention results are returned for the
   *          provided query.
   */
  const triggerMentionTypeahead = async (query: string = '') => {
    const promise = new Promise<MentionDescription[]>(resolve => {
      const subscribeKey = 'mentionPluginTest';
      provider.subscribe(subscribeKey, (mentions, resultQuery) => {
        if (query === resultQuery) {
          provider.unsubscribe(subscribeKey);
          resolve(mentions);
        }
      });
    });
    insertText(editorView, `@${query}`, sel);
    return await promise;
  };

  describe('analytics', () => {
    let createAnalyticsEvent;
    let event;

    beforeEach(async () => {
      event = { fire: jest.fn().mockName('event.fire') };
      createAnalyticsEvent = jest
        .fn(() => event)
        .mockName('createAnalyticsEvent');

      await setUpEditor({ createAnalyticsEvent });
    });

    it('should fire typeahead cancelled event', () => {
      triggerMentionTypeahead('all');

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
    });

    it('should fire typeahead pressed event', async () => {
      await triggerMentionTypeahead('here');

      event.fire.mockClear();
      selectCurrentItem('enter')(editorView.state, editorView.dispatch);

      expect(createAnalyticsEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'pressed',
          actionSubject: 'mentionTypeahead',
          eventType: 'ui',
          attributes: expect.objectContaining({
            packageName: '@atlaskit/editor-core',
            packageVersion: expect.any(String),
            duration: expect.any(Number),
            position: 0,
            keyboardKey: 'enter',
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
    });

    it('should fire typeahead clicked event', async () => {
      await triggerMentionTypeahead('all');

      event.fire.mockClear();
      selectCurrentItem()(editorView.state, editorView.dispatch);

      expect(createAnalyticsEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'clicked',
          actionSubject: 'mentionTypeahead',
          eventType: 'ui',
          attributes: expect.objectContaining({
            packageName: '@atlaskit/editor-core',
            packageVersion: expect.any(String),
            duration: expect.any(Number),
            position: 0,
            keyboardKey: undefined,
            queryLength: 3,
            spaceInQuery: false,
            accessLevel: 'CONTAINER',
            userType: 'SPECIAL',
            userId: 'all',
          }),
        }),
      );
      expect(event.fire).toHaveBeenCalledTimes(1);
      expect(event.fire).toHaveBeenCalledWith('fabric-elements');
    });

    it('should fire typeahead rendered event on bootstrap', async () => {
      await triggerMentionTypeahead();

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
    });

    it('should fire typeahead rendered event', async () => {
      await triggerMentionTypeahead('all');

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
    });
  });

  describe('mentionProvider', () => {
    describe('when selecting a user', () => {
      beforeEach(async () => {
        await setUpEditor();
      });

      it('should record the selection', async () => {
        let recordMentionSelectionSpy = jest.spyOn(
          provider,
          'recordMentionSelection',
        );
        await triggerMentionTypeahead('here');

        selectCurrentItem()(editorView.state, editorView.dispatch);

        expect(recordMentionSelectionSpy).toHaveBeenCalledTimes(1);
        expect(recordMentionSelectionSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            id: 'here',
          }),
        );
      });
    });
  });
});
