import * as React from 'react';

import Emoji from '../src/components/common/Emoji';
import { getEmojiRepository } from '../example-helpers';

const emojiService = getEmojiRepository();

const renderEmoji = (fitToHeight: number = 24) => {
  const blueStar = emojiService.findById('atlassian-blue_star');
  const blueStarEmoji = blueStar ? (
    <Emoji emoji={blueStar} showTooltip={true} fitToHeight={fitToHeight} />
  ) : (
    <span>[blueStar emoji not found]</span>
  );
  const wtf = emojiService.findByShortName(':wtf:');
  const wtfEmoji = wtf ? (
    <Emoji
      emoji={wtf}
      showTooltip={true}
      fitToHeight={fitToHeight}
      selected={true}
    />
  ) : (
    <span>[wtf emoji not found]</span>
  );
  const grimacing = emojiService.findByShortName(':grimacing:');
  const grimacingEmoji = grimacing ? (
    <Emoji emoji={grimacing} showTooltip={true} fitToHeight={fitToHeight} />
  ) : (
    <span>[grimacing emoji not found]</span>
  );
  return (
    <div style={{ lineHeight: `${fitToHeight}px` }}>
      {blueStarEmoji}
      {wtfEmoji}
      {grimacingEmoji}
    </div>
  );
};

export default function Example() {
  return (
    <div>
      <p>{renderEmoji()}</p>
      <p>{renderEmoji(32)}</p>
      <p>{renderEmoji(48)}</p>
      <p>{renderEmoji(128)}</p>
    </div>
  );
}
