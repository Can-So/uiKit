import * as React from 'react';
import {
  NavigationProvider,
  LayoutManagerWithViewController,
  GlobalNav,
} from '@atlaskit/navigation-next';
import { JiraIcon } from '@atlaskit/logo';
import Avatar from '@atlaskit/avatar';
import AddIcon from '@atlaskit/icon/glyph/add';
import SearchIcon from '@atlaskit/icon/glyph/search';
import QuestionCircleIcon from '@atlaskit/icon/glyph/question-circle';

const Nav = () => (
  <GlobalNav
    primaryItems={[
      {
        id: 'jira',
        icon: ({ label }) => <JiraIcon size="medium" label={label} />,
        label: 'Jira',
      },
      { id: 'search', icon: SearchIcon },
      { id: 'create', icon: AddIcon },
    ]}
    secondaryItems={[
      { id: 'help', icon: QuestionCircleIcon, label: 'Help', size: 'small' },
      {
        icon: () => (
          <Avatar
            borderColor="transparent"
            isActive={false}
            isHover={false}
            size="small"
          />
        ),
        label: 'Profile',
        size: 'small',
        id: 'profile',
      },
    ]}
  />
);

const LOCALSTORAGE_renderer_sidebar_key =
  'fabric.editor.examples.renderer.sidebar';

export const getDefaultShowSidebarState = (defaultValue = false) => {
  if (localStorage) {
    const defaultState = localStorage.getItem(
      LOCALSTORAGE_renderer_sidebar_key,
    );
    if (defaultState) {
      return JSON.parse(defaultState).showSidebar;
    }
  }

  return defaultValue;
};

export function NavigationNext({ children }) {
  return (
    <NavigationProvider>
      <LayoutManagerWithViewController globalNavigation={Nav}>
        <div style={{ padding: 40 }}>{children}</div>
      </LayoutManagerWithViewController>
    </NavigationProvider>
  );
}

export default class Sidebar extends React.Component<
  { children: any; showSidebar: boolean },
  { showSidebar: boolean }
> {
  componentDidUpdate(prevProps) {
    if (prevProps.showSidebar !== this.props.showSidebar) {
      localStorage.setItem(
        LOCALSTORAGE_renderer_sidebar_key,
        JSON.stringify({ showSidebar: this.props.showSidebar }),
      );
    }
  }

  render() {
    if (typeof this.props.children !== 'function') {
      return this.props.children;
    }

    if (!this.props.showSidebar) {
      return this.props.children({});
    }

    const additionalRendererProps = {
      appearance: 'full-page',
      allowDynamicTextSizing: true,
    };

    return (
      <NavigationNext>
        {this.props.children(additionalRendererProps)}
      </NavigationNext>
    );
  }
}
