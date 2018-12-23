import * as React from 'react';
import EmojiUploadPicker from '../src/components/common/EmojiUploadPicker';

import { emojiPickerWidth } from '../src/constants';
import { onUploadEmoji, onUploadCancelled } from '../example-helpers';
import { IntlProvider, addLocaleData } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';

const defaultStyles = {
  width: emojiPickerWidth,
  border: '1px solid #ccc',
  margin: '20px',
};

addLocaleData(enLocaleData);

export default function Example() {
  return (
    <div style={defaultStyles}>
      <IntlProvider locale="en">
        <EmojiUploadPicker
          onUploadEmoji={onUploadEmoji}
          onUploadCancelled={onUploadCancelled}
        />
      </IntlProvider>
    </div>
  );
}
