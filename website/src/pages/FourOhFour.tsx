import * as React from 'react';
import Page from '../components/Page';

export type FourOhFourProps = {};

export default class FourOhFour extends React.PureComponent<FourOhFourProps> {
  props: FourOhFourProps;

  render() {
    return (
      <Page>
        <h1>Oops!</h1>
        <p>{"Couldn't find this page."}</p>
      </Page>
    );
  }
}
