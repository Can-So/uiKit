import * as React from 'react';
import RecentList from './LinkAddToolbar';
import { ProviderFactory, WithProviders } from '@atlaskit/editor-common';

export interface Props {
  providerFactory: ProviderFactory;
  onBlur?: (text: string) => any;
  onSubmit?: (href: string, text?: string) => any;
}

export default class HyperlinkAddToolbar extends React.PureComponent<
  Props,
  {}
> {
  render() {
    const { onSubmit, onBlur } = this.props;
    return (
      <WithProviders
        providers={['activityProvider']}
        providerFactory={this.props.providerFactory}
        renderNode={({ activityProvider }) => (
          <RecentList
            provider={activityProvider}
            onSubmit={onSubmit}
            onBlur={onBlur}
          />
        )}
      />
    );
  }
}
