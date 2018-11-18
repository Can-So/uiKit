//@flow
import React from 'react';
import Button from '@atlaskit/button';
import Pagination from '../src';

export default () => (
  <div style={{ margin: '20px' }}>
    <Pagination
      ellipsisComponent={({ key }) => (
        <Button appearance="subtle" key={key} isDisabled>
          <span role="img" aria-label="heart">
            ❤️
          </span>
        </Button>
      )}
      pages={[...Array(10)].map((_, i) => i + 1)}
    />
  </div>
);
