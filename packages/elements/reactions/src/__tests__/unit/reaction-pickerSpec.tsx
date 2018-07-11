import { EmojiPicker, EmojiProvider } from '@atlaskit/emoji';
import EditorMoreIcon from '@atlaskit/icon/glyph/editor/more';
import * as React from 'react';

import { mount, shallow } from 'enzyme';
import { ReactionPicker } from '../..';
import EmojiButton from '../../internal/emoji-button';
import Selector from '../../internal/selector';
import Trigger from '../../internal/trigger';
import { emoji } from '@atlaskit/util-data-test';

const { getEmojiResourcePromise } = emoji.testData;

describe('@atlaskit/reactions/reaction-picker', () => {
  const renderPicker = (onSelection: Function = () => {}, disabled = false) => {
    return (
      <ReactionPicker
        emojiProvider={getEmojiResourcePromise() as Promise<EmojiProvider>}
        onSelection={onSelection}
        allowAllEmojis={true}
        disabled={disabled}
      />
    );
  };

  const animStub = window.cancelAnimationFrame;

  beforeEach(function() {
    window.cancelAnimationFrame = () => {};
    jest.useFakeTimers();
  });

  afterEach(function() {
    jest.useRealTimers();
    window.cancelAnimationFrame = animStub;
  });

  it('should render a trigger', () => {
    const picker = shallow(renderPicker());
    expect(picker.find(Trigger).length).toEqual(1);
  });

  it('should render selector when trigger is clicked', () => {
    const picker = mount(renderPicker());
    const trigger = picker.find(Trigger);
    trigger.simulate('click');
    expect(picker.find(Selector).length).toEqual(1);
  });

  it('should render emoji picker when "..." button is clicked', () => {
    const picker = mount(renderPicker());
    const trigger = picker.find(Trigger);
    trigger.simulate('click');
    const moreButton = picker.find(EditorMoreIcon);
    moreButton.simulate('mousedown', { button: 0 });
    expect(picker.find(EmojiPicker).length).toEqual(1);
  });

  it('should call "onSelection" when an emoji is seleted', () => {
    const onSelectionSpy = jest.fn();
    const picker = mount(renderPicker(onSelectionSpy));
    const trigger = picker.find(Trigger);
    trigger.simulate('click');
    const selector = picker.find(Selector);
    selector
      .find(EmojiButton)
      .first()
      .simulate('mouseup', { button: 0 });

    jest.runTimersToTime(500);
    expect(onSelectionSpy).toHaveBeenCalled();
  });

  it('should disable trigger', () => {
    const onSelectionSpy = jest.fn();
    const picker = mount(renderPicker(onSelectionSpy, true));
    expect(picker.find(Trigger).prop('disabled')).toBeTruthy();
  });
});
