import * as React from 'react';
import { StatelessComponent } from 'react';

import { DecisionItem as AkDecisionItem } from '@findable/task-decision';

const DecisionItem: StatelessComponent = ({ children }) => {
  return <AkDecisionItem>{children}</AkDecisionItem>;
};

export default DecisionItem;
