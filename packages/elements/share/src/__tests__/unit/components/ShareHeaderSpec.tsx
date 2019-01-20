import { FormHeader } from '@atlaskit/form';
import { shallow } from 'enzyme';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { ShareHeader } from '../../../components/ShareHeader';
import { messages } from '../../../i18n';

describe('ShareHeader', () => {
  it('should render FormHeader with default title', () => {
    const component = shallow(<ShareHeader />);

    const formHeader = component.find(FormHeader);
    expect(formHeader).toHaveLength(1);
    expect(formHeader.prop('title')).toEqual(
      <FormattedMessage {...messages.formTitle} />,
    );
  });

  it('should render FormHeader with overridden title', () => {
    const component = shallow(<ShareHeader title="custom title" />);

    const formHeader = component.find(FormHeader);
    expect(formHeader).toHaveLength(1);
    expect(formHeader.prop('title')).toEqual('custom title');
  });
});
