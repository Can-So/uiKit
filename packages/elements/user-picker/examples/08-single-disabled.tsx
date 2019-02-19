import * as React from 'react';
import { exampleOptions } from '../example-helpers';
import { UserPicker } from '../src/components/UserPicker';

export default class Example extends React.Component<{}> {
  render() {
    return (
      <UserPicker
        options={exampleOptions}
        isDisabled={true}
        value={exampleOptions[0]}
      />
    );
  }
}
