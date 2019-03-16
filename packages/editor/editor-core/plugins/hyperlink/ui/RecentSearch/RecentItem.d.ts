import * as React from 'react';
import { HTMLAttributes, ComponentClass } from 'react';
import { ActivityItem } from '@atlaskit/activity';
export declare const Name: ComponentClass<HTMLAttributes<{}>>;
export declare const ContainerName: ComponentClass<React.HTMLAttributes<{}>>;
export interface Props {
    item: ActivityItem;
    selected: boolean;
    onSelect: (href: string, text: string) => void;
    onMouseMove: (objectId: string) => void;
}
export default class RecentItem extends React.PureComponent<Props, {}> {
    handleSelect: (e: React.MouseEvent<Element>) => void;
    handleMouseMove: () => void;
    render(): JSX.Element;
}
