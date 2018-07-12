import * as React from 'react';
import { OnEmojiEvent, EmojiProvider } from '@atlaskit/emoji';
import EditorMoreIcon from '@atlaskit/icon/glyph/editor/more';

import { mount, shallow } from 'enzyme';
import EmojiButton from '../../../internal/emoji-button';
import Selector from '../../../internal/selector';
import {
  defaultReactions,
  isDefaultReaction,
  revealStyle,
} from '../../../internal/selector';
import { emoji } from '@atlaskit/util-data-test';

const { getEmojiResourcePromise } = emoji.testData;

const renderSelector = (
  onSelection: OnEmojiEvent = () => {},
  showMore = false,
  onMoreClick = () => {},
) => {
  return (
    <Selector
      emojiProvider={getEmojiResourcePromise() as Promise<EmojiProvider>}
      onSelection={onSelection}
      showMore={showMore}
      onMoreClick={onMoreClick}
    />
  );
};

describe('@atlaskit/reactions/selector', () => {
  beforeEach(function() {
    jest.useFakeTimers();
  });

  afterEach(function() {
    jest.useRealTimers();
  });

  it('should render default reactions', () => {
    const selector = shallow(renderSelector());
    const emojis = selector.find(EmojiButton);

    expect(emojis.length).toEqual(defaultReactions.length);

    emojis.forEach(emoji => {
      expect(isDefaultReaction(emoji.props().emojiId)).toEqual(true);
    });

    expect(selector.find(EditorMoreIcon)).toHaveLength(0);
  });

  it('should call "onSelection" on selection', () => {
    const onSelection = jest.fn();
    const selector = mount(renderSelector(onSelection));
    selector
      .find(EmojiButton)
      .first()
      .simulate('mouseup', { button: 0 });

    jest.runTimersToTime(500);
    expect(onSelection).toHaveBeenCalled();
  });

  it('should call "onMoreClick" when more button is clicked', () => {
    const onSelection = jest.fn();
    const onMoreClick = jest.fn();
    const selector = mount(renderSelector(onSelection, true, onMoreClick));

    selector.find(EditorMoreIcon).simulate('mousedown');

    expect(onMoreClick.mock.calls).toHaveLength(1);
  });

  it('should calculate animation delay based on reaction index', () => {
    const selector = mount(renderSelector());

    expect(
      selector
        .find(`.${revealStyle}`)
        .at(2)
        .prop('style'),
    ).toHaveProperty('animationDelay', '100ms');
  });
});
