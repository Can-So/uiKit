import { OnEmojiEvent, RelativePosition } from '../src/types';
import { EmojiProvider } from '../src/api/EmojiResource';

export interface TypeaheadProps {
  label: string;
  onSelection: OnEmojiEvent;
  emojiProvider: Promise<EmojiProvider>;
  position?: RelativePosition;
}

export interface TypeaheadState {
  active: boolean;
  query?: string;
}
