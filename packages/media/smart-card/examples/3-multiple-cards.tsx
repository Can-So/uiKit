import * as React from 'react';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import { Provider, Card } from '../src';
import { mockMultipleCards } from '../mocks';
import Button from '@atlaskit/button';

mockMultipleCards();

type State = {
  urls: string[];
};

const dropIndex = (xs: any[], idx: number): any[] => {
  return xs.filter((_, i) => i !== idx);
};

class Example extends React.Component<any, State> {
  state = {
    urls: [
      'google.com/doc/1',
      'google.com/doc/2',
      'google.com/doc/1',
      'google.com/spreadshet/1',
      'google.com/spreadshet/2',
      'dropbox.com/file/a',
      'trello.com/task/a',
    ],
  };

  dropOne = (idx: number) => {
    return () => this.setState({ urls: dropIndex(this.state.urls, idx) });
  };

  addOne = (url: string) => {
    return () => this.setState({ urls: this.state.urls.concat([url]) });
  };

  render() {
    return (
      <Provider>
        <Page>
          <Grid>
            <GridColumn>
              {this.state.urls.map((url, idx) => {
                return (
                  <div key={idx} style={{ marginTop: '1rem' }}>
                    <Card url={url} appearance="block" />
                    <br />
                    <Button appearance="link" onClick={this.dropOne(idx)}>
                      Remove
                    </Button>
                    or
                    <Button appearance="link" onClick={this.addOne(url)}>
                      Add another such card
                    </Button>
                    <hr />
                  </div>
                );
              })}
            </GridColumn>
          </Grid>
        </Page>
      </Provider>
    );
  }
}

export default () => <Example />;
