import * as React from 'react';
export declare type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export default function Heading(props: {
    level: HeadingLevel;
    headingId?: string;
} & React.Props<any>): JSX.Element;
