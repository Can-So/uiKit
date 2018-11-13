// @flow
/* eslint-disable no-unused-vars */ // Using while dev mode TODO: remove on release
import React from 'react';
import { shallow, mount } from 'enzyme';
import FieldText from '@atlaskit/field-text';
import Form, {
  FormHeader,
  FormSection,
  Field,
  FieldGroup,
  Validator,
} from '../..';

import { FormSectionContent } from '../../styled/FormSection';

// TODO: Add tests to cover all components

// Form

// FormHeader

// FormSection
describe('FormSection', () => {
  describe('Form section content', () => {
    const defaultProps = {
      children: [<div />, null, undefined, <div />],
    };

    it('should instantiate', () => {
      const wrapper = shallow(<FormSection {...defaultProps} />);
      expect(wrapper.exists()).toBe(true);
    });

    it('should render only valid child elements', () => {
      const wrapper = shallow(<FormSection {...defaultProps} />);
      const formSectionContent = wrapper.find(FormSectionContent);
      expect(formSectionContent.exists()).toBe(true);
      expect(formSectionContent.children().length).toBe(2);
    });
  });
});

// Field
describe('Field', () => {
  describe('isInvalid prop', () => {
    it('should reflect its value to FieldText', () => {
      expect(
        shallow(
          <Field label="" isInvalid>
            <FieldText label="" />
          </Field>,
        )
          .find(FieldText)
          .props().isInvalid,
      ).toBe(true);
    });
  });
  // FieldGroup

  // Validator
});
