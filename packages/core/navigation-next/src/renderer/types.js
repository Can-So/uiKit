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

/**
 * Component Props
 */

type SharedItemTypeProps = {|
  id: string,
|};

type SharedGroupTypeProps = {|
  ...$Exact<SharedItemTypeProps>,
  customComponents?: CustomComponents,
  items: Array<RendererItemType>,
|};

type SectionKey = {|
  nestedGroupKey?: string,
|};

export type GroupProps = {|
  ...$Exact<WithoutChildren<ElementConfig<typeof Group>>>,
  ...$Exact<SharedGroupTypeProps>,
|};

export type SectionProps = {|
  ...$Exact<WithoutChildren<ElementConfig<typeof Section>>>,
  ...$Exact<SharedGroupTypeProps>,
  ...$Exact<SectionKey>,
|};

export type SortableContextProps = {|
  ...$Exact<SharedGroupTypeProps>,
  ...$Exact<WithoutChildren<ElementConfig<typeof SortableContext>>>,
|};

export type SortableGroupProps = {|
  ...$Exact<SharedGroupTypeProps>,
  ...$Exact<WithoutChildren<ElementConfig<typeof SortableGroup>>>,
|};

export type HeaderSectionProps = {|
  ...$Exact<WithoutChildren<ElementConfig<typeof HeaderSection>>>,
  ...$Exact<SharedGroupTypeProps>,
  ...$Exact<SectionKey>,
|};

export type MenuSectionProps = {|
  ...$Exact<WithoutChildren<ElementConfig<typeof MenuSection>>>,
  ...$Exact<SharedGroupTypeProps>,
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

export type ItemsRendererProps = {
  customComponents?: CustomComponents,
  items: RendererItemType[],
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

export type GroupType = {|
  +type: 'Group',
  ...$Exact<GroupProps>,
|};

export type HeaderSectionType = {|
  +type: 'HeaderSection',
  ...$Exact<HeaderSectionProps>,
|};

export type MenuSectionType = {|
  +type: 'MenuSection',
  ...$Exact<MenuSectionProps>,
|};

export type SectionType = {|
  +type: 'Section',
  ...$Exact<SectionProps>,
|};

export type SortableContextType = {|
  +type: 'SortableContext',
  ...$Exact<SortableContextProps>,
|};

export type SortableGroupType = {|
  +type: 'SortableGroup',
  ...$Exact<SortableGroupProps>,
|};

export type CustomComponentType = {
  +type: 'CustomComponent',
  name: string,
  ...$Exact<SharedItemTypeProps>,
};

export type InlineComponentType = {
  +type: 'InlineComponent',
  component: ComponentType<*>,
  ...$Exact<SharedItemTypeProps>,
};

export type RendererItemType =
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
  | WordmarkType
  | GroupType
  | HeaderSectionType
  | MenuSectionType
  | SectionType
  | SortableContextType
  | SortableGroupType
  | CustomComponentType
  | InlineComponentType;
