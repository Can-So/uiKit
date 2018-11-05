import * as React from 'react';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import { Provider, Card, Client } from '../src';
import { mockMultipleCards } from '../mocks';
import FieldTextAreaStateless from '@atlaskit/field-text-area';

mockMultipleCards();

const theClient = new Client(15 * 1000);

type State = {
  urls: string;
};

class CacheTimer extends React.Component<{ client: Client; url: string }, any> {
  state = {
    seconds: 0,
    listeners: 0,
  };
  timer: number | undefined = undefined;
  componentDidMount() {
    this.timer = setInterval(this.tick, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  tick = () => {
    const { url, client } = this.props;
    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      return;
    }
    const now = new Date().getTime();
    const watcher = client.store.get(trimmedUrl);
    const futureTime =
      (watcher && watcher.entry && watcher.entry.goodTill) || 0;
    const remaining = Math.floor((futureTime - now) / 1000);
    this.setState({ seconds: remaining < 0 ? 'expired' : remaining });
  };
  render() {
    return (
      <div>
        {this.props.url}: {this.state.seconds}
      </div>
    );
  }
}

class Example extends React.Component<{ client: Client }, State> {
  state = {
    urls: `google.com/doc/1
google.com/doc/2
google.com/spreadshet/1
google.com/spreadshet/2
trello.com/task/a
dropbox.com/file/a`,
  };

  renderCard(url: string, idx: number) {
    return (
      <div key={idx}>
        <br />
        <Card url={url} appearance="block" />
      </div>
    );
  }

  renderCacheMonitor() {
    return this.props.client.store
      .getAllUrls()
      .map((url, idx) => <CacheTimer key={idx} url={url} client={theClient} />);
  }

  render() {
    const urls = this.state.urls
      .split('\n')
      .map(url => url.trim())
      .filter(x => x !== '');
    return (
      <Provider client={this.props.client}>
        <Page>
          <Grid>
            <GridColumn>{urls.map(this.renderCard)}</GridColumn>
            <GridColumn>
              <h4>URLs pool</h4>
              <p>
                This is a list of all mocked urls. Try to reshuffle them and see
                how it goes
              </p>
              <p>
                <em>
                  Note: There one that is not listed here:{' '}
                  <code>google.com/doc/3</code>
                </em>
              </p>
              <FieldTextAreaStateless
                isMonospaced={true}
                shouldFitContainer={true}
                autoFocus={true}
                minimumRows={10}
                enableResize={'vertical'}
                value={this.state.urls}
                onChange={(e: any) => this.setState({ urls: e.target.value })}
              />
              <h4>Cache monitor</h4>
              {this.renderCacheMonitor()}
            </GridColumn>
          </Grid>
        </Page>
      </Provider>
    );
  }
}

export default () => <Example client={theClient} />;
