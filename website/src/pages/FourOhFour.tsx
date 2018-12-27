import * as React from 'react';
import Page from '../components/Page';

export type FourOhFourProps = {};

export default class FourOhFour extends React.PureComponent<FourOhFourProps> {
  props: FourOhFourProps;

  componentDidMount() {
    if (
      sessionStorage.getItem('loadedOnce') === null ||
      sessionStorage.getItem('loadedOnce') === 'false'
    ) {
      sessionStorage.setItem('loadedOnce', 'true');
      window.location.reload();
    }
  }

  render() {
    return (
      <Page>
        <h1>Oops!</h1>
        <p>{"Couldn't find this page."}</p>
      </Page>
    );
  }
}
