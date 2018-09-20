import { EmojiProvider } from '@atlaskit/emoji';
import * as React from 'react';
import { ReactionPicker } from '../components/ReactionPicker';
import { ReactionConsumer } from '../reaction-store/ReactionConsumer';

export type Props = {
  containerAri: string;
  ari: string;
  emojiProvider: Promise<EmojiProvider>;
  miniMode?: boolean;
  boundariesElement?: string;
  className?: string;
  allowAllEmojis?: boolean;
};

export default class ReactionPickerContainer extends React.PureComponent<
  Props
> {
  private renderChild = props => <ReactionPicker {...this.props} {...props} />;

  private actionsMapper = actions => ({
    onSelection: emojiId => {
      actions.addReaction(this.props.containerAri, this.props.ari, emojiId);
    },
  });

  render() {
    return (
      <ReactionConsumer actionsMapper={this.actionsMapper}>
        {this.renderChild}
      </ReactionConsumer>
    );
  }
}
