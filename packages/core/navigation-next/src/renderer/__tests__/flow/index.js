// @flow

import React from 'react';
import ItemsRenderer from '../../index';

const Foo = () => null;

<ItemsRenderer items={[]} />;
<ItemsRenderer customComponents={{ Foo }} items={[]} />;
<ItemsRenderer
  customComponents={{ Foo }}
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
      customComponents: { Foo },
      items: [{ type: 'Item', id: 'item', text: 'Item' }],
    },
    {
      type: 'HeaderSection',
      id: 'headerSection',
      customComponents: { Foo },
      items: [{ type: 'Item', id: 'item', text: 'Item' }],
    },
    {
      type: 'MenuSection',
      id: 'menuSection',
      customComponents: { Foo },
      nestedGroupKey: 'menu',
      items: [{ type: 'Item', id: 'item', text: 'Item' }],
    },
    {
      type: 'Section',
      id: 'section',
      customComponents: { Foo },
      nestedGroupKey: 'section',
      items: [{ type: 'Item', id: 'item', text: 'Item' }],
    },
    {
      type: 'SortableContext',
      id: 'sortable-context',
      customComponents: { Foo },
      onDragEnd: () => {},
      items: [{ type: 'Item', id: 'item', text: 'Item' }],
    },
    {
      type: 'SortableGroup',
      id: 'sortable-group',
      customComponents: { Foo },
      items: [{ type: 'Item', id: 'item', text: 'Item' }],
    },
    {
      type: 'InlineComponent',
      id: 'inline-component',
      component: () => <Foo />,
    },
  ]}
/>;

// $ExpectError - missing items
<ItemsRenderer customComponents={{ Foo }} />;
// $ExpectError - customComponents must be object with ComponentTypes
<ItemsRenderer customComponents={{ Foo: null }} items={[]} />;
// $ExpectError - items must only have valid item types
<CustomItemsRenderer
  customComponents={{ Foo }}
  items={[
    {
      type: 'abc',
      id: 'abc',
    },
  ]}
/>;
// $ExpectError - each item in items must have an id
<ItemsRenderer
  customComponents={{ Foo }}
  items={[
    {
      type: 'Item',
    },
  ]}
/>;
// $ExpectError - GoToItem must have goTo
<ItemsRenderer
  customComponents={{ Foo }}
  items={[
    {
      type: 'GoToItem',
      id: 'goto',
    },
  ]}
/>;

// $ExpectError - GroupHeading must have text
<ItemsRenderer
  customComponents={{ Foo }}
  items={[
    {
      type: 'GroupHeading',
      id: 'heading',
    },
  ]}
/>;

// $ExpectError - SortableItem must have index
<ItemsRenderer
  customComponents={{ Foo }}
  items={[
    {
      type: 'SortableItem',
      id: 'sortable',
      text: 'sortable',
    },
  ]}
/>;

// $ExpectError - Group must have items
<ItemsRenderer
  customComponents={{ Foo }}
  items={[
    {
      type: 'Group',
      id: 'group',
    },
  ]}
/>;

// $ExpectError - CustomComponent must have name prop
<ItemsRenderer
  customComponents={{ Foo }}
  items={[
    {
      type: 'CustomComponent',
      id: 'custom-component',
    },
  ]}
/>;

// $ExpectError - InlineComponent must have component prop
<ItemsRenderer
  customComponents={{ Foo }}
  items={[
    {
      type: 'InlineComponent',
      id: 'inline-component',
    },
  ]}
/>;
