import * as React from 'react';
import { GlobalQuickSearch } from '../src/index';
import BasicNavigation from '../example-helpers/BasicNavigation';
import { setupMocks, teardownMocks } from '../example-helpers/mockApis';
import LocaleIntlProvider from '../example-helpers/LocaleIntlProvider';

interface Props {
  className: string;
  href?: string;
  target?: string;
  children: React.ReactNode;
}

class AlertLinkComponent extends React.Component<Props> {
  handleClick = () => {
    const { href } = this.props;
    alert(`href: ${href}`);
  };

  render() {
    const { className, children } = this.props;

    return (
      <span onClick={this.handleClick} className={className}>
        {children}
      </span>
    );
  }
}

export default class extends React.Component {
  componentWillMount() {
    setupMocks();
  }

  componentWillUnmount() {
    teardownMocks();
  }

  render() {
    return (
      <BasicNavigation
        searchDrawerContent={
          <LocaleIntlProvider>
            <GlobalQuickSearch
              cloudId="cloudId"
              context="confluence"
              linkComponent={AlertLinkComponent}
            />
          </LocaleIntlProvider>
        }
      />
    );
  }
}
