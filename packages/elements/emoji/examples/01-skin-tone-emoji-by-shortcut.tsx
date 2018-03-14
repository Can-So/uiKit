import * as React from 'react';

import ResourcedEmoji from '../src/components/common/ResourcedEmoji';
import { EmojiProvider } from '../src/api/EmojiResource';

import { getEmojiResource } from '../src/support/story-data';

export default function Example() {
  return (
    <span>
      <ResourcedEmoji
        emojiId={{ shortName: ':thumbsup:' }}
        emojiProvider={getEmojiResource() as Promise<EmojiProvider>}
        showTooltip={true}
      />
      <ResourcedEmoji
        emojiId={{ shortName: ':thumbsup::skin-tone-2:' }}
        emojiProvider={getEmojiResource() as Promise<EmojiProvider>}
        showTooltip={true}
      />
      <ResourcedEmoji
        emojiId={{ shortName: ':thumbsup::skin-tone-3:' }}
        emojiProvider={getEmojiResource() as Promise<EmojiProvider>}
        showTooltip={true}
      />
      <ResourcedEmoji
        emojiId={{ shortName: ':thumbsup::skin-tone-4:' }}
        emojiProvider={getEmojiResource() as Promise<EmojiProvider>}
        showTooltip={true}
      />
      <ResourcedEmoji
        emojiId={{ shortName: ':thumbsup::skin-tone-5:' }}
        emojiProvider={getEmojiResource() as Promise<EmojiProvider>}
        showTooltip={true}
      />
      <ResourcedEmoji
        emojiId={{ shortName: ':thumbsup::skin-tone-6:' }}
        emojiProvider={getEmojiResource() as Promise<EmojiProvider>}
        showTooltip={true}
      />
      <ResourcedEmoji
        emojiId={{
          shortName:
            ':thumbsup::skin-tone-7:' /* invalid - will fallback to text render */,
        }}
        emojiProvider={getEmojiResource() as Promise<EmojiProvider>}
        showTooltip={true} /* should not show tooltip */
      />
    </span>
  );
}
