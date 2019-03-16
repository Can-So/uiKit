import { CategoryDescription } from '../../types';
export declare type CategoryId = 'FREQUENT' | 'PEOPLE' | 'NATURE' | 'FOODS' | 'ACTIVITY' | 'PLACES' | 'OBJECTS' | 'SYMBOLS' | 'FLAGS' | 'ATLASSIAN' | 'CUSTOM';
export declare type CategoryGroupKey = CategoryId | 'USER_CUSTOM' | 'SEARCH';
export declare type CategoryDescriptionMap = {
    [key in CategoryGroupKey]: CategoryDescription;
};
export declare const CategoryDescriptionMap: CategoryDescriptionMap;
