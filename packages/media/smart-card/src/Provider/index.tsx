import * as React from 'react';
import Context from '../Context';
import { Client } from '../Client';

export interface ProviderProps {
  client?: Client;
  children: React.ReactElement<any>;
}

const defaultClient: Client = new Client();

export class Provider extends React.Component<ProviderProps> {
  render() {
    const { client, children } = this.props;
    return (
      <Context.Provider value={client || defaultClient}>
        {children}
      </Context.Provider>
    );
  }
}
