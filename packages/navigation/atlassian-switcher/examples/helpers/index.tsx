import React, { Component } from 'react';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import {
  SwitcherWrapper,
  SwitcherItem,
  Section,
  ManageButton,
  Skeleton,
} from '../../src/primitives';
import MockProvider from './mock-provider';

class Switcher extends Component {
  render() {
    return (
      <MockProvider>
        {({ isLoading, data }) =>
          isLoading ? (
            <Skeleton />
          ) : (
            <SwitcherWrapper>
              <Section isAdmin title="First Section">
                <SwitcherItem icon={SettingsIcon}>
                  {`${data && data.data} First Item`}
                </SwitcherItem>
                <SwitcherItem>{`${data &&
                  data.data} Second Item`}</SwitcherItem>
                <SwitcherItem>{`${data && data.data} Third Item`}</SwitcherItem>
              </Section>
              <Section title="Second Section">
                <SwitcherItem>First Item</SwitcherItem>
                <SwitcherItem>Second Item</SwitcherItem>
                <SwitcherItem>Third Item</SwitcherItem>
              </Section>
              <Section title="Third Section">
                <SwitcherItem>First Item</SwitcherItem>
                <SwitcherItem>Second Item</SwitcherItem>
                <SwitcherItem>Third Item</SwitcherItem>
                <SwitcherItem>First Item</SwitcherItem>
                <SwitcherItem>Second Item</SwitcherItem>
                <SwitcherItem>Third Item</SwitcherItem>
                <SwitcherItem>First Item</SwitcherItem>
                <SwitcherItem>Second Item</SwitcherItem>
                <SwitcherItem>Third Item</SwitcherItem>
                <SwitcherItem>First Item</SwitcherItem>
                <SwitcherItem>Second Item</SwitcherItem>
                <SwitcherItem>Third Item</SwitcherItem>
              </Section>
              <ManageButton href="/some-href" />
            </SwitcherWrapper>
          )
        }
      </MockProvider>
    );
  }
}

export default Switcher;
