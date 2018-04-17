import * as React from 'react';
import * as cx from 'classnames';
import { PureComponent, SyntheticEvent } from 'react';
import { style, keyframes } from 'typestyle';
import {
  EmojiId,
  EmojiProvider,
  OnEmojiEvent,
  OptionalEmojiDescription,
} from '@atlaskit/emoji';
import Tooltip from '@atlaskit/tooltip';
import EmojiButton from './emoji-button';
import ShowMore from './show-more';

import { equalEmojiId } from './helpers';

export interface Props {
  emojiProvider: Promise<EmojiProvider>;
  onSelection: OnEmojiEvent;
  showMore: boolean;
  onMoreClick: React.MouseEventHandler<HTMLElement>;
}

const selectorStyle = style({
  boxSizing: 'border-box',
  display: 'flex',
  padding: 0,
});

const emojiStyle = style({
  display: 'inline-block',
  opacity: 0,
  $nest: {
    '&.selected': {
      transition: 'transform 200ms ease-in-out  ',
      transform: 'translateY(-48px) scale(2.667)',
    },
  },
});

const revealAnimation = keyframes({
  '0%': {
    opacity: 1,
    transform: 'scale(0.5)',
  },
  '75%': {
    transform: 'scale(1.25)',
  },
  '100%': {
    opacity: 1,
    transform: 'scale(1)',
  },
});

export const revealStyle = style({
  animation: `${revealAnimation} 150ms ease-in-out forwards`,
});

const revealDelay = index => ({ animationDelay: `${index * 50}ms` });

export const defaultReactions: EmojiId[] = [
  { id: '1f44d', shortName: ':thumbsup:' },
  { id: '1f44e', shortName: ':thumbsdown:' },
  { id: '1f525', shortName: ':fire:' },
  { id: '1f60d', shortName: ':heart_eyes:' },
  { id: '1f602', shortName: ':joy:' },
  { id: '1f622', shortName: ':cry:' },
];

export const defaultReactionsByShortName: Map<string, EmojiId> = new Map<
  string,
  EmojiId
>(
  defaultReactions.map<[string, EmojiId]>(reaction => [
    reaction.shortName,
    reaction,
  ]),
);

export const isDefaultReaction = (emojiId: EmojiId) =>
  defaultReactions.filter(otherEmojiId => equalEmojiId(otherEmojiId, emojiId))
    .length > 0;

export interface State {
  selection: EmojiId | undefined;
}

export default class Selector extends PureComponent<Props, State> {
  private timeouts: Array<number>;

  constructor(props) {
    super(props);
    this.timeouts = [];

    this.state = {
      selection: undefined,
    };
  }

  componentWillUnmount() {
    this.timeouts.forEach(clearTimeout);
  }

  private onEmojiSelected = (
    emojiId: EmojiId,
    emoji: OptionalEmojiDescription,
    event: SyntheticEvent<any>,
  ) => {
    this.timeouts.push(
      setTimeout(() => this.props.onSelection(emojiId, emoji, event), 250),
    );
    this.setState({
      selection: emojiId,
    });
  };

  private renderEmoji = (emojiId, index) => {
    const { emojiProvider } = this.props;
    const key = emojiId.id || emojiId.shortName;

    const classNames = cx(emojiStyle, revealStyle, {
      selected: emojiId === this.state.selection,
    });

    const style = revealDelay(index);

    return (
      <div key={key} className={classNames} style={style}>
        <Tooltip content={emojiId.shortName}>
          <EmojiButton
            emojiId={emojiId}
            emojiProvider={emojiProvider}
            onClick={this.onEmojiSelected}
          />
        </Tooltip>
      </div>
    );
  };

  private renderShowMore = (): React.ReactNode => (
    <ShowMore
      key="more"
      className={{ button: revealStyle }}
      style={{ button: revealDelay(defaultReactions.length) }}
      onClick={this.props.onMoreClick}
    />
  );

  render() {
    const { showMore } = this.props;

    return (
      <div className={selectorStyle}>
        {defaultReactions.map(this.renderEmoji)}

        {showMore ? this.renderShowMore() : null}
      </div>
    );
  }
}
