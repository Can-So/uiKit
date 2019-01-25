// @flow
import React from 'react';
import styled from 'styled-components';

import { AkProfilecardTrigger } from '../src';
import { getMockProfileClient } from './helper/util';
import LocaleIntlProvider from './helper/locale-intl-provider';

const mockClient = getMockProfileClient(10, 0);
const mockClientForInactiveAccount = getMockProfileClient(10, 0, {
  status: 'inactive',
});
const mockClientForClosedAccountAndCustomMessage = getMockProfileClient(10, 0, {
  status: 'closed',
  disabledAccountMessage:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
  hasDisabledAccountLozenge: false,
});

export const MainStage = styled.div`
  margin: 16px;
`;

export const Section = styled.div`
  margin: 16px 0;

  h4 {
    margin: 8px 0;
  }
`;

export default function Example() {
  return (
    <LocaleIntlProvider>
      <MainStage>
        <Section>
          <h4>Profilecard triggered by hover</h4>
          <div>
            Lorem ipsum{' '}
            <AkProfilecardTrigger
              cloudId="DUMMY-10ae0bf3-157e-43f7-be45-f1bb13b39048"
              userId="1"
              position="bottom left"
              resourceClient={mockClient}
              actions={[
                {
                  label: 'View profile',
                  id: 'view-profile',
                  callback: () => {},
                },
              ]}
            >
              <strong>hover over me</strong>
            </AkProfilecardTrigger>{' '}
            dolor sit amet
          </div>
        </Section>
        <Section>
          <h4>Profilecard triggered by click</h4>
          <div>
            Lorem ipsum{' '}
            <AkProfilecardTrigger
              cloudId="DUMMY-10ae0bf3-157e-43f7-be45-f1bb13b39048"
              userId="1"
              position="bottom left"
              resourceClient={mockClient}
              trigger="click"
              actions={[
                {
                  label: 'View profile',
                  id: 'view-profile',
                  callback: () => {},
                },
              ]}
            >
              <strong>click me</strong>
            </AkProfilecardTrigger>{' '}
            dolor sit amet
          </div>
        </Section>

        <Section>
          <h4>Profilecard triggered for closed account</h4>
          <div>
            Lorem ipsum{' '}
            <AkProfilecardTrigger
              cloudId="DUMMY-10ae0bf3-157e-43f7-be45-f1bb13b39048"
              userId="1"
              position="bottom left"
              resourceClient={getMockProfileClient(10, 0, {
                status: 'closed',
              })}
              trigger="click"
            >
              <strong>click me</strong>
            </AkProfilecardTrigger>{' '}
            dolor sit amet
          </div>
        </Section>

        <Section>
          <h4>Profilecard triggered for inactive account</h4>
          <div>
            Lorem ipsum{' '}
            <AkProfilecardTrigger
              cloudId="DUMMY-10ae0bf3-157e-43f7-be45-f1bb13b39048"
              userId="1"
              position="bottom left"
              resourceClient={mockClientForInactiveAccount}
              trigger="click"
            >
              <strong>click me</strong>
            </AkProfilecardTrigger>{' '}
            dolor sit amet
          </div>
        </Section>

        <Section>
          <h4>
            Profilecard triggered for closed account and custom message and not
            show status lozenge
          </h4>
          <div>
            Lorem ipsum{' '}
            <AkProfilecardTrigger
              cloudId="DUMMY-10ae0bf3-157e-43f7-be45-f1bb13b39048"
              userId="1"
              position="bottom left"
              resourceClient={mockClientForClosedAccountAndCustomMessage}
              trigger="click"
            >
              <strong>click me</strong>
            </AkProfilecardTrigger>{' '}
            dolor sit amet
          </div>
        </Section>
      </MainStage>
    </LocaleIntlProvider>
  );
}
