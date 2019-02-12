import * as React from 'react';
import JiraSwitcher from './jira-switcher';
import ConfluenceSwitcher from './confluence-switcher';

interface AtlassianSwitcherProps {
  product: string;
}

export default ({ product, ...props }: AtlassianSwitcherProps) => {
  let Switcher: React.ReactType;
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
  return <Switcher {...props} />;
};
