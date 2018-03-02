import * as React from 'react';
import { GlobalQuickSearch } from '../src/index';
import BasicNavigation from '../example-helpers/BasicNavigation';
import { setupMocks, teardownMocks } from '../example-helpers/mockApis';
import styled from 'styled-components';
import { Config } from '../src/api/configureSearchClients';

const OuterBorder = styled.div`
  border: #ddd 1px solid;
  border-radius: 3px;
`;

const config: Config = {
  activityServiceUrl: 'https://activity.staging.atlassian.io',
  searchAggregatorServiceUrl: 'https://api-private.stg.atlassian.com',
  directoryServiceUrl: 'https://api-private.stg.atlassian.com/directory',
};

export default class extends React.Component<{}, { cloudId: string }> {
  constructor(props) {
    super(props);
    this.state = {
      cloudId: 'DUMMY-7c8a2b74-595a-41c7-960c-fd32f8572cea', // SDOG
    };
  }

  handleInputChange = e => {
    this.setState({
      cloudId: e.target.value,
    });
  };

  render() {
    return (
      <div>
        Cloud Id:{' '}
        <input
          type="text"
          value={this.state.cloudId}
          onChange={this.handleInputChange}
        />
        <OuterBorder>
          <BasicNavigation
            searchDrawerContent={
              <GlobalQuickSearch cloudId={this.state.cloudId} {...config} />
            }
          />
        </OuterBorder>
      </div>
    );
  }
}
