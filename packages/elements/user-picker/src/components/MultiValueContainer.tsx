import { components } from '@atlaskit/select';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { messages } from './i18n';

export const ScrollAnchor = styled.div`
  align-self: flex-end;
`;

export type State = {
  valueSize: number;
  previousValueSize: number;
};

export class MultiValueContainer extends React.PureComponent<any, State> {
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      valueSize: nextProps.getValue ? nextProps.getValue().length : 0,
      previousValueSize: prevState.valueSize,
    };
  }

  private bottomAnchor;

  constructor(props) {
    super(props);
    this.state = {
      valueSize: 0,
      previousValueSize: 0,
    };
  }

  componentDidUpdate() {
    const { previousValueSize, valueSize } = this.state;
    if (valueSize > previousValueSize) {
      setTimeout(() => this.bottomAnchor.scrollIntoView());
    }
  }

  handleBottomAnchor = ref => {
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

  render() {
    const { children, ...valueContainerProps } = this.props;
    return (
      <components.ValueContainer {...valueContainerProps}>
        <FormattedMessage {...messages.addMore}>
          {addMore =>
            React.Children.map(children, child =>
              typeof child !== 'string' &&
              typeof child !== 'number' &&
              this.showPlaceholder()
                ? React.cloneElement(child, { placeholder: addMore })
                : child,
            )
          }
        </FormattedMessage>
        <ScrollAnchor innerRef={this.handleBottomAnchor} />
      </components.ValueContainer>
    );
  }
}
