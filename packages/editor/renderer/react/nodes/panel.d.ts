import { PureComponent } from 'react';
import { PanelType } from '@atlaskit/adf-schema';
export interface Props {
    panelType: PanelType;
}
export default class Panel extends PureComponent<Props, {}> {
    render(): JSX.Element;
    getIcon(): JSX.Element;
}
