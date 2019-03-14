jest.mock('../../../components/styles', () => ({
  getStyles: jest.fn(),
}));

jest.mock('../../../components/creatable', () => ({
  getCreatableProps: jest.fn(),
}));

jest.mock('../../../components/components', () => ({
  getComponents: jest.fn(),
}));

import Select, { CreatableSelect } from '@atlaskit/select';
import { shallowWithIntl } from 'enzyme-react-intl';
import * as React from 'react';
import { getComponents } from '../../../components/components';
import { getCreatableProps } from '../../../components/creatable';
import { getStyles } from '../../../components/styles';
import { UserPicker } from '../../../components/UserPicker';
import { User, UserPickerProps } from '../../../types';

describe('UserPicker', () => {
  const shallowUserPicker = (props: Partial<UserPickerProps> = {}) =>
    shallowWithIntl(<UserPicker {...props} />)
      .dive()
      .dive()
      .dive();

  const options: User[] = [
    {
      id: 'abc-123',
      name: 'Jace Beleren',
      publicName: 'jbeleren',
    },
    {
      id: '123-abc',
      name: 'Chandra Nalaar',
      publicName: 'cnalaar',
    },
  ];

  afterEach(() => {
    (getCreatableProps as jest.Mock).mockClear();
  });

  describe('default picker', () => {
    it('should render Select by default', () => {
      const component = shallowUserPicker({ options });
      const select = component.find(Select);
      expect(select).toHaveLength(1);
      expect(getStyles).toHaveBeenCalledWith(350);
    });

    it('should set width', () => {
      shallowUserPicker({ width: 500 });
      expect(getStyles).toHaveBeenCalledWith(500);
    });

    it('should call getComponents with false if single picker', () => {
      shallowUserPicker({ isMulti: false });
      expect(getComponents).toHaveBeenCalledWith(false, undefined);
    });

    it('should call getComponents with true if multi picker', () => {
      shallowUserPicker({ isMulti: true });
      expect(getComponents).toHaveBeenCalledWith(true, undefined);
    });
  });

  describe('allowEmail', () => {
    it('should use CreatableSelect', () => {
      const component = shallowUserPicker({ allowEmail: true });
      const select = component.find(CreatableSelect);
      expect(select).toHaveLength(1);
      expect(getCreatableProps).toHaveBeenCalledTimes(1);
      expect(getCreatableProps).toHaveBeenCalledWith(undefined);
    });

    it('should pass creatable props as pickerProps', () => {
      const component = shallowUserPicker({ allowEmail: true });
      expect(getCreatableProps).toHaveBeenCalledTimes(1);
      expect(component.prop('pickerProps')).toEqual(getCreatableProps());
    });
  });
});
