// @flow

import type { ComponentType, ElementConfig } from 'react';

import ContainerHeader from '../components/presentational/ContainerHeader';
import Group from '../components/presentational/Group';
import GroupHeading from '../components/presentational/GroupHeading';
import HeaderSection from '../components/presentational/HeaderSection';
import MenuSection from '../components/presentational/MenuSection';
import Section from '../components/presentational/Section';
import SectionHeading from '../components/presentational/SectionHeading';
import Separator from '../components/presentational/Separator';
import Switcher from '../components/presentational/Switcher';
import Wordmark from '../components/presentational/Wordmark';

import BackItem from '../components/connected/BackItem';
import ConnectedItem from '../components/connected/ConnectedItem';
import GoToItem from '../components/connected/GoToItem';
import SortableContext from '../components/connected/SortableContext';
import SortableGroup from '../components/connected/SortableGroup';
import SortableItem from '../components/connected/SortableItem';

type WithoutChildren<P: {}> = $Diff<P, { children: * }>;

// Used as upper bound for generic custom component types
export type TypeShape = { type: *, id: string };

/**
 * Component Props
 */

type SharedItemTypeProps = {|
  id: string,
|};

type SharedGroupTypeProps<T> = {|
  ...$Exact<SharedItemTypeProps>,
  customComponents?: CustomComponents,
  items: Array<NavigationRendererItemType<T>>,
|};

type SectionKey = {|
  nestedGroupKey?: string,
|};

export type GroupProps<T> = {|
  ...$Exact<WithoutChildren<ElementConfig<typeof Group>>>,
  ...$Exact<SharedGroupTypeProps<T>>,
|};

export type SectionProps<T> = {|
  ...$Exact<WithoutChildren<ElementConfig<typeof Section>>>,
  ...$Exact<SharedGroupTypeProps<T>>,
  ...$Exact<SectionKey>,
|};

export type SortableContextProps<T> = {|
  ...$Exact<SharedGroupTypeProps<T>>,
  ...$Exact<WithoutChildren<ElementConfig<typeof SortableContext>>>,
|};

export type SortableGroupProps<T> = {|
  ...$Exact<SharedGroupTypeProps<T>>,
  ...$Exact<WithoutChildren<ElementConfig<typeof SortableGroup>>>,
|};

export type HeaderSectionProps<T> = {|
  ...$Exact<WithoutChildren<ElementConfig<typeof HeaderSection>>>,
  ...$Exact<SharedGroupTypeProps<T>>,
  ...$Exact<SectionKey>,
|};

export type MenuSectionProps<T> = {|
  ...$Exact<WithoutChildren<ElementConfig<typeof MenuSection>>>,
  ...$Exact<SharedGroupTypeProps<T>>,
  ...$Exact<SectionKey>,
|};

export type GroupHeadingProps = {|
  ...$Exact<WithoutChildren<ElementConfig<typeof GroupHeading>>>,
  text: string,
|};

export type SectionHeadingProps = {|
  ...$Exact<WithoutChildren<ElementConfig<typeof SectionHeading>>>,
  text: string,
|};

export type CustomComponents = { [string]: ComponentType<*> };

export type ItemsRendererProps<T: TypeShape = empty> = {
  customComponents?: CustomComponents,
  items: NavigationRendererItemType<T>[],
};

/**
 * Component Types
 */

export type BackItemType = {
  +type: 'BackItem',
  ...$Exact<ElementConfig<typeof BackItem>>,
  ...$Exact<SharedItemTypeProps>,
};

export type ContainerHeaderType = {
  +type: 'ContainerHeader',
  ...$Exact<ElementConfig<typeof ContainerHeader>>,
  ...$Exact<SharedItemTypeProps>,
};

export type DebugType = {
  +type: 'Debug',
  [string]: any,
  ...$Exact<SharedItemTypeProps>,
};

export type GoToItemType = {
  +type: 'GoToItem',
  ...$Exact<ElementConfig<typeof GoToItem>>,
  ...$Exact<SharedItemTypeProps>,
};

export type GroupHeadingType = {|
  +type: 'GroupHeading',
  ...$Exact<GroupHeadingProps>,
  ...$Exact<SharedItemTypeProps>,
|};

export type ItemType = {
  +type: 'Item',
  ...$Exact<ElementConfig<typeof ConnectedItem>>,
  ...$Exact<SharedItemTypeProps>,
};

export type SortableItemType = {
  +type: 'SortableItem',
  ...$Exact<ElementConfig<typeof SortableItem>>,
  ...$Exact<SharedItemTypeProps>,
};

export type SectionHeadingType = {|
  +type: 'SectionHeading',
  ...$Exact<SectionHeadingProps>,
  ...$Exact<SharedItemTypeProps>,
|};

export type SeparatorType = {|
  +type: 'Separator',
  ...$Exact<ElementConfig<typeof Separator>>,
  ...$Exact<SharedItemTypeProps>,
|};

export type SwitcherType = {
  +type: 'Switcher',
  ...$Exact<ElementConfig<typeof Switcher>>,
  ...$Exact<SharedItemTypeProps>,
};

export type WordmarkType = {|
  +type: 'Wordmark',
  ...$Exact<ElementConfig<typeof Wordmark>>,
  ...$Exact<SharedItemTypeProps>,
|};

export type GroupType<T> = {|
  +type: 'Group',
  ...$Exact<GroupProps<T>>,
|};

export type HeaderSectionType<T> = {|
  +type: 'HeaderSection',
  ...$Exact<HeaderSectionProps<T>>,
|};

export type MenuSectionType<T> = {|
  +type: 'MenuSection',
  ...$Exact<MenuSectionProps<T>>,
|};

export type SectionType<T> = {|
  +type: 'Section',
  ...$Exact<SectionProps<T>>,
|};

export type SortableContextType<T> = {|
  +type: 'SortableContext',
  ...$Exact<SortableContextProps<T>>,
|};

export type SortableGroupType<T> = {|
  +type: 'SortableGroup',
  ...$Exact<SortableGroupProps<T>>,
|};

export type InlineComponentType = {
  +type: 'InlineComponent',
  component: ComponentType<*>,
  ...$Exact<SharedItemTypeProps>,
};

export type LeafItemType =
  | BackItemType
  | ContainerHeaderType
  | DebugType
  | GoToItemType
  | GroupHeadingType
  | ItemType
  | SortableItemType
  | SectionHeadingType
  | SeparatorType
  | SwitcherType
  | WordmarkType;

export type BranchItemType<T> =
  | GroupType<T>
  | HeaderSectionType<T>
  | MenuSectionType<T>
  | SectionType<T>
  | SortableContextType<T>
  | SortableGroupType<T>;

// The 'empty' type should be used when no custom components exist
// We provide a default of empty so that the type can be used as NavigationRendererItemType<>
export type NavigationRendererItemType<T: TypeShape = empty> =
  | LeafItemType
  | BranchItemType<T>
  | InlineComponentType
  | T;
