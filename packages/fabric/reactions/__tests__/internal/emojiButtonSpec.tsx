import {
  Emoji,
  EmojiDescription,
  EmojiId,
  OnEmojiEvent,
  toEmojiId,
  EmojiProvider,
} from '@atlaskit/emoji';
import * as chai from 'chai';
import * as React from 'react';
import * as sinon from 'sinon';
import { waitUntil } from '@atlaskit/util-common-test';
import { mount, shallow } from 'enzyme';

import { hasSelector } from '../_test-utils';
import EmojiButton from '../../src/internal/emoji-button';
import { testData } from '@atlaskit/emoji/dist/es5/support';

const { getEmojiResourcePromise, newEmojiRepository } = testData;
const emojiRepository = newEmojiRepository();

const { expect } = chai;

const smiley: EmojiDescription = emojiRepository.findByShortName(
  ':smiley:',
) as EmojiDescription;
const emojiId: EmojiId = toEmojiId(smiley);

const renderEmojiButton = (onClick: OnEmojiEvent = () => {}) => {
  return (
    <EmojiButton
      onClick={onClick}
      emojiId={emojiId}
      emojiProvider={getEmojiResourcePromise() as Promise<EmojiProvider>}
    />
  );
};

describe('@atlaskit/reactions/emoji-button', () => {
  it('should render a button', () => {
    const emojiButton = shallow(renderEmojiButton());
    expect(emojiButton.find('button').length).to.equal(1);
  });

  it('should render an emoji', () => {
    const emojiButton = mount(renderEmojiButton());
    return waitUntil(() => hasSelector(emojiButton, Emoji)).then(() => {
      const emoji = emojiButton.find(Emoji);
      expect(emoji.length).to.equal(1);
      expect(emoji.first().prop('emoji').id).to.equal(emojiId.id);
    });
  });

  it('should call "onClick" when clicked', () => {
    const onClick = sinon.spy();
    const emojiButton = mount(renderEmojiButton(onClick));
    emojiButton.simulate('mouseup', { button: 0 });
    expect(onClick.called).to.equal(true);
  });
});
