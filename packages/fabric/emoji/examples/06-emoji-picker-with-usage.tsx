import * as React from 'react';
import Layer from '@atlaskit/layer';
import EmojiPicker from '../src/components/picker/EmojiPicker';

import { getUsageClearEmojiResource } from '../src/support/story-data';
import { UsageShowAndClearComponent } from '../example-helpers/demo-emoji-usage-components';

class UsageShowingEmojiPickerTextInput extends UsageShowAndClearComponent {
  constructor(props) {
    super(props);
  }

  getWrappedComponent() {
    const { emojiResource } = this.props;
    return (
      <Layer
        content={
          <EmojiPicker
            onSelection={this.onSelection}
            emojiProvider={Promise.resolve(emojiResource)}
          />
        }
        position="bottom left"
      >
        <input
          id="picker-input"
          style={{
            height: '20px',
            marginBottom: '320px',
          }}
        />
      </Layer>
    );
  }
}

export default function Example() {
  return (
    <UsageShowingEmojiPickerTextInput
      emojiResource={getUsageClearEmojiResource()}
    />
  );
}
