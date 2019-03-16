import { ChangeEventHandler, PureComponent } from 'react';
export interface Props {
    label: string;
    ariaLabel?: string;
    onChange?: ChangeEventHandler<any>;
    accept?: string;
    isDisabled?: boolean;
}
export default class FileChooser extends PureComponent<Props, {}> {
    onChooseFile: () => void;
    render(): JSX.Element;
}
