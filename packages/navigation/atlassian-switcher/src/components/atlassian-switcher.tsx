import * as React from 'react';
import JiraSwitcher from './jira-switcher';
import ConfluenceSwitcher from './confluence-switcher';

interface AtlassianSwitcherProps {
  product: string;
  cloudId: string;
  triggerXFlow: Function;
}

export default ({
  product,
  cloudId,
  triggerXFlow,
  ...props
}: AtlassianSwitcherProps) => {
  let Switcher: React.ReactType = JiraSwitcher;
  switch (product) {
    case 'jira':
      Switcher = JiraSwitcher;
      break;
    case 'confluence':
      Switcher = ConfluenceSwitcher;
      break;
    default:
      Switcher = JiraSwitcher;
  }
  return <Switcher cloudId={cloudId} triggerXFlow={triggerXFlow} {...props} />;
};
