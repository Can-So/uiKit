import * as React from 'react';
import styled from 'styled-components';

import { colors } from '@atlaskit/theme';
import { ADFEntity, ValidationError } from '@atlaskit/adf-utils';

export type Error = {
  entity: ADFEntity;
  error: ValidationError;
};

export type Props = {
  errors: Array<Error>;
};

const ReportContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
`;

const StyledReportEntry = styled.div`
  flex: 1;
  padding: 1em;
  border-right: 1px solid ${colors.N30};
`;

const ReportEntry = ({ error }: { error: Error }) => (
  <StyledReportEntry>
    <h4>{error.error.message}</h4>
    <code>
      <pre>{JSON.stringify(error.entity, null, 2)}</pre>
    </code>
    {error.error.meta && (
      <>
        <p>Meta: </p>
        <pre>{JSON.stringify(error.error.meta)}</pre>
      </>
    )}
  </StyledReportEntry>
);

export class ErrorReport extends React.Component<Props> {
  render() {
    return (
      <ReportContainer>
        {this.props.errors.map((error, idx) => (
          <ReportEntry key={idx} error={error} />
        ))}
      </ReportContainer>
    );
  }
}

export default ErrorReport;
