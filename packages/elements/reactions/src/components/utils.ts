import { EmojiId } from '@atlaskit/emoji';

export const isLeftClick = event =>
  event.button === 0 &&
  !event.altKey &&
  !event.ctrlKey &&
  !event.metaKey &&
  !event.shiftKey;

export const equalEmojiId = (
  l: EmojiId | string,
  r: EmojiId | string,
): boolean => {
  if (isEmojiId(l) && isEmojiId(r)) {
    return l === r || (l && r && l.id === r.id && l.shortName === r.shortName);
  } else {
    return l === r;
  }
};

const isEmojiId = (emojiId: EmojiId | string): emojiId is EmojiId => {
  return (emojiId as EmojiId).id !== undefined;
};
