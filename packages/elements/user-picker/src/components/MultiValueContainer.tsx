import { components } from '@atlaskit/select';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { messages } from './i18n';
import { isChildInput } from './utils';

export const ScrollAnchor = styled.div`
  align-self: flex-end;
`;

export type State = {
  valueSize: number;
  previousValueSize: number;
};

type Props = {
  getValue: () => any[];
  selectProps: any;
};

export class MultiValueContainer extends React.PureComponent<Props, State> {
  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    return {
      valueSize: nextProps.getValue ? nextProps.getValue().length : 0,
      previousValueSize: prevState.valueSize,
    };
  }

  private bottomAnchor: HTMLDivElement | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      valueSize: 0,
      previousValueSize: 0,
    };
  }

  componentDidUpdate() {
    const { previousValueSize, valueSize } = this.state;
    if (valueSize > previousValueSize) {
      window.setTimeout(
        () => this.bottomAnchor && this.bottomAnchor.scrollIntoView(),
      );
    }
  }

  handleBottomAnchor = (ref: HTMLDivElement | null) => {
    this.bottomAnchor = ref;
  };

  private showPlaceholder = () => {
    const {
      selectProps: { value, options, isLoading },
    } = this.props;
    return (
      value &&
      options &&
      (value.length > 0 && (value.length < options.length || isLoading))
    );
  };

  private addPlaceholder = (placeholder: string) =>
    React.Children.map(this.props.children, child =>
      isChildInput(child) && this.showPlaceholder()
        ? React.cloneElement(child, { placeholder })
        : child,
    );

  private renderChildren = () => {
    const {
      selectProps: { addMoreMessage, isDisabled },
    } = this.props;
    // Do not render "Add more..." message if picker is disabled
    if (isDisabled) {
      return this.props.children;
    }
    if (addMoreMessage === undefined) {
      return (
        <FormattedMessage {...messages.addMore}>
          {addMore => this.addPlaceholder(addMore as string)}
        </FormattedMessage>
      );
    }
    return this.addPlaceholder(addMoreMessage);
  };

  render() {
    const { children, ...valueContainerProps } = this.props;
    return (
      <components.ValueContainer {...valueContainerProps}>
        {this.renderChildren()}
        <ScrollAnchor innerRef={this.handleBottomAnchor} />
      </components.ValueContainer>
    );
  }
}
