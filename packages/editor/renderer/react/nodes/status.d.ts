import { PureComponent } from 'react';
import { Color } from '@atlaskit/status';
export interface Props {
    text: string;
    color: Color;
    localId?: string;
}
export default class Status extends PureComponent<Props, {}> {
    render(): JSX.Element;
}
