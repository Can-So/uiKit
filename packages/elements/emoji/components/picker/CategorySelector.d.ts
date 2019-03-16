import { PureComponent } from 'react';
import { CategoryDescription, OnCategory } from '../../types';
import { CategoryGroupKey, CategoryId } from './categories';
export interface Props {
    dynamicCategories?: CategoryId[];
    activeCategoryId?: CategoryId;
    disableCategories?: boolean;
    onCategorySelected?: OnCategory;
}
export interface State {
    categories: CategoryId[];
}
export declare type CategoryMap = {
    [id: string]: CategoryDescription;
};
export declare const sortCategories: (c1: CategoryGroupKey, c2: CategoryGroupKey) => number;
export default class CategorySelector extends PureComponent<Props, State> {
    static defaultProps: {
        onCategorySelected: () => void;
        dynamicCategories: never[];
    };
    constructor(props: Props);
    onClick: (categoryId: CategoryId) => void;
    componentWillUpdate(nextProps: Props): void;
    render(): JSX.Element;
}
