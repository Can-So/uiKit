import * as classNames from 'classnames';
import * as React from 'react';
import { MouseEvent } from 'react';

import * as styles from './styles';
import Emoji from './Emoji';
import { EmojiDescription } from '../../types';
import { leftClick } from '../../util/mouse';

export interface Props {
  emoji: EmojiDescription;
  onSelected?: () => void;
  selectOnHover?: boolean;
}

const handleMouseDown = (props: Props, event: MouseEvent<any>) => {
  const { onSelected } = props;
  event.preventDefault();
  if (onSelected && leftClick(event)) {
    onSelected();
  }
};

// tslint:disable-next-line:variable-name
export const EmojiButton = (props: Props) => {
  const { emoji, selectOnHover } = props;

  const classes = [styles.emojiButton];

  return (
    <button
      className={classNames(classes)}
      // tslint:disable-next-line:jsx-no-lambda
      onMouseDown={event => {
        handleMouseDown(props, event);
      }}
    >
      <Emoji emoji={emoji} selectOnHover={selectOnHover} />
    </button>
  );
};

export default EmojiButton;
