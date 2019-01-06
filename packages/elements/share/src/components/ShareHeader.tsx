import { FormHeader } from '@atlaskit/form';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from '../i18n';

type Props = {
  title?: string;
};

export const ShareHeader = ({ title }: Props) => (
  <FormHeader
    title={
      title === undefined ? <FormattedMessage {...messages.formTitle} /> : title
    }
  />
);
