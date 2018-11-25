//@flow
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  children?: any,
  className?: string,
  onMouseEnter?: Function,
  onMouseLeave?: Function,
  disabled?: boolean,
};

type PageProps = Props & {
  page?: any,
};

type NavigatorProps = Props & {
  pages?: any,
  selectedIndex?: number,
};

export function RouterLink({ children, disabled, page, ...rest }: PageProps) {
  const href = page && page.href;
  return disabled ? (
    <div {...rest}>{children}</div>
  ) : (
    <Link
      {...rest}
      key={page && page.label}
      disabled
      to={disabled ? '#' : href}
    >
      {page && page.label}
    </Link>
  );
}

export function RouterLinkLeft({
  children,
  disabled,
  pages,
  selectedIndex,
  ...rest
}: NavigatorProps) {
  let href;
  if (pages && selectedIndex && selectedIndex > 1) {
    href = pages[selectedIndex - 2].href;
  }
  return disabled ? (
    <div {...rest}>{children}</div>
  ) : (
    <Link {...rest} disabled to={disabled ? '#' : href}>
      {children}
    </Link>
  );
}

export function RouterLinkRight({
  children,
  disabled,
  pages,
  selectedIndex,
  ...rest
}: NavigatorProps) {
  let href;
  if (pages && selectedIndex < pages.length) {
    href = pages[selectedIndex].href;
  }
  return disabled ? (
    <div {...rest}>{children}</div>
  ) : (
    <Link {...rest} disabled to={disabled ? '#' : href}>
      {children}
    </Link>
  );
}
