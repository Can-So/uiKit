import * as React from 'react';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import { Card, Client, Provider, ResolveResponse } from '..';
import { FieldTextStateless } from '@atlaskit/field-text';
import { ClientConfig } from '../src/Client';

const customResponse = (url: string): ResolveResponse => ({
  meta: {
    access: 'granted',
    visibility: 'public',
    definitionId: 'd1',
    auth: [],
  },
  data: {
    name: `Doc from ${url}`,
  },
});

const customDataFetch = (n: number, url: string): Promise<ResolveResponse> =>
  new Promise(res => setTimeout(res, n, customResponse(url)));

class CustomClient extends Client {
  constructor(config: ClientConfig, private responseDelay: number) {
    super(config);
  }
  fetchData(url: string): Promise<ResolveResponse> {
    return customDataFetch(this.responseDelay, url);
  }
}

type ExampleState = {
  client: CustomClient;
  responseDelay: number;
  loadingStateDelay: number;
  url: string;
};

class Example extends React.Component<any, ExampleState> {
  state = {
    responseDelay: 4000,
    loadingStateDelay: 2000,
    client: new CustomClient(
      {
        loadingStateDelay: 2000,
      },
      4000,
    ),
    url: 'https://some.url',
  };
  setResponseDelay = (e: React.SyntheticEvent) => {
    const val = (e.target as any).value;
    this.setState({
      responseDelay: val,
      client: new CustomClient(
        {
          loadingStateDelay: this.state.loadingStateDelay,
        },
        val,
      ),
    });
  };
  setLoadingStateDelay = (e: React.SyntheticEvent) => {
    const val = (e.target as any).value;
    this.setState({
      loadingStateDelay: val,
      client: new CustomClient(
        {
          loadingStateDelay: val,
        },
        this.state.responseDelay,
      ),
    });
  };
  setUrl = (e: React.SyntheticEvent) => {
    const val = (e.target as any).value;
    this.setState({
      url: val,
    });
  };
  render() {
    return (
      <Page>
        <Grid>
          <GridColumn>
            <FieldTextStateless
              shouldFitContainer={true}
              label="The delay for response"
              value={String(this.state.responseDelay)}
              onChange={this.setResponseDelay}
            />
          </GridColumn>
          <GridColumn>
            <FieldTextStateless
              shouldFitContainer={true}
              label="The delay for loading state"
              value={String(this.state.loadingStateDelay)}
              onChange={this.setLoadingStateDelay}
            />
          </GridColumn>
          <GridColumn>
            <FieldTextStateless
              shouldFitContainer={true}
              label="Url to display"
              value={this.state.url}
              onChange={this.setUrl}
            />
          </GridColumn>
        </Grid>
        <Grid>
          <GridColumn>
            <hr />
            <Provider client={this.state.client} key={this.state.url}>
              <Card url={this.state.url} appearance="block" />
            </Provider>
          </GridColumn>
        </Grid>
      </Page>
    );
  }
}

export default () => <Example />;
