import * as React from 'react';
import { Team } from '../types';
export declare type TeamOptionProps = {
    team: Team;
    isSelected: boolean;
};
export declare class TeamOption extends React.PureComponent<TeamOptionProps> {
    private getPrimaryText;
    private renderByline;
    private renderAvatar;
    render(): JSX.Element;
}
