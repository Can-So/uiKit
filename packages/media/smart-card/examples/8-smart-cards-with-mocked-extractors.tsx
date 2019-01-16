import * as React from 'react';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import { Card, Client, Provider, ResolveResponse } from '..';
import { ClientConfig } from '../src/Client';
import { GithubRepository, BitbucketRepository } from './_jsonLDExamples';
import { IntlProvider } from 'react-intl';

const metaMock = {
  access: 'granted',
  visibility: 'public',
  definitionId: 'd1',
  auth: [],
};

class BitbucketClient extends Client {
  constructor(config: ClientConfig) {
    super(config);
  }
  fetchData(): Promise<ResolveResponse> {
    return Promise.resolve({
      meta: metaMock,
      data: BitbucketRepository,
    } as ResolveResponse);
  }
}

class GithubClient extends Client {
  constructor(config: ClientConfig) {
    super(config);
  }
  fetchData(): Promise<ResolveResponse> {
    return Promise.resolve({
      meta: metaMock,
      data: GithubRepository,
    } as ResolveResponse);
  }
}

const bitbucketClient = new BitbucketClient({ loadingStateDelay: 1000 });
const githubClient = new GithubClient({ loadingStateDelay: 1000 });

class Example extends React.Component {
  render() {
    return (
      <IntlProvider locale="en">
        <Page>
          <Grid>
            <GridColumn>
              <Provider client={bitbucketClient}>
                <Card
                  url="https://bitbucket.org/tuser/test-repo"
                  appearance="block"
                  data={BitbucketRepository}
                />
              </Provider>
              <hr />
              <Provider client={githubClient}>
                <Card
                  url="https://github.com/User/repo-name"
                  appearance="block"
                />
              </Provider>
            </GridColumn>
          </Grid>
        </Page>
      </IntlProvider>
    );
  }
}

export default () => <Example />;
