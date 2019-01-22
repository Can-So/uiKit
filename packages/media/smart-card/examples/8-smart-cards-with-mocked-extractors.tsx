import * as React from 'react';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import { Card, Client, Provider, ResolveResponse } from '..';
import { ClientConfig } from '../src/Client';
import {
  GithubRepository,
  BitbucketRepository,
  ConfluencePage,
  ConfluenceBlogPost,
  ConfluenceSpace,
  ConfluenceTemplate,
} from './_jsonLDExamples';
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
              <h3>Source Repository Examples (block)</h3>
              <br />
              <Provider client={bitbucketClient}>
                <Card
                  url="https://bitbucket.org/tuser/test-repo"
                  appearance="block"
                  data={BitbucketRepository}
                />
              </Provider>
              <br />
              <br />
              <Provider client={githubClient}>
                <Card
                  url="https://github.com/User/repo-name"
                  appearance="block"
                />
              </Provider>
            </GridColumn>
            <GridColumn>
              <br />
              <h3>Confluence Examples (inline)</h3>
              <br />
              Hey maybe you were after the info on:
              <Card
                url="https://confluence.atlassian.com/some/page"
                appearance="inline"
                data={ConfluencePage}
              />
              <br />
              <br />
              Or was it...
              <Card
                url="https://confluence.atlassian.com/some/blog"
                appearance="inline"
                data={ConfluenceBlogPost}
              />
              <br />
              <br />
              I've added all the info you were after on
              <Card
                url="https://confluence.atlassian.com/some/space"
                appearance="inline"
                data={ConfluenceSpace}
              />
              <br />
              <br />
              The template you're after is probably
              <Card
                url="https://confluence.atlassian.com/some/template"
                appearance="inline"
                data={ConfluenceTemplate}
              />
            </GridColumn>
          </Grid>
        </Page>
      </IntlProvider>
    );
  }
}

export default () => <Example />;
