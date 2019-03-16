import { PureComponent } from 'react';
export interface Props {
    /** The real time progress fraction */
    progress: number;
    /** The 100% done size of the bar in px */
    maxWidth: number;
    /** If a cancel button should be shown, also the CB when it is clicked */
    onCancel?: () => any;
    /** The label for the cancel button */
    cancelLabel?: string;
}
export default class ProgressLoader extends PureComponent<Props, any> {
    render(): JSX.Element;
}
