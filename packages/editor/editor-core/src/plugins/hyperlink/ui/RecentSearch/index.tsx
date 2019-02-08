import * as React from 'react';
import RecentList from './LinkAddToolbar';
import { ProviderFactory, WithProviders } from '@atlaskit/editor-common';

export interface Props {
  providerFactory: ProviderFactory;
  onBlur?: (text: string) => void;
  onSubmit?: (href: string, text?: string) => void;
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
