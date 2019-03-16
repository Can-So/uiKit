import * as React from 'react';
import { EventHandlers } from '@findable/editor-common';
export default function Link(props: {
    children?: any;
    href: string;
    target?: string;
    eventHandlers?: EventHandlers;
} & React.Props<any>): JSX.Element;
