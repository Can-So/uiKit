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
 * Components
 */

export type ItemType =
  | {
      +type: 'BackItem',
      ...$Exact<ElementConfig<typeof BackItem>>,
      ...$Exact<SharedItemTypeProps>,
    }
  | {
      +type: 'ContainerHeader',
      ...$Exact<ElementConfig<typeof ContainerHeader>>,
      ...$Exact<SharedItemTypeProps>,
    }
  | {
      +type: 'Debug',
      [string]: any,
      ...$Exact<SharedItemTypeProps>,
    }
  | {
      +type: 'GoToItem',
      ...$Exact<ElementConfig<typeof GoToItem>>,
      ...$Exact<SharedItemTypeProps>,
    }
  | {|
      +type: 'GroupHeading',
      ...$Exact<GroupHeadingProps>,
      ...$Exact<SharedItemTypeProps>,
    |}
  | {
      +type: 'Item',
      ...$Exact<ElementConfig<typeof ConnectedItem>>,
      ...$Exact<SharedItemTypeProps>,
    }
  | {
      +type: 'SortableItem',
      ...$Exact<ElementConfig<typeof SortableItem>>,
      ...$Exact<SharedItemTypeProps>,
    }
  | {|
      +type: 'SectionHeading',
      ...$Exact<SectionHeadingProps>,
      ...$Exact<SharedItemTypeProps>,
    |}
  | {|
      +type: 'Separator',
      ...$Exact<ElementConfig<typeof Separator>>,
      ...$Exact<SharedItemTypeProps>,
    |}
  | {
      +type: 'Switcher',
      ...$Exact<ElementConfig<typeof Switcher>>,
      ...$Exact<SharedItemTypeProps>,
    }
  | {|
      +type: 'Wordmark',
      ...$Exact<ElementConfig<typeof Wordmark>>,
      ...$Exact<SharedItemTypeProps>,
    |}
  | {|
      +type: 'Group',
      ...$Exact<GroupProps>,
    |}
  | {|
      +type: 'HeaderSection',
      ...$Exact<HeaderSectionProps>,
    |}
  | {|
      +type: 'MenuSection',
      ...$Exact<MenuSectionProps>,
    |}
  | {|
      +type: 'Section',
      ...$Exact<SectionProps>,
    |}
  | {|
      +type: 'SortableContext',
      ...$Exact<SortableContextProps>,
    |}
  | {|
      +type: 'SortableGroup',
      ...$Exact<SortableGroupProps>,
    |};

// export type RendererItem = ItemType;

export type GroupHeadingProps = {|
  ...$Exact<WithoutChildren<ElementConfig<typeof GroupHeading>>>,
  text: string,
|};

export type SectionHeadingProps = {|
  ...$Exact<WithoutChildren<ElementConfig<typeof SectionHeading>>>,
  text: string,
|};

export type CustomComponents = { [string]: ComponentType<any> };

type SharedItemTypeProps = {|
  id: string,
|};

type SharedGroupTypeProps = {|
  ...$Exact<SharedItemTypeProps>,
  customComponents?: CustomComponents,
  items: Array<ItemType>,
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

export type ItemsRendererProps = {
  customComponents?: CustomComponents,
  items: ItemType[],
};
