import { Emoji, EmojiDescription, toEmojiId } from '@atlaskit/emoji';
import * as chai from 'chai';
import * as React from 'react';
import * as sinon from 'sinon';
import { waitUntil } from '@atlaskit/util-common-test';
import { mount, shallow } from 'enzyme';

import { hasSelector } from '../_test-utils';
import Reaction, { ReactionOnClick } from '../../src/internal/reaction';
import { testData } from '@atlaskit/emoji/dist/es5/support';
import { EmojiProvider } from '@atlaskit/emoji';

const { getEmojiResourcePromise, newEmojiRepository } = testData;
const emojiRepository = newEmojiRepository();

const { expect } = chai;

const grinning: EmojiDescription = emojiRepository.findByShortName(
  ':grinning:',
) as EmojiDescription;
const renderReaction = (
  reacted: boolean,
  count: number,
  onClick: ReactionOnClick,
) => {
  const reactionData = {
    ari: 'ari:cloud:owner:demo-cloud-id:item/1',
    containerAri: 'ari:cloud:owner:demo-cloud-id:container/1',
    emojiId: toEmojiId(grinning).id!,
    count: count,
    reacted: reacted,
  };

  return (
    <Reaction
      reaction={reactionData}
      emojiProvider={getEmojiResourcePromise() as Promise<EmojiProvider>}
      onClick={onClick}
    />
  );
};

describe('@atlaskit/reactions/reaction', () => {
  it('should render emoji with resolved emoji data', () => {
    const reaction = mount(renderReaction(false, 1, () => {}));

    waitUntil(() => hasSelector(reaction, Emoji)).then(() => {
      const emoji = reaction.find(Emoji).first();
      expect(emoji.length).to.equal(1);
      const emojiDesc = emoji.prop('emoji');
      expect(emojiDesc.id).to.equal(grinning.id);
    });
  });

  it('should render with "reacted" css-class if user have reacted', () => {
    const reaction = shallow(renderReaction(true, 1, emojiId => {}));
    expect(reaction.hasClass('reacted')).to.equal(true);
  });

  it('should call onClick on click', () => {
    const onClickSpy = sinon.spy();
    const reaction = mount(renderReaction(false, 1, onClickSpy));

    reaction.simulate('mouseup', { button: 0 });
    expect(onClickSpy.called).to.equal(true);
  });
});
