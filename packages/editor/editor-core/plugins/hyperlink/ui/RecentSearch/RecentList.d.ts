import { PureComponent } from 'react';
import { ActivityItem } from '@atlaskit/activity';
export interface Props {
    items?: Array<ActivityItem>;
    isLoading: boolean;
    selectedIndex: number;
    onSelect: (href: string, text: string) => void;
    onMouseMove: (objectId: string) => void;
}
export default class RecentList extends PureComponent<Props, {}> {
    render(): JSX.Element | null;
}
