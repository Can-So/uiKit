import * as React from 'react';
import { AlignmentAttributes } from '@atlaskit/adf-schema';
export interface Props extends AlignmentAttributes {
    children: React.Props<any>;
}
export default function Alignment(props: Props): JSX.Element;
