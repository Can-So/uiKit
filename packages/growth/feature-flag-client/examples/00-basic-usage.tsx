import * as React from 'react';
import FeatureFlagClient from '../src/index';

const myAnalyticsHandler = event => {
  console.log('Sending exposure event', event);
};

const client = new FeatureFlagClient({
  analyticsHandler: myAnalyticsHandler,
  flags: {
    'my.experiment': {
      value: 'experiment',
      explanation: {
        reason: 'RULE_MATCH',
        ruleId: '111-bbbbb-ccc',
      },
    },
    'my.boolean.flag': false,
    'my.json.flag': {
      value: {
        nav: 'blue',
        footer: 'black',
      },
      explanation: {
        reason: 'RULE_MATCH',
        ruleId: '111-bbbbb-ccc',
      },
    },
    'my.detailed.boolean.flag': {
      value: false,
      explanation: {
        reason: 'RULE_MATCH',
        ruleId: '111-bbbbb-ccc',
      },
    },
  },
});

const JSONFlag: any = client.getJSONValue('my.json.flag');

export default () => (
  <div>
    <h2>Feature flag client</h2>

    <h4>getVariantValue</h4>
    <p>
      Value for flag "my.experiment" is "{client.getVariantValue(
        'my.experiment',
        {
          default: 'control',
          oneOf: ['control', 'experiment'],
        },
      )}"
    </p>

    <h4>getBooleanValue</h4>
    <p>
      Value for flag "my.boolean.flag" is "{JSON.stringify(
        client.getBooleanValue('my.boolean.flag', { default: true }),
      )}"
    </p>

    <h4>getJSONFlag</h4>
    <p>Nav color is {JSONFlag.nav}</p>
    <p>Footer color is {JSONFlag.footer}</p>
  </div>
);
