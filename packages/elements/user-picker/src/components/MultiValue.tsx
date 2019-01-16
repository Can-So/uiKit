import Tag from '@atlaskit/tag';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Option } from '../types';
import { messages } from './i18n';
import { SizeableAvatar } from './SizeableAvatar';
import { getAvatarUrl } from './utils';

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

type Props = {
  isFocused?: boolean;
  data: Option;
  innerProps: any;
  removeProps: { onClick: Function };
};

export class MultiValue extends React.Component<Props> {
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

  shouldComponentUpdate(nextProps: Props) {
    const {
      data: { label, data },
      innerProps,
      isFocused,
    } = this.props;

    const {
      data: { label: nextLabel, data: nextData },
      innerProps: nextInnerProps,
      isFocused: nextIsFocused,
    } = nextProps;

    // We can ignore onRemove here because it is a anonymous function
    // that will recreated every time but with the same implementation.
    return (
      data !== nextData ||
      label !== nextLabel ||
      innerProps !== nextInnerProps ||
      isFocused !== nextIsFocused
    );
  }

  render() {
    const {
      data: { label, data },
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
                  appearance="multi"
                  src={getAvatarUrl(data)}
                  name={label}
                />
              }
              removeButtonText={data.fixed ? undefined : remove}
              onAfterRemoveAction={onRemove}
              color={isFocused ? 'blueLight' : undefined}
            />
          )}
        </FormattedMessage>
      </div>
    );
  }
}
