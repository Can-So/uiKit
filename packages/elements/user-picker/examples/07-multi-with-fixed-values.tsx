import * as React from 'react';
import { exampleOptions } from '../example-helpers';
import { ExampleWrapper } from '../example-helpers/ExampleWrapper';
import { UserPicker } from '../src/components/UserPicker';

export default class Example extends React.Component<{}> {
  render() {
    return (
      <ExampleWrapper>
        {({ options, onInputChange }) => (
          <UserPicker
            options={options}
            onChange={console.log}
            onInputChange={onInputChange}
            isMulti
            defaultValue={[
              { ...exampleOptions[0], fixed: true },
              { ...exampleOptions[1], fixed: true },
            ]}
          />
        )}
      </ExampleWrapper>
    );
  }
}
