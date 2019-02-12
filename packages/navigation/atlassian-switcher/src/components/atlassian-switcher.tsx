import * as React from 'react';
import JiraSwitcher from './jira-switcher';
import ConfluenceSwitcher from './confluence-switcher';

export default ({
  product,
  cloudId,
  triggerXFlow,
  ...props
}: {
  product: string;
  cloudId: string;
  triggerXFlow: Function;
}) => {
  let Switcher: React.ReactType = JiraSwitcher;
  switch (product) {
    case 'jira':
      Switcher = JiraSwitcher;
    case 'confluence':
      Switcher = ConfluenceSwitcher;
    default:
      Switcher = JiraSwitcher;
  }
  return <Switcher cloudId={cloudId} triggerXFlow={triggerXFlow} {...props} />;
};
