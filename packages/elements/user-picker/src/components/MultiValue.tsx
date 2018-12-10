import Tag from '@atlaskit/tag';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from './i18n';
import { SizeableAvatar } from './SizeableAvatar';

export const scrollToValue = (
  valueContainer: HTMLElement,
  control: HTMLElement,
) => {
  const { top, height } = valueContainer.getBoundingClientRect();
  const { height: controlHeight } = control.getBoundingClientRect();
  if (top - height < 0) {
    valueContainer.scrollIntoView();
  }
  if (top + height > controlHeight) {
    valueContainer.scrollIntoView(false);
  }
};

export class MultiValue extends React.Component<any> {
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

  shouldComponentUpdate(nextProps) {
    const {
      data: { label, user },
      innerProps,
      isFocused,
    } = this.props;

    const {
      data: { label: nextLabel, user: nextUser },
      innerProps: nextInnerProps,
      isFocused: nextIsFocused,
    } = nextProps;

    // We can ignore onRemove here because it is a anonymous function
    // that will recreated every time but with the same implementation.
    return (
      user !== nextUser ||
      label !== nextLabel ||
      innerProps !== nextInnerProps ||
      isFocused !== nextIsFocused
    );
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
              elemBefore={
                <SizeableAvatar
                  appearance="compact"
                  src={avatarUrl}
                  name={label}
                />
              }
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
