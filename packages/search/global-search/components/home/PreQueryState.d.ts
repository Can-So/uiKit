import * as React from 'react';
import { Result } from '../../model/Result';
export interface Props {
    recentlyViewedItems: Result[];
    sectionIndex: number;
}
export default class PreQueryState extends React.Component<Props> {
    render(): JSX.Element | null;
}
