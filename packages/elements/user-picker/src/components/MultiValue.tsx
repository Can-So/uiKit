import Avatar from '@atlaskit/avatar';
import Tag from '@atlaskit/tag';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from './i18n';

export const scrollToValue = (current: HTMLElement, parent: HTMLElement) => {
  const { top, height } = current.getBoundingClientRect();
  const { height: parentHeight } = parent.getBoundingClientRect();
  if (top - height < 0) {
    current.scrollIntoView();
  }
  if (top + height > parentHeight) {
    current.scrollIntoView(false);
  }
};

export class MultiValue extends React.PureComponent<any> {
  private containerRef;
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
  }

  componentDidUpdate() {
    const { isFocused } = this.props;
    if (isFocused && this.containerRef.current) {
      scrollToValue(
        this.containerRef.current,
        this.containerRef.current.parentElement.parentElement,
      );
    }
  }

  render() {
    const {
      data: {
        label,
        user: { avatarUrl, fixed },
      },
      innerProps,
      removeProps: { onClick: onRemove },
      isFocused,
    } = this.props;

    return (
      <div ref={this.containerRef}>
        <FormattedMessage {...messages.remove}>
          {remove => (
            <Tag
              {...innerProps}
              appearance="rounded"
              text={label}
              elemBefore={<Avatar size="xsmall" src={avatarUrl} />}
              removeButtonText={fixed ? undefined : remove}
              onAfterRemoveAction={onRemove}
              color={isFocused ? 'blueLight' : undefined}
            />
          )}
        </FormattedMessage>
      </div>
    );
  }
}
