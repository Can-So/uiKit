import * as React from 'react';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import { Provider, Card } from '../src';
import { mockMultipleCards } from '../mocks';
import Button from '@atlaskit/button';
import FieldText from '@atlaskit/field-text';

mockMultipleCards();

type State = {
  urlToAdd: string;
  urls: string[];
};

const dropIndex = (xs: any[], idx: number): any[] => {
  return xs.filter((_, i) => i !== idx);
};

class Example extends React.Component<any, State> {
  state = {
    urlToAdd: '',
    urls: [
      'google.com/doc/1',
      'google.com/doc/2',
      'google.com/doc/3',
      'google.com/doc/1',
      'google.com/spreadshet/1',
      'google.com/spreadshet/2',
      'dropbox.com/file/a',
      'trello.com/task/a',
    ],
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
                    <Button
                      onClick={() =>
                        this.setState({ urls: dropIndex(this.state.urls, idx) })
                      }
                    >
                      Remove
                    </Button>
                  </div>
                );
              })}
              <hr />
              <FieldText
                value={this.state.urlToAdd}
                onChange={e => this.setState({ urlToAdd: e.target.value })}
              />
              <Button
                onClick={() =>
                  this.setState({
                    urls: this.state.urls.concat([this.state.urlToAdd]),
                    urlToAdd: '',
                  })
                }
              >
                Add another card
              </Button>
            </GridColumn>
          </Grid>
        </Page>
      </Provider>
    );
  }
}

export default () => <Example />;
