import { AnalyticsListener } from '@atlaskit/analytics-next';
import {
  Emoji,
  EmojiDescription,
  EmojiProvider,
  toEmojiId,
} from '@atlaskit/emoji';
import { waitUntil } from '@atlaskit/util-common-test';
import { emoji } from '@atlaskit/util-data-test';
import { mount } from 'enzyme';
import * as React from 'react';
import { FlashAnimation } from '../../../components/FlashAnimation';
import { Reaction, ReactionOnClick } from '../../../components/Reaction';
import { ReactionTooltip } from '../../../components/ReactionTooltip';
import { ReactionSummary, User } from '../../../types';
import { hasSelector } from '../_test-utils';

const { getEmojiResourcePromise, newEmojiRepository } = emoji.testData;
const emojiRepository = newEmojiRepository();
const ari = 'ari:cloud:owner:demo-cloud-id:item/1';
const containerAri = 'ari:cloud:owner:demo-cloud-id:container/1';

const grinning: EmojiDescription = emojiRepository.findByShortName(
  ':grinning:',
) as EmojiDescription;

const buildReaction = (
  count: number,
  reacted: boolean,
  users?: User[],
): ReactionSummary => ({
  ari,
  containerAri,
  emojiId: toEmojiId(grinning).id!,
  count,
  reacted,
  users,
});

const renderReaction = (
  reacted: boolean,
  count: number,
  onClick: ReactionOnClick,
  flash: boolean = false,
) => (
  <Reaction
    reaction={buildReaction(count, reacted)}
    emojiProvider={getEmojiResourcePromise() as Promise<EmojiProvider>}
    onClick={onClick}
    flash={flash}
  />
);

describe('@atlaskit/reactions/reaction', () => {
  it('should render emoji with resolved emoji data', () => {
    const reaction = mount(renderReaction(false, 1, () => {}));

    waitUntil(() => hasSelector(reaction, Emoji)).then(() => {
      const emoji = reaction.find(Emoji).first();
      expect(emoji.length).toEqual(1);
      const emojiDesc = emoji.prop('emoji');
      expect(emojiDesc.id).toEqual(grinning.id);
    });
  });

  it('should call onClick on click', () => {
    const onClickSpy = jest.fn();
    const reaction = mount(renderReaction(false, 1, onClickSpy));

    reaction
      .find('button')
      .first()
      .simulate('mouseup', { button: 0 });
    expect(onClickSpy).toHaveBeenCalled();
  });

  it('should delegate flash to Flash component', () => {
    const reaction = mount(renderReaction(true, 10, () => {}, true));

    const flash = reaction.find(FlashAnimation);

    expect(flash.prop('flash')).toBeTruthy();
  });

  it('should render ReactionTooltip', () => {
    const reaction = mount(renderReaction(false, 1, () => {}));

    const tooltip = reaction.find(ReactionTooltip);
    expect(tooltip.prop('reaction')).toEqual(buildReaction(1, false));
  });

  describe('with analytics', () => {
    const onEvent = jest.fn();

    const ReactionWithAnalyticsListener = (props: {
      reacted: boolean;
      count: number;
      onClick: ReactionOnClick;
      users?: User[];
    }) => (
      <AnalyticsListener channel="fabric-elements" onEvent={onEvent}>
        <Reaction
          reaction={buildReaction(props.count, props.reacted, props.users)}
          emojiProvider={getEmojiResourcePromise() as Promise<EmojiProvider>}
          onClick={props.onClick}
        />
      </AnalyticsListener>
    );

    afterEach(() => {
      onEvent.mockClear();
    });

    it('should trigger clicked for Reaction', () => {
      const component = mount(
        <ReactionWithAnalyticsListener
          reacted={false}
          count={10}
          onClick={jest.fn()}
        />,
      );
      component
        .find('button')
        .first()
        .simulate('mouseup', { button: 0 });

      expect(onEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: expect.objectContaining({
            action: 'clicked',
            actionSubject: 'existingReaction',
            eventType: 'ui',
            attributes: {
              added: true,
              emojiId: toEmojiId(grinning).id!,
              packageName: '@atlaskit/reactions',
              packageVersion: expect.any(String),
            },
          }),
        }),
        'fabric-elements',
      );
    });

    it('should trigger hovered for Reaction', () => {
      const component = mount(
        <ReactionWithAnalyticsListener
          reacted={false}
          count={10}
          onClick={jest.fn()}
        />,
      );
      component
        .find('button')
        .first()
        .simulate('mouseover');

      component.setProps({
        users: [
          {
            id: 'user-1',
            displayName: 'Luiz',
          },
        ],
      });

      expect(onEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          payload: expect.objectContaining({
            action: 'hovered',
            actionSubject: 'existingReaction',
            eventType: 'ui',
            attributes: {
              duration: expect.any(Number),
              packageName: '@atlaskit/reactions',
              packageVersion: expect.any(String),
            },
          }),
        }),
        'fabric-elements',
      );
    });
  });
});
