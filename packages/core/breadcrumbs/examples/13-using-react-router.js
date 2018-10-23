// @flow
import React from 'react';
import { Link, MemoryRouter } from 'react-router-dom';
import { AtlassianIcon } from '@atlaskit/logo';
import { BreadcrumbsStateless, BreadcrumbsItem } from '../src';

type Props = {
  children: Node,
  className: string,
  href: Link,
  onMouseEnter: Event,
  onMouseLeave: Event,
};
class RouterLink extends React.PureComponent<Props, {}> {
  render() {
    const {
      children,
      className,
      href,
      onMouseEnter,
      onMouseLeave,
    } = this.props;

    return (
      <Link
        className={className}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        to={href}
      >
        {children}
      </Link>
    );
  }
}

const ButtonWithRouter = () => (
  <div>
    <MemoryRouter>
      <BreadcrumbsStateless>
        <BreadcrumbsItem href="/pages" text="Pages" component={RouterLink} />
        <BreadcrumbsItem
          href="/pages/home"
          text="Home"
          component={RouterLink}
        />
        <BreadcrumbsItem
          href="/item"
          iconBefore={<AtlassianIcon label="Test icon" size="small" />}
          text="Icon Before"
          component={RouterLink}
        />
        <BreadcrumbsItem
          href="/item"
          iconAfter={<AtlassianIcon label="Test icon" size="small" />}
          text="Icon After"
          component={RouterLink}
        />
      </BreadcrumbsStateless>
    </MemoryRouter>
  </div>
);

export default ButtonWithRouter;
