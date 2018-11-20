// @flow

import React from 'react';
import { code, md, Props } from '@atlaskit/docs';

import { Contents, ContentsProvider, H, Hr } from './shared';

export default (
  <ContentsProvider>{md`${<Contents />}

${<Hr />}

${<H>NavigationProvider</H>}

The \`NavigationProvider\` facilitates sharing state throughout the application using Context. It should wrap the root of your application, and the \`LayoutManager\` component will not work unless it's the descendant of a \`NavigationProvider\`.

${(
    <Props
      heading="NavigationProvider props"
      props={require('!!extract-react-types-loader!../src/provider/NavigationProvider')}
    />
  )}

${<Hr />}

${<H>UI controller</H>}

The UI controller manages the visual state of the navigation component. To see this feature in action, [check out this guide](/packages/core/navigation-next/docs/composing-your-navigation#managing-the-ui-state).

### UIController

 The UIController class is the container for the UI state. It has the following interface:

${code`interface UIControllerInterface {
  state: {
    /** Whether the navigation is currently collapsed. */
    isCollapsed: boolean,
    /** Whether the navigation is currently performing a 'peek hint'.
     * @deprecated: The concept of peeking has been removed from the UX spec so
     * this property will be removed in a future release. */
    isPeekHinting: boolean,
    /** Whether the navigation is currently performing a 'peek'. @deprecated:
     * The concept of peeking has been removed from the UX spec so this property
     * will be removed in a future release. */
    isPeeking: boolean,
    /** Whether the navigation is currently being resized. */
    isResizing: boolean,
    /** The width of the content navigation area. */
    productNavWidth: number,
  };

  /** Collapsed the content navigation. */
  collapse: () => void;
  /** Expand the content navigation. */
  expand: () => void;
  /** Toggle the collapse/expand state of the content navigation. */
  toggleCollapse: () => void;

  /** Shift the container navigation layer to suggest that a 'peek' can be
   * performed. @deprecated */
  peekHint: () => void;
  /** Reset the position of the container navigation layer. @deprecated */
  unPeekHint: () => void;
  /** Toggle the hinting state of the container navigation layer. @deprecated */
  togglePeekHint: () => void;

  /** Slide the container navigation layer out of the way, or transition a
   * nested product navigation view, to reveal the 'root product home view'.
   * @deprecated */
  peek: () => void;
  /** Reset the navigation to its state before a peek was performed. @deprecated
   * */
  unPeek: () => void;
  /** Toggle the peeking state of the navigation. @deprecated */
  togglePeek: () => void;
}`}

### UIControllerSubscriber

A render component which provides the UI controller instance to its children.

${code`import { UIControllerSubscriber } from '@atlaskit/navigation-next';

const MyComponent = () => (
  <UIControllerSubscriber>
    {uiController => (
      <button onClick={uiController.toggleCollapse}>Click me</button>
    )}
  </UIControllerSubscriber>
);`}

### withNavigationUIController

A higher-order component which provides the UI controller instance through the \`navigationUIController\` prop to the component it wraps.

${code`import { withNavigationUIController } from '@atlaskit/navigation-next';

class MyComponentBase extends Component {
  render() {
    const { navigationUIController } = this.props;
    return navigationUIController.state.isCollapsed ? 'Foo' : 'Bar';
  }
}
const MyComponent = withNavigationUIController(MyComponentBase);`}

${<Hr />}

${<H>View controller</H>}

The view controller manages which set of items should be rendered in the navigation. For an in-depth walk-through of how to use this feature, [check out this guide](/packages/core/navigation-next/docs/controlling-navigation-views).

### ViewController

The ViewController class is the container for the view state. It has the following interface:

${code`interface ViewControllerInterface {
  state: {
    /** The view which is currently being rendered in the navigation. */
    activeView: {
      /** The unique ID for this view. */
      id: string,
      /** The layer of navigation this view should be rendered on. */
      type: 'container' | 'product',
      /** An array of items. */
      data: [],
      /** Any extra analytics attributes that have been added via \`getAnalyticsAttributes\`.
       * These will be added to the payload of analytics events fired within navigation-next
       */
      analyticsAttributes?: {} | void,
    } | null,

    /** The view which will become active once it has loaded. */
    incomingView: {
      /** The unique ID for this view. */
      id: string,
      /** The layer of navigation this view should be rendered on. */
      type: 'container' | 'product',
    } | null,

    /** The view which should be rendered on the product navigation layer when
     * the active view is a 'container' view. @deprecated: The concept of
     * peeking no longer exists in the UX spec, so this feature will be removed
     * in a future release. */
    activePeekView: {
      /** The unique ID for this view. */
      id: string,
      /** The layer of navigation this view should be rendered on. */
      type: 'container' | 'product',
      /** An array of items. */
      data: [],
    } | null,

    /** The view which will become the active peek view once it has loaded.
     * @deprecated */
    incomingPeekView: {
      /** The unique ID for this view. */
      id: string,
      /** The layer of navigation this view should be rendered on. */
      type: 'container' | 'product',
    } | null,
  };

  /** Register a view. You must provide an \`id\`, the \`type\` of view
   * ('product' or 'container'), and a \`getItems\` function which should return
   * either an array of data, or a Promise which will resolve to an array of
   * data. */
  addView: ({
    /** A unique ID for this view. */
    id: string,
    /** The layer of navigation this view should be rendered on. */
    type: 'container' | 'product',
    /** A function which should return an array of items, or a Promise which
     * will resolve to an array of items. */
    getItems: () => Promise<[]> | [],
    /** A function which is passed the items of the active view and should return
     * an object with extra attributes to be sent for analytics events.
     * Any data here is added to navigation context under the attributes key.
     */
    getAnalyticsAttributes?: (items: ViewData) => {},
  }) => void;

  /** Un-register a view. If the view being removed is active it will remain so
   * until a different view is set. */
  removeView: string => void;

  /** Set the registered view with the given ID as the active view. */
  setView: string => void;

  /** Add a reducer to the view with the given ID. */
  addReducer: (string, ([]) => []) => void;

  /** Remove a reducer from the view with the given ID. */
  removeReducer: (string, ([]) => []) => void;

  /** Specify which view should be treated as the initial peek view. */
  setInitialPeekViewId: string => void;

  /** Will re-resolve the active view and re-reduce its data. Accepts an
   * optional view ID to only re-resolve if the given ID matches the active
   * view. */
  updateActiveView: (string | void) => void;

  /** Set whether the view controller is in debug mode. */
  setIsDebugEnabled: boolean => void;
}`}

### ViewControllerSubscriber

A render component which provides the view controller instance to its children.

${code`import { ViewControllerSubscriber } from '@atlaskit/navigation-next';

const MyComponent = () => (
  <ViewControllerSubscriber>
    {viewController => (
      <button onClick={() => viewController.setView('view-id')}>
        Click me
      </button>
    )}
  </ViewControllerSubscriber>
);`}

### withNavigationViewController

A higher-order component which provides the view controller instance through the \`navigationViewController\` prop to the component it wraps.

${code`import { withNavigationViewController } from '@atlaskit/navigation-next';

class MyComponentBase extends Component {
  render() {
    const { navigationViewController } = this.props;
    navigationViewController.setView('view-id');
  }

  render() {
    return null;
  }
}
const MyComponent = withNavigationViewController(MyComponentBase);`}

${<Hr />}

${<H>Items Renderer</H>}

The items renderer is used to render the data representation of your view items for you. If using the \`LayoutManagerWithViewController\` component, you do not need to use the renderer as it is taken care of for you. However, if using directly you can use two different variants, depending on whether you wish to enable flow checking for it or not.


### Composing directly

The default version can be used as follows:

${code`
  import { ItemsRenderer } from '@atlaskit/navigation-next';

  <ItemsRenderer customComponents={...} items={...} />;
`}

To use the typed version, which allows you to type any custom components passed in:

${code`
  import { TypedItemsRenderer } from '@atlaskit/navigation-next';

  type CustomComponentType = { type: 'Foo', id: string, foo: boolean } | { type: 'Bar', id: string, bar: boolean };

  class ItemsRenderer extends TypedItemsRenderer<CustomComponentType> {};

  <ItemsRenderer customComponents={...} items={...} />;
`}

This version will properly type check the items passed to the renderer, including any custom component types.

### Built-in view item types

Every item in a view must have a \`type\` property. This can be a component, but the primitive UI component types are built into the renderer and can be identified using a string:

* \`'BackItem'\`
* \`'ContainerHeader'\`
* \`'Group'\`
* \`'GroupHeading'\`
* \`'HeaderSection'\`
* \`'InlineComponent'\`
* \`'Item'\`
* \`'MenuSection'\`
* \`'Section'\`
* \`'SectionHeading'\`
* \`'Separator'\`
* \`'SortableContext'\`
* \`'SortableGroup'\`
* \`'SortableItem'\`
* \`'Switcher'\`
* \`'Wordmark'\`

### API differences

For the most part these built-in types take exactly the same props as their component counterparts, however there are a few differences:

* All items must have an \`id\` property. This ID is used as the React \`key\`, and should be unique within the view so that reducers can accurately select individual items by ID. It is also used to uniquely identify the item for analytics click events.
* Rather than passing a \`children\` prop to container types, namely \`'Group'\`, \`'HeaderSection'\`, \`'MenuSection'\`, \`'Section'\`, \`'SortableGroup'\` and \`'SortableContext'\`, you should specify their descendants as an array with the \`items\` property. Any item with an \`items\` property will be walked by reducers.
* The Section components take an optional \`nestedGroupKey\` prop to be used as the key of the
element to allow sections across multiple views to share the same key for nested
transitions. If not supplied, the id of the sections must match between views where you want
a nested transition to occur.
* The \`'Item'\` type is actually the \`'ConnectedItem'\` UI component instead of the basic \`'Item'\` component. It therefore accepts a special \`goTo\` property, which should be a view ID. When an \`'Item'\` with a \`goTo\` is clicked, that view will be activated. It will also render a right-arrow icon when hovered, or a loading spinner when its \`goTo\` property matches the incoming view ID.
* The \`'GroupHeading'\` and \`'SectionHeading'\` types accept a \`text\` property instead of \`children\`.
* The \`'InlineComponent'\` type does not have a corresponding UI component. It takes a \`component\` prop that will render the component passed to it, with all remaining props in the type passed to it. The \`'id'\` prop is still mandatory.

### Exported flow types

We export a corresponding flow type for each built-in view item type as well as a combined type, \`NavigationRendererItemType\` that can be used to explicitly type the view items array in your code, e.g. the return type of your \`getItems\` functions.

The \`NavigationRendererItemType\` is a parameterised type that takes an optional type argument that specified any custom component types, i.e. types passed into the \`customComponents\` prop of \`ItemsRenderer\` or \`LayoutManagerWithViewController\`.

For example,

${code`
  // @flow
  import type { NavigationRendererItemType } from '@atlaskit/navigation-next';

  // Note that you still need to use the <> prefix even when not using any custom components
  const itemsWithoutCustomComponents: NavigationRendererItemType<> = [...];

  type CustomComponentType = { type: 'Foo', id: string, foo: boolean } | { type: 'Bar', id: string, bar: boolean };

  const itemsWithCustomComponents: NavigationRendererItemType<CustomComponentType> = [...];
`}

When typing custom components, you must adhere to the same rules as built-in view item types and specify \`type\` and \`id\` props.

Unfortunately, inline component types cannot be typechecked individually like custom component types since they share the same \`type\` property of \`'InlineComponent'\`.

${<Hr />}

${<H>Reducer utility functions</H>}

The library exposes a number of utility functions for composing a reducer.

${code`import { viewReducerUtils } from '@atlaskit/navigation-next';`}

The lowest-level function that we provide is the \`walkView\` function. It has the following signature:

${code`type WalkView = Selector => Modifier => View => View;`}

The function will recursively walk a view. It will run the Selector function over each item in the view. If the Selector returns true, it will apply the Modifier function to that item, and replace it with the result. As such, it can take an array of view items and return a new set of items.

The library also provides some pre-composed selector functions, along with some common modifiers.

### Selectors

Selectors are higher-order wrappers around the \`walkView\` function which abstract common item selection logic.

${(
    <table>
      <thead>
        <tr>
          <td>
            <strong>Function</strong>
          </td>
          <td>
            <strong>Signature</strong>
          </td>
          <td>
            <strong>Description</strong>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>findId</td>
          <td>
            <code>{`string => Modifier => View => View`}</code>
          </td>
          <td>
            Select the item in the view with the given <code>id</code>.
          </td>
        </tr>
        <tr>
          <td>matchId</td>
          <td>
            <code>{`RegExp => Modifier => View => View`}</code>
          </td>
          <td>
            Select the items in the view with <code>id</code>s that match the
            given regular expression.
          </td>
        </tr>
        <tr>
          <td>findLegacyId</td>
          <td>
            <code>{`string => Modifier => View => View`}</code>
          </td>
          <td>
            Select the item in the view with the given <code>legacyId</code>.
          </td>
        </tr>
        <tr>
          <td>matchLegacyId</td>
          <td>
            <code>{`RegExp => Modifier => View => View`}</code>
          </td>
          <td>
            Select the items in the view with <code>legacyId</code>s that match
            the given regular expression.
          </td>
        </tr>
      </tbody>
    </table>
  )}

Example usage:

${code`import { viewReducerUtils } from '@atlaskit/navigation-next';

const { findId } = viewReducerUtils;

const myReducer = viewData => {
  const modifyIcon = item => ({ ...item, before: NewIcon });
  return findId('my-item')(modifyIcon)(viewData);
};`}

### Modifiers

Modifiers are functions which can be configured to perform a common kind of modification to an item.

${(
    <table>
      <thead>
        <tr>
          <td>
            <strong>Function</strong>
          </td>
          <td>
            <strong>Signature</strong>
          </td>
          <td>
            <strong>Description</strong>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>removeItem</td>
          <td>
            <code>{`Item => null`}</code>
          </td>
          <td>Remove the selected item from the view.</td>
        </tr>
        <tr>
          <td>insertBefore</td>
          <td>
            <code>{`Item[] => Item => Item[]`}</code>
          </td>
          <td>Insert the given array of items before the selected item.</td>
        </tr>
        <tr>
          <td>insertAfter</td>
          <td>
            <code>{`Item[] => Item => Item[]`}</code>
          </td>
          <td>Insert the given array of items after the selected item.</td>
        </tr>
        <tr>
          <td>prependChildren</td>
          <td>
            <code>{`Item[] => Item => Item`}</code>
          </td>
          <td>
            Insert the given array of items at the start of the selected{' '}
            {`item's`} <code>items</code> property.
          </td>
        </tr>
        <tr>
          <td>appendChildren</td>
          <td>
            <code>{`Item[] => Item => Item`}</code>
          </td>
          <td>
            Insert the given array of items at the end of the selected{' '}
            {`item's`} <code>items</code> property.
          </td>
        </tr>
      </tbody>
    </table>
  )}

Example usage:

${code`import { viewReducerUtils } from '@atlaskit/navigation-next';

const { appendChildren } = viewReducerUtils;

const myReducer = viewData => {
  const appendCrossSellLink = appendChildren([
    {
      type: 'Item',
      text: 'Try Confluence!',
      href: 'https://www.atlassian.com/software/confluence',
      id: 'try-confluence',
    },
  ]);
  return findId('menu-section')(appendCrossSellLink)(viewData);
};`}
`}</ContentsProvider>
);
