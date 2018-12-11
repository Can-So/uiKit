import * as React from 'react';
import { Entity, ValidationError } from '@atlaskit/adf-utils';

export type Error = {
  entity: Entity;
  error: ValidationError;
};

export type Props = {
  errors: Array<Error>;
};

export class ErrorReport extends React.Component<Props> {
  render() {
    return this.props.errors.map((error, idx) => (
      <div
        key={idx}
        style={{
          padding: '1em',
          borderRight: '1px solid #eeeeec',
        }}
      >
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
      </div>
    ));
  }
}

export default ErrorReport;
