import { PureComponent } from 'react';
import { PanelType } from '@findable/adf-schema';
export interface Props {
    panelType: PanelType;
}
export default class Panel extends PureComponent<Props, {}> {
    render(): JSX.Element;
    getIcon(): JSX.Element;
}
