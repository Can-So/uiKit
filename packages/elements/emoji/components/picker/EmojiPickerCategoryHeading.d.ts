import { PureComponent } from 'react';
export interface Props {
    id: string;
    title: string;
    className?: string;
}
export default class EmojiPickerCategoryHeading extends PureComponent<Props, {}> {
    render(): JSX.Element;
}
