import * as React from 'react';
import { EmojiAttributes } from '@findable/adf-schema';
import { PureComponent } from 'react';
import { ProviderFactory } from '@findable/editor-common';
import { Emoji } from '@findable/editor-common';

export interface EmojiProps extends EmojiAttributes {
  providers?: ProviderFactory;
  fitToHeight?: number;
}

export default class EmojiItem extends PureComponent<EmojiProps, {}> {
  render() {
    const { id, providers, shortName, text, fitToHeight } = this.props;

    return (
      <Emoji
        allowTextFallback={true}
        id={id}
        shortName={shortName}
        fallback={text}
        providers={providers}
        fitToHeight={fitToHeight}
      />
    );
  }
}
