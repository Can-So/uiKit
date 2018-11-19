// @flow

import React from 'react';
import TypedItemsRenderer from '../../components';

type CustomComponents =
  | { type: 'Funky', id: string, funky: boolean, optionalString?: string }
  | { type: 'Groovy', id: string, groovy: boolean, optionalNumber?: number };

class ItemsRendererWithCustomComponents extends TypedItemsRenderer<CustomComponents> {}

const Funky = (props: { funky: boolean, optionalString?: number }) => null;
const Groovy = (props: { groovy: boolean, optionalNumber?: number }) => null;

<ItemsRendererWithCustomComponents items={[]} />;
<ItemsRendererWithCustomComponents
  customComponents={{ Funky, Groovy }}
  items={[]}
/>;
<ItemsRendererWithCustomComponents
  customComponents={{ Funky, Groovy }}
  items={[
    { type: 'BackItem', id: 'back' },
    { type: 'ContainerHeader', id: 'header' },
    { type: 'Debug', id: 'debug', foo: 'bar' },
    {
      type: 'GoToItem',
      id: 'goto',
      goTo: 'my-view',
    },
    { type: 'GroupHeading', id: 'heading', text: 'heading' },
    { type: 'Item', id: 'item', text: 'abc' },
    { type: 'SortableItem', id: 'sortable-item', text: 'abc', index: 0 },
    { type: 'SectionHeading', id: 'heading', text: 'heading' },
    { type: 'Separator', id: 'separator' },
    { type: 'Switcher', id: 'item', target: <div />, options: [] },
    { type: 'Wordmark', id: 'item', wordmark: () => null },
    {
      type: 'Group',
      id: 'group',
      customComponents: { Funky, Groovy },
      items: [
        { type: 'Item', id: 'item', text: 'Item' },
        // Custom components should work within other items
        {
          type: 'Funky',
          id: 'funky-component',
          funky: true,
        },
      ],
    },
    {
      type: 'HeaderSection',
      id: 'headerSection',
      customComponents: { Funky, Groovy },
      items: [
        { type: 'Item', id: 'item', text: 'Item' },
        // Custom components should work within other items
        {
          type: 'Funky',
          id: 'funky-component',
          funky: true,
        },
      ],
    },
    {
      type: 'MenuSection',
      id: 'menuSection',
      customComponents: { Funky, Groovy },
      nestedGroupKey: 'menu',
      items: [
        { type: 'Item', id: 'item', text: 'Item' },
        // Custom components should work within other items
        {
          type: 'Funky',
          id: 'funky-component',
          funky: true,
        },
      ],
    },
    {
      type: 'Section',
      id: 'section',
      customComponents: { Funky, Groovy },
      nestedGroupKey: 'section',
      items: [
        { type: 'Item', id: 'item', text: 'Item' },
        // Custom components should work within other items
        {
          type: 'Funky',
          id: 'funky-component',
          funky: true,
        },
      ],
    },
    {
      type: 'SortableContext',
      id: 'sortable-context',
      customComponents: { Funky, Groovy },
      onDragEnd: () => {},
      items: [
        { type: 'Item', id: 'item', text: 'Item' },
        // Custom components should work within other items
        {
          type: 'Funky',
          id: 'funky-component',
          funky: true,
        },
      ],
    },
    {
      type: 'SortableGroup',
      id: 'sortable-group',
      customComponents: { Funky, Groovy },
      items: [
        { type: 'Item', id: 'item', text: 'Item' },
        // Custom components should work within other items
        {
          type: 'Funky',
          id: 'funky-component',
          funky: true,
        },
      ],
    },
    {
      type: 'InlineComponent',
      id: 'inline-component',
      component: () => <Funky funky />,
    },
    {
      type: 'Funky',
      id: 'funky-component',
      funky: true,
    },
    {
      type: 'Groovy',
      id: 'groovy-component',
      groovy: true,
    },
  ]}
/>;

<ItemsRendererWithCustomComponents
  customComponents={{ Funky, Groovy }}
  items={[
    {
      type: 'InlineComponent',
      id: 'inline-component',
      component: () => <Funky funky />,
    },
  ]}
/>;

// $ExpectError - missing items
<ItemsRendererWithCustomComponents customComponents={{ Funky, Groovy }} />;
// $ExpectError - customComponents must be object with ComponentTypes
<ItemsRendererWithCustomComponents
  customComponents={{ Foo: null }}
  items={[]}
/>;
// $ExpectError - items must only have valid item types
<CustomItemsRenderer
  customComponents={{ Funky, Groovy }}
  items={[
    {
      type: 'abc',
      id: 'abc',
    },
  ]}
/>;
// $ExpectError - each item in items must have an id
<ItemsRendererWithCustomComponents
  customComponents={{ Funky, Groovy }}
  items={[
    {
      type: 'Item',
    },
  ]}
/>;
// $ExpectError - GoToItem must have goTo
<ItemsRendererWithCustomComponents
  customComponents={{ Funky, Groovy }}
  items={[
    {
      type: 'GoToItem',
      id: 'goto',
    },
  ]}
/>;

// $ExpectError - GroupHeading must have text
<ItemsRendererWithCustomComponents
  customComponents={{ Funky, Groovy }}
  items={[
    {
      type: 'GroupHeading',
      id: 'heading',
    },
  ]}
/>;

// $ExpectError - SortableItem must have index
<ItemsRendererWithCustomComponents
  customComponents={{ Funky, Groovy }}
  items={[
    {
      type: 'SortableItem',
      id: 'sortable',
      text: 'sortable',
    },
  ]}
/>;

// $ExpectError - Group must have items
<ItemsRendererWithCustomComponents
  customComponents={{ Funky, Groovy }}
  items={[
    {
      type: 'Group',
      id: 'group',
    },
  ]}
/>;

// $ExpectError - Funky custom component must have funky prop
<ItemsRendererWithCustomComponents
  customComponents={{ Funky, Groovy }}
  items={[
    {
      type: 'Funky',
      id: 'funky-component',
    },
  ]}
/>;

// $ExpectError - Groovy custom component must have groovy prop
<ItemsRendererWithCustomComponents
  customComponents={{ Funky, Groovy }}
  items={[
    {
      type: 'Groovy',
      id: 'groovy-component',
    },
  ]}
/>;

// $ExpectError - Groovy custom component must have groovy prop when embedded within another item
<ItemsRendererWithCustomComponents
  customComponents={{ Funky, Groovy }}
  items={[
    {
      type: 'Group',
      id: 'group',
      items: [
        {
          type: 'Groovy',
          id: 'groovy-component',
        },
      ],
    },
  ]}
/>;

// $ExpectError - InlineComponent must have component prop
<ItemsRendererWithCustomComponents
  customComponents={{ Funky, Groovy }}
  items={[
    {
      type: 'InlineComponent',
      id: 'inline-component',
    },
  ]}
/>;
