import * as React from 'react';
import Inline from './inline';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export default function Heading(
  props: {
    level: HeadingLevel;
    headingId?: string;
  } & React.Props<any>,
) {
  const { level, children, headingId } = props;
  const HX = `h${level}`;

  return (
    <HX id={headingId}>
      <Inline>{children}</Inline>
    </HX>
  );
}
