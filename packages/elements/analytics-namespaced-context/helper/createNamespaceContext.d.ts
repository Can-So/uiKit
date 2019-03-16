import * as React from 'react';
import { ReactNode } from 'react';
export declare type Props = {
    children?: ReactNode;
    data: {};
};
declare const createNamespaceContext: (namespace: string, displayName?: string) => React.StatelessComponent<Props>;
export default createNamespaceContext;
