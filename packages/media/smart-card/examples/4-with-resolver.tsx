import * as React from 'react';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import { Provider, Card, Client, ResolveResponse } from '..';
import '../mocks';

class CustomClient extends Client {
  fetchData(url: string) {
    if (url === 'public-happy') {
      return Promise.resolve({
        meta: {
          visibility: 'public',
          access: 'granted',
          auth: [],
          definitionId: 'def1',
        },
        data: { url, name: 'From resolver' },
      } as ResolveResponse);
    }
    return super.fetchData(url);
  }
}

const clientWithResolver = new CustomClient();

export default () => (
  <Page>
    <Provider>
      <Grid>
        <GridColumn>
          <p>
            <small>
              This card <em>DOES NOT</em> use an additional resolver.
            </small>
          </p>
          <br />
          <Card url="public-happy" appearance="block" />
          <br />
          <Card url="private-happy" appearance="block" />
        </GridColumn>
      </Grid>
    </Provider>
    <br />
    <br />
    <Provider client={clientWithResolver}>
      <Grid>
        <GridColumn>
          <p>
            <small>
              This card <em>DOES</em> use an additional resolver.
            </small>
          </p>
          <br />
          <Card url="public-happy" appearance="block" />
          <br />
          <Card url="private-happy" appearance="block" />
        </GridColumn>
      </Grid>
    </Provider>
  </Page>
);
