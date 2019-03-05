import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { EmojiProvider } from '@atlaskit/emoji';
import EditorEmojiTypeAhead from '../../../../../plugins/emoji/ui/EmojiTypeAhead';
import { analyticsService, AnalyticsHandler } from '../../../../../analytics';

describe('EmojiTypeAhead', () => {
  const emojiProvider = Promise.resolve({} as EmojiProvider);

  describe('Analytics', () => {
    const insertEmojiMock = jest.fn();
    const selectNextMock = jest.fn();
    const selectPreviousMock = jest.fn();

    const pluginKey = {
      getState: jest.fn(),
    } as any;

    const editorView = {
      insertEmoji: jest.fn(),
    } as any;

    const emojiTypeAheadMock = {
      selectNext: selectNextMock,
      selectPrevious: selectPreviousMock,
    } as any;

    let trackEvent: jest.SpyInstance<AnalyticsHandler>;
    let component: ShallowWrapper<EditorEmojiTypeAhead>;
    let componentInstance: EditorEmojiTypeAhead;
    let dispatchAnalyticsSpy;

    pluginKey.getState.mockReturnValue({
      query: ':ok',
      subscribe: jest.fn(),
      unsubscribe: jest.fn(),
      insertEmoji: insertEmojiMock,
    });

    beforeEach(() => {
      trackEvent = jest.spyOn(analyticsService, 'trackEvent');
      dispatchAnalyticsSpy = jest.fn();

      component = shallow(
        <EditorEmojiTypeAhead
          pluginKey={pluginKey}
          editorView={editorView}
          emojiProvider={emojiProvider}
          dispatchAnalyticsEvent={dispatchAnalyticsSpy}
        />,
      );
      componentInstance = component.instance() as EditorEmojiTypeAhead;

      componentInstance.handleEmojiTypeAheadRef(emojiTypeAheadMock);
    });

    afterEach(() => {
      trackEvent.mockRestore();
      component.unmount();
    });

    it('should fire analytics in handleOnOpen', () => {
      componentInstance.handleOnOpen();
      expect(trackEvent).toHaveBeenCalledWith(
        'atlassian.fabric.emoji.typeahead.open',
        {},
      );
    });

    it('should fire analytics in handleOnClose', () => {
      componentInstance.handleOnClose();
      expect(trackEvent).toHaveBeenCalledWith(
        'atlassian.fabric.emoji.typeahead.close',
        {},
      );
    });

    it('should fire analytics in handleSpaceTyped', () => {
      componentInstance.handleSpaceTyped();
      expect(trackEvent).toHaveBeenCalledWith(
        'atlassian.fabric.emoji.typeahead.space',
        {},
      );
    });

    it('should fire analytics in handleSelectPrevious', () => {
      (componentInstance as any).handleSelectPrevious();
      expect(selectPreviousMock).toHaveBeenCalled();
      expect(trackEvent).toHaveBeenCalledWith(
        'atlassian.fabric.emoji.typeahead.keyup',
        {},
      );
    });

    it('should fire analytics in handleSelectNext', () => {
      (componentInstance as any).handleSelectNext();
      expect(selectNextMock).toHaveBeenCalled();
      expect(trackEvent).toHaveBeenCalledWith(
        'atlassian.fabric.emoji.typeahead.keydown',
        {},
      );
    });

    it('should fire analytics in handleSpaceSelectCurrent', () => {
      componentInstance.handleOnOpen(); // set openTime
      trackEvent.mockReset();

      (componentInstance as any).handleSpaceSelectCurrent(
        {
          id: 'emojiId',
          type: 'emojiType',
        },
        'Enter',
        ':foo',
      );

      expect(trackEvent).toHaveBeenCalledWith(
        'atlassian.fabric.emoji.typeahead.select',
        expect.objectContaining({
          mode: 'enter',
          emojiId: 'emojiId',
          type: 'emojiType',
          queryLength: 4,
        }),
      );
    });

    describe('handleSelectedEmoji', () => {
      beforeEach(() => {
        componentInstance.handleOnOpen(); // set openTime
        trackEvent.mockReset();

        (componentInstance as any).handleSelectedEmoji('emojiId', {
          id: 'emojiId',
          type: 'emojiType',
        });
      });

      it('should fire v2 analytics event', () => {
        expect(insertEmojiMock).toHaveBeenCalledWith('emojiId');
        expect(trackEvent).toHaveBeenCalledWith(
          'atlassian.fabric.emoji.typeahead.select',
          expect.objectContaining({
            mode: 'selected',
            emojiId: 'emojiId',
            type: 'emojiType',
            queryLength: 3,
          }),
        );
      });

      it('should fire v3 analytics event', () => {
        expect(dispatchAnalyticsSpy).toHaveBeenCalledWith({
          action: 'inserted',
          actionSubject: 'document',
          actionSubjectId: 'emoji',
          attributes: { inputMethod: 'typeAhead' },
          eventType: 'track',
        });
      });
    });
  });
});
