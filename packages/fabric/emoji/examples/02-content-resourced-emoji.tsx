import * as React from 'react';

import ResourcedEmoji from '../src/components/common/ResourcedEmoji';
import { EmojiProvider } from '../src/api/EmojiResource';

import { getEmojiResource, lorem } from '../src/support/story-data';

interface SampleEmojiProps {
  emojiProvider?: Promise<EmojiProvider>;
  fitToHeight?: number;
}

const lineStyle = (height: number = 24) => ({
  lineHeight: `${height}px`,
});

// tslint:disable-next-line:variable-name
const SampleEmojis = (props: SampleEmojiProps) => (
  <span>
    <ResourcedEmoji
      emojiId={{ shortName: ':grimacing:', id: '1f62c' }}
      emojiProvider={
        props.emojiProvider || (getEmojiResource() as Promise<EmojiProvider>)
      }
      showTooltip={true}
      fitToHeight={props.fitToHeight}
    />
    <ResourcedEmoji
      emojiId={{ shortName: ':awthanks:', id: 'atlassian-awthanks' }}
      emojiProvider={
        props.emojiProvider || (getEmojiResource() as Promise<EmojiProvider>)
      }
      showTooltip={true}
      fitToHeight={props.fitToHeight}
    />
    <ResourcedEmoji
      emojiId={{ shortName: ':shrug:', id: 'atlassian-shrug' }}
      emojiProvider={
        props.emojiProvider || (getEmojiResource() as Promise<EmojiProvider>)
      }
      showTooltip={true}
      fitToHeight={props.fitToHeight}
    />
    <ResourcedEmoji
      emojiId={{ shortName: ':disappear:', id: 'atlassian-disappear' }}
      emojiProvider={
        props.emojiProvider || (getEmojiResource() as Promise<EmojiProvider>)
      }
      showTooltip={true}
      fitToHeight={props.fitToHeight}
    />
    <ResourcedEmoji
      emojiId={{ shortName: ':badpokerface:', id: 'atlassian-badpokerface' }}
      emojiProvider={
        props.emojiProvider || (getEmojiResource() as Promise<EmojiProvider>)
      }
      showTooltip={true}
      fitToHeight={props.fitToHeight}
    />
    <ResourcedEmoji
      emojiId={{ shortName: ':freddie:', id: 'atlassian-freddie' }}
      emojiProvider={
        props.emojiProvider || (getEmojiResource() as Promise<EmojiProvider>)
      }
      showTooltip={true}
      fitToHeight={props.fitToHeight}
    />
    <ResourcedEmoji
      emojiId={{ shortName: ':not-an-emoji:', id: 'not-an-emoji' }}
      emojiProvider={
        props.emojiProvider || (getEmojiResource() as Promise<EmojiProvider>)
      }
      showTooltip={true}
      fitToHeight={props.fitToHeight}
    />
    <ResourcedEmoji
      emojiId={{ shortName: ':loading:', id: 'loading' }}
      emojiProvider={new Promise(() => {})}
      showTooltip={true}
      fitToHeight={props.fitToHeight}
    />
  </span>
);

export default function Example() {
  return (
    <div>
      <h1>
        Heading 1 <SampleEmojis />
      </h1>
      <h2>
        Heading 2 <SampleEmojis />
      </h2>
      <h3>
        Heading 3 <SampleEmojis />
      </h3>
      <h4>
        Heading 4 <SampleEmojis />
      </h4>
      <h5>
        Heading 5 <SampleEmojis />
      </h5>
      <h6>
        Heading 6 <SampleEmojis />
      </h6>
      <p style={lineStyle()}>
        Paragraph <SampleEmojis />
      </p>
      <code style={lineStyle()}>
        Code <SampleEmojis />
      </code>
      <p style={lineStyle()}>
        {lorem} <SampleEmojis /> {lorem} <SampleEmojis /> {lorem}{' '}
        <SampleEmojis /> {lorem}
      </p>
    </div>
  );
}
