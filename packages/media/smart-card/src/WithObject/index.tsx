import * as React from 'react';
import Context from '../Context';
import { Client, ObjectState } from '../Client';
import { v4 } from 'uuid';
import {
  BlockCardErroredView,
  InlineCardErroredView,
} from '@atlaskit/media-ui';

export interface WithObjectRenderProps {
  state: ObjectState;
  reload: () => void;
}

interface InnerWithObjectProps {
  client: Client;
  url: string;
  children: (renderProps: WithObjectRenderProps) => React.ReactNode;
}

interface InnerWithObjectState {
  prevClient?: Client;
  prevUrl?: string;
  cardState: ObjectState;
  uuid: string;
}

class InnerWithObject extends React.Component<
  InnerWithObjectProps,
  InnerWithObjectState
> {
  state: InnerWithObjectState = {
    uuid: v4(),
    cardState: { status: 'pending' },
  };

  reload = () => {
    const { cardState } = this.state;
    if (
      cardState.status === 'errored' ||
      cardState.status === 'unauthorized' ||
      cardState.status === 'forbidden'
    ) {
      const { client, url } = this.props;
      client.reload(url, cardState.definitionId);
    }
  };

  updateState = (incoming: [ObjectState | null, boolean]) => {
    const { url, client } = this.props;
    const [state, expired] = incoming;

    if (state === null || expired) {
      return client.resolve(url);
    }

    return this.setState({
      cardState: state,
    });
  };

  componentDidMount() {
    const { client, url } = this.props;
    const { uuid } = this.state;
    client.register(url).subscribe(uuid, this.updateState);
  }

  componentDidUpdate(prevProps: InnerWithObjectProps) {
    const { client, url } = this.props;
    const { uuid } = this.state;
    if (client !== prevProps.client) {
      prevProps.client.deregister(prevProps.url, uuid);
      client.register(url).subscribe(uuid, this.updateState);
    }
    if (url !== prevProps.url) {
      client.deregister(prevProps.url, uuid);
      client.register(url).subscribe(uuid, this.updateState);
    }
    return;
  }

  componentWillUnmount() {
    const { client, url } = this.props;
    const { uuid } = this.state;
    client.deregister(url, uuid);
  }

  render() {
    const { children } = this.props;
    const { cardState } = this.state;
    return children({ state: cardState, reload: this.reload });
  }
}

export interface WithObjectProps {
  client?: Client;
  isSelected?: boolean;
  appearance: 'block' | 'inline';
  url: string;
  children: (props: WithObjectRenderProps) => React.ReactNode;
}

export function WithObject(props: WithObjectProps) {
  const {
    client: clientFromProps,
    url,
    children,
    isSelected,
    appearance,
  } = props;
  return (
    <Context.Consumer>
      {clientFromContext => {
        const client = clientFromProps || clientFromContext;
        if (!client) {
          console.error(
            `No Smart Card client provided. Provide a client via prop <Card client={new Client()} /> or by wrapping with <SmartCardProvider><Card /></SmartCardProvider>.'`,
          );

          return appearance === 'inline' ? (
            <InlineCardErroredView
              url={url}
              isSelected={isSelected}
              message="Smart Card provider missing"
              onClick={() => window.open(url)}
            />
          ) : (
            <BlockCardErroredView
              url={url}
              isSelected={isSelected}
              message="Smart Card provider missing"
              onClick={() => window.open(url)}
            />
          );
        }
        return (
          <InnerWithObject client={client} url={url}>
            {children}
          </InnerWithObject>
        );
      }}
    </Context.Consumer>
  );
}
