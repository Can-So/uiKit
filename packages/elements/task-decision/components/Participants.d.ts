import { PureComponent } from 'react';
export declare const AvatarGroupLoadable: any;
import { Participant } from '../types';
export interface Props {
    participants: Participant[];
}
export default class Partipants extends PureComponent<Props, {}> {
    private getAvatarData;
    render(): JSX.Element;
}
