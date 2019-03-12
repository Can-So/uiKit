// @flow
import React from 'react';
import { shallow, mount } from 'enzyme';
import IconLabel from '../../components/IconLabel';
import { DetailsLabelIcon, DetailsLabelText } from '../../styled/Card';

describe('Profilecard', () => {
  describe('IconLabel', () => {
    it('should render no label when not children are present', () => {
      const wrapper = shallow(<IconLabel />);
      expect(wrapper.text()).toBe('');
    });

    it('should render LabelIcon without icon when icon property is not set', () => {
      const wrapper = mount(<IconLabel>Labeltext</IconLabel>);
      expect(wrapper.length).toBeGreaterThan(0);
      expect(wrapper.find(DetailsLabelText).text()).toBe('Labeltext');

      const icon = wrapper.find(DetailsLabelIcon);
      expect(icon.find('Icon')).toHaveLength(0);
    });

    it('should render LabelIcon without icon when icon property is an unavailable icon', () => {
      const wrapper = mount(<IconLabel icon="foobar">Labeltext</IconLabel>);
      expect(wrapper.length).toBeGreaterThan(0);
      expect(wrapper.find(DetailsLabelText).text()).toBe('Labeltext');

      const icon = wrapper.find(DetailsLabelIcon);
      expect(icon.find('Icon')).toHaveLength(0);
    });

    describe('should render LabelIcon with valid icons', () => {
      const validIcons = ['location', 'time', 'mention', 'email'];

      validIcons.forEach(label => {
        it(`should render LabelIcon for ${label}`, () => {
          const wrapper = mount(<IconLabel icon={label}>Labeltext</IconLabel>);
          expect(wrapper.length).toBeGreaterThan(0);
          expect(wrapper.find(DetailsLabelText).text()).toBe('Labeltext');

          const icon = wrapper.find(DetailsLabelIcon);
          expect(icon.find('Icon')).toHaveLength(1);
        });
      });
    });
  });
});
