// @flow

import React, {
  PureComponent,
  type ComponentType,
  type ElementConfig,
  type Node,
} from 'react';
import { gridSize as gridSizeFn } from '@atlaskit/theme';

import { navigationItemClicked } from '../common/analytics';

import RenderBlocker from '../components/common/RenderBlocker';

import ContainerHeaderComponent from '../components/presentational/ContainerHeader';
import GroupComponent from '../components/presentational/Group';
import GroupHeadingComponent from '../components/presentational/GroupHeading';
import HeaderSectionComponent from '../components/presentational/HeaderSection';
import MenuSectionComponent from '../components/presentational/MenuSection';
import SectionComponent from '../components/presentational/Section';
import SectionHeadingComponent from '../components/presentational/SectionHeading';
import Separator from '../components/presentational/Separator';
import Switcher from '../components/presentational/Switcher';
import Wordmark from '../components/presentational/Wordmark';

import BackItem from '../components/connected/BackItem';
import ConnectedItem from '../components/connected/ConnectedItem';
import GoToItem from '../components/connected/GoToItem';
import SortableContextComponent from '../components/connected/SortableContext';
import SortableGroupComponent from '../components/connected/SortableGroup';
import SortableItem from '../components/connected/SortableItem';

import type {
  CustomComponents,
  GroupProps,
  GroupHeadingProps,
  HeaderSectionProps,
  ItemsRendererProps,
  MenuSectionProps,
  SectionHeadingProps,
  SectionProps,
  SortableContextProps,
  SortableGroupProps,
  ItemType,
} from './types';

const gridSize = gridSizeFn();

/**
 * ITEMS
 */

// Title
const GroupHeading = ({ text, ...props }: GroupHeadingProps): Node => (
  <GroupHeadingComponent {...props}>{text}</GroupHeadingComponent>
);

// SectionHeading
const SectionHeading = ({ text, ...props }: SectionHeadingProps): Node => (
  <SectionHeadingComponent {...props}>{text}</SectionHeadingComponent>
);

// ContainerHeader
const ContainerHeader = (
  props: ElementConfig<typeof ContainerHeaderComponent>,
): Node => (
  // -2px here to account for the extra space at the top of a MenuSection for
  // the scroll hint.
  <div css={{ paddingBottom: gridSize * 2.5 - 2 }}>
    <ContainerHeaderComponent {...props} />
  </div>
);

const Debug = (props: any) => (
  <pre
    css={{
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      fontSize: '10px',
      overflowX: 'auto',
      padding: `${gridSize / 2}px`,
    }}
  >
    {JSON.stringify(props, null, 2)}
  </pre>
);

/**
 * GROUPS
 */

// Group
const Group = ({
  customComponents,
  hasSeparator,
  heading,
  items,
  id,
}: GroupProps) =>
  items.length ? (
    <GroupComponent heading={heading} hasSeparator={hasSeparator} id={id}>
      <ItemsRenderer items={items} customComponents={customComponents} />
    </GroupComponent>
  ) : null;

const SortableGroup = ({
  customComponents,
  hasSeparator,
  heading,
  items,
  id,
}: SortableGroupProps) =>
  items && items.length ? (
    <SortableGroupComponent
      heading={heading}
      hasSeparator={hasSeparator}
      id={id}
    >
      <RenderBlocker items={items} customComponents={customComponents}>
        <ItemsRenderer items={items} customComponents={customComponents} />
      </RenderBlocker>
    </SortableGroupComponent>
  ) : null;

// Section
const Section = ({
  alwaysShowScrollHint = false,
  customComponents,
  id,
  items,
  nestedGroupKey,
  parentId,
  shouldGrow,
}: SectionProps) =>
  items.length ? (
    <SectionComponent
      alwaysShowScrollHint={alwaysShowScrollHint}
      id={id}
      key={nestedGroupKey}
      parentId={parentId}
      shouldGrow={shouldGrow}
    >
      {({ className }) => (
        <div className={className}>
          <ItemsRenderer items={items} customComponents={customComponents} />
        </div>
      )}
    </SectionComponent>
  ) : null;

const HeaderSection = ({
  customComponents,
  id,
  items,
  nestedGroupKey,
}: HeaderSectionProps) =>
  items.length ? (
    <HeaderSectionComponent id={id} key={nestedGroupKey}>
      {({ className }) => (
        <div className={className}>
          <ItemsRenderer items={items} customComponents={customComponents} />
        </div>
      )}
    </HeaderSectionComponent>
  ) : null;

const MenuSection = ({
  alwaysShowScrollHint,
  customComponents,
  id,
  items,
  nestedGroupKey,
  parentId,
}: MenuSectionProps) => (
  <MenuSectionComponent
    alwaysShowScrollHint={alwaysShowScrollHint}
    id={id}
    key={nestedGroupKey}
    parentId={parentId}
  >
    {({ className }) => (
      <div className={className}>
        <ItemsRenderer items={items} customComponents={customComponents} />
      </div>
    )}
  </MenuSectionComponent>
);

const SortableContext = ({
  customComponents,
  id,
  items,
  onDragStart,
  onDragUpdate,
  onDragEnd,
}: SortableContextProps) =>
  items && items.length ? (
    <SortableContextComponent
      id={id}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <ItemsRenderer items={items} customComponents={customComponents} />
    </SortableContextComponent>
  ) : null;

const itemComponents = {
  BackItem,
  ContainerHeader,
  Debug,
  GoToItem,
  GroupHeading,
  Item: ConnectedItem,
  SortableItem,
  SectionHeading,
  Separator,
  Switcher,
  Wordmark,
};

const renderItemComponents = (props: ItemType, key: string, index: number) => {
  let element = null;
  // We have to duplicate all code inside each if block for flow type refinement to work.
  // At this stage it's worth asking if we should typecast to any instead and opt-out of typechecking
  if (props.type === 'BackItem') {
    const { type, ...compProps } = props;
    element = <BackItem key={key} {...compProps} index={index} />;
  } else if (props.type === 'ContainerHeader') {
    const { type, ...compProps } = props;
    element = <ContainerHeader key={key} {...compProps} />;
  } else if (props.type === 'Debug') {
    const { type, ...compProps } = props;
    element = <Debug key={key} {...compProps} />;
  } else if (props.type === 'GoToItem') {
    // const goToItemProps: GoToItemType = ((props: any): GoToItemType);
    const { type, ...compProps } = props;
    element = <GoToItem key={key} {...compProps} index={index} />;
  } else if (props.type === 'Item') {
    const { type, ...compProps } = props;
    element = <ConnectedItem key={key} {...compProps} index={index} />;
  } else if (props.type === 'SortableItem') {
    const { type, ...compProps } = props;
    element = <SortableItem key={key} {...compProps} index={index} />;
  } else if (props.type === 'SectionHeading') {
    const { type, id, ...compProps } = props;
    element = <SectionHeading key={key} {...compProps} />;
  } else if (props.type === 'Separator') {
    const { type, id, ...compProps } = props;
    element = <Separator key={key} {...compProps} />;
  } else if (props.type === 'Switcher') {
    const { type, ...compProps } = props;
    element = <Switcher key={key} {...compProps} />;
  } else if (props.type === 'Wordmark') {
    const { type, id, ...compProps } = props;
    element = <Wordmark key={key} {...compProps} />;
  }

  return element;
};

const groupComponents = {
  Group,
  HeaderSection,
  MenuSection,
  Section,
  SortableContext,
  SortableGroup,
};

const renderGroupComponents = (
  props: ItemType,
  key: string,
  customComponents: CustomComponents,
) => {
  let element = null;
  // We have to duplicate all code inside each if block for flow type refinement to work.
  // At this stage it's worth asking if we should typecast to any instead and opt-out of typechecking
  if (props.type === 'Group') {
    const { type, ...compProps } = props;
    element = (
      <Group key={key} {...compProps} customComponents={customComponents} />
    );
  } else if (props.type === 'HeaderSection') {
    const { type, ...compProps } = props;
    element = (
      <HeaderSection
        key={key}
        {...compProps}
        customComponents={customComponents}
      />
    );
  } else if (props.type === 'MenuSection') {
    const { type, ...compProps } = props;
    element = (
      <MenuSection
        key={key}
        {...compProps}
        customComponents={customComponents}
      />
    );
  } else if (props.type === 'Section') {
    const { type, ...compProps } = props;
    element = (
      <Section key={key} {...compProps} customComponents={customComponents} />
    );
  } else if (props.type === 'SortableContext') {
    const { type, ...compProps } = props;
    element = (
      <SortableContext
        key={key}
        {...compProps}
        customComponents={customComponents}
      />
    );
  } else if (props.type === 'SortableGroup') {
    const { type, ...compProps } = props;
    element = (
      <SortableGroup
        key={key}
        {...compProps}
        customComponents={customComponents}
      />
    );
  }

  return element;
};

// Exported for testing purposes only.
export const components = { ...itemComponents, ...groupComponents };

/**
 * RENDERER
 */
class ItemsRenderer extends PureComponent<ItemsRendererProps> {
  customComponentsWithAnalytics: Map<
    string | ComponentType<*>,
    ComponentType<*>,
  > = new Map();

  getCustomComponent = (type: string | ComponentType<*>) => {
    // cache custom components wrapped with analytics
    // to prevent re-mounting of component on re-render
    const { customComponents = {} } = this.props;
    let component = this.customComponentsWithAnalytics.get(type);
    if (!component) {
      component =
        typeof type === 'string'
          ? navigationItemClicked(customComponents[type], type)
          : navigationItemClicked(
              type,
              type.displayName || 'inlineCustomComponent',
            );
      this.customComponentsWithAnalytics.set(type, component);
    }
    return component;
  };

  render() {
    const { customComponents = {}, items } = this.props;

    // We cannot destructure props.type otherwise flow type refinment does not work
    // https://github.com/facebook/flow/issues/5259
    return items.map((props, index) => {
      const key =
        typeof props.nestedGroupKey === 'string'
          ? props.nestedGroupKey
          : props.id;

      // If they've provided a component as the type
      if (typeof props.type === 'function') {
        const CustomComponent = this.getCustomComponent(props.type);
        return (
          <CustomComponent
            key={key}
            {...props}
            index={index}
            // We pass our in-built components through to custom components so
            // they can wrap/render them if they want to.
            components={components}
            customComponents={customComponents}
          />
        );
      }

      if (typeof props.type === 'string') {
        // If they've provided a type which matches one of our in-built group
        // components
        if (Object.keys(groupComponents).includes(props.type)) {
          renderGroupComponents(props, key, customComponents);
        }

        // If they've provided a type which matches one of our in-built item
        // components.
        if (Object.keys(itemComponents).includes(props.type)) {
          return renderItemComponents(props, key, index);
        }
        // if (itemComponents[props.type]) {
        //   const I = itemComponents[props.type];
        //   return <I key={key} {...props} index={index} />;
        // }

        // If they've provided a type which matches one of their defined custom
        // components.
        if (customComponents[props.type]) {
          const CustomComponent = this.getCustomComponent(props.type);
          return (
            <CustomComponent
              key={key}
              {...props}
              index={index}
              // We pass our in-built components through to custom components so
              // they can wrap/render them if they want to.
              components={components}
              customComponents={customComponents}
            />
          );
        }
      }

      return <Debug key={key} type={props.type} {...props} />;
    });
  }
}

export default ItemsRenderer;
