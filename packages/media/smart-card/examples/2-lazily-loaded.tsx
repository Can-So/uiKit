import * as React from 'react';
import { Provider, Card } from '../src';

export default () => (
  <Provider>
    <div>
      <p>Scroll ⇣ to find a lazily loaded smart card 👇</p>
      <div
        style={{ height: '3000px', display: 'flex', alignItems: 'flex-start' }}
      />
      <Card
        url="https://trello.com/b/8B5zyiSn/test-smart-card-board"
        appearance="block"
      />
    </div>
  </Provider>
);
