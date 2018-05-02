// @flow

import React, { Component } from 'react';
import ArrowLeftIcon from '@atlaskit/icon/glyph/arrow-left';
import ArrowRightIcon from '@atlaskit/icon/glyph/arrow-right';
import { colors } from '@atlaskit/theme';

import {
  Item,
  Section,
  ScrollableSectionInner,
  SectionSeparator,
  SectionTitle,
} from '../src';

const Container = props => (
  <div
    css={{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    }}
    {...props}
  />
);
const VariationWrapper = props => (
  <div css={{ margin: '0 24px 24px 0' }} {...props} />
);
const NestedSectionWrapper = props => (
  <div
    css={{
      backgroundColor: colors.N20,
      marginTop: '8px',
      overflow: 'hidden',
      position: 'relative',
      width: '270px',
    }}
    {...props}
  />
);
const ScrollableSectionWrapper = props => (
  <div
    css={{
      backgroundColor: colors.N20,
      display: 'flex',
      flexDirection: 'column',
      height: '300px',
      marginTop: '8px',
      width: '270px',
    }}
    {...props}
  />
);

const nestedLevels = [
  {
    id: 'nested-level-1',
    title: 'Level 1',
    items: [{ text: 'Next level', after: ArrowRightIcon, goTo: 1 }],
  },
  {
    parentId: 'nested-level-1',
    id: 'nested-level-2',
    title: 'Level 2',
    items: [
      { text: 'Back', before: ArrowLeftIcon, goTo: 0 },
      { text: 'Go deeper!', goTo: 2, after: ArrowRightIcon },
    ],
  },
  {
    parentId: 'nested-level-2',
    id: 'nested-level-3',
    title: 'Level 3',
    items: [{ text: 'Back', goTo: 1, before: ArrowLeftIcon }],
  },
];

class NestedSection extends Component<{}, { activeLevel: number }> {
  state = {
    activeLevel: 0,
  };

  render() {
    const { title, items, ...sectionProps } = nestedLevels[
      this.state.activeLevel
    ];

    return (
      <NestedSectionWrapper>
        <Section key="nested-section" {...sectionProps}>
          {({ css }) => (
            <div css={{ ...css, paddingBottom: '16px' }}>
              <SectionTitle>{title}</SectionTitle>
              {items.map(({ goTo, ...itemProps }) => (
                <Item
                  key={itemProps.text}
                  onClick={() => this.setState({ activeLevel: goTo })}
                  {...itemProps}
                />
              ))}
              <SectionSeparator />
            </div>
          )}
        </Section>
      </NestedSectionWrapper>
    );
  }
}

const scrollingItems = [
  { text: 'Item 1' },
  { text: 'Item 2' },
  { text: 'Item 3' },
  { text: 'Item 4' },
  { text: 'Item 5' },
  { text: 'Item 6' },
  { text: 'Item 7' },
  { text: 'Item 8' },
  { text: 'Item 9' },
  { text: 'Item 10' },
  { text: 'Item 11' },
  { text: 'Item 12' },
  { text: 'Item 13' },
  { text: 'Item 14' },
  { text: 'Item 15' },
];

export default () => (
  <Container>
    <VariationWrapper>
      <h3>Nested section</h3>
      <NestedSection />
    </VariationWrapper>
    <VariationWrapper>
      <h3>Scroll hint section</h3>
      <ScrollableSectionWrapper>
        <Section key="scroll-hint-section">
          {({ css }) => (
            <ScrollableSectionInner
              styles={styles => ({
                ...styles,
                inner: {
                  ...styles.inner,
                  ...css,
                  paddingBottom: `16px`,
                },
              })}
            >
              <SectionTitle>Section title</SectionTitle>
              {scrollingItems.map(itemProps => (
                <Item key={itemProps.text} {...itemProps} />
              ))}
              <SectionSeparator />
            </ScrollableSectionInner>
          )}
        </Section>
      </ScrollableSectionWrapper>
    </VariationWrapper>
  </Container>
);
