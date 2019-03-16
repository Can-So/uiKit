import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '@findable/button';
import { gridSize, math } from '@findable/theme';
import styled from 'styled-components';
import { messages } from '../messages';
import ErrorImage from '../assets/ErrorImage';

const ErrorWrapper = styled.div`
  text-align: center;
  margin-top: ${math.multiply(gridSize, 4)}px;
`;

export interface Props {
  onRetryClick();
}

export default class SearchError extends React.Component<Props> {
  render() {
    const { onRetryClick } = this.props;

    return (
      <ErrorWrapper>
        <ErrorImage />
        <h3>
          <FormattedMessage {...messages.search_error_title} />
        </h3>
        <p>
          <span>
            <FormattedMessage
              {...messages.search_error_body}
              values={{
                link: (
                  <Button
                    appearance="link"
                    spacing="none"
                    onClick={onRetryClick}
                  >
                    <FormattedMessage {...messages.search_error_body_link} />
                  </Button>
                ),
              }}
            />
          </span>
        </p>
      </ErrorWrapper>
    );
  }
}
