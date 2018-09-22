//@flow
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  children: any,
  className: string,
  onMouseEnter: Event,
  onMouseLeave: Event,
  disabled: boolean,
};

type PageProps = Props & {
  page: any,
};

type NavigatorProps = Props & {
  pages: any,
  selectedIndex: number,
};

export function RouterLink({
  children,
  className,
  onMouseEnter,
  onMouseLeave,
  disabled,
  page,
}: PageProps) {
  const href = page.href;
  return disabled ? (
    <div className={className}>{children}</div>
  ) : (
    <Link
      key={page.label}
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      disabled
      to={disabled ? '#' : href}
    >
      {page.label}
    </Link>
  );
}

export function RouterLinkLeft({
  children,
  className,
  onMouseEnter,
  onMouseLeave,
  disabled,
  pages,
  selectedIndex,
}: NavigatorProps) {
  let href;
  if (pages && selectedIndex > 1) {
    href = pages[selectedIndex - 2].href;
  }
  return disabled ? (
    <div className={className}>{children}</div>
  ) : (
    <Link
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      disabled
      to={disabled ? '#' : href}
    >
      {children}
    </Link>
  );
}

export function RouterLinkRight({
  children,
  className,
  onMouseEnter,
  onMouseLeave,
  disabled,
  pages,
  selectedIndex,
}: NavigatorProps) {
  let href;
  if (pages && selectedIndex < pages.length) {
    href = pages[selectedIndex].href;
  }
  return disabled ? (
    <div className={className}>{children}</div>
  ) : (
    <Link
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      disabled
      to={disabled ? '#' : href}
    >
      {children}
    </Link>
  );
}
