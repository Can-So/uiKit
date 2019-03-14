jest.mock('../../../components/styles', () => ({
  getPopupStyles: jest.fn(),
}));

jest.mock('../../../components/components', () => ({
  getPopupComponents: jest.fn(),
}));

jest.mock('../../../components/popup', () => ({
  getPopupProps: jest.fn(),
}));

import * as React from 'react';
import { PopupSelect } from '@atlaskit/select';
import { shallowWithIntl } from 'enzyme-react-intl';
import { getPopupStyles } from '../../../components/styles';
import { PopupUserPicker } from '../../../components/PopupUserPicker';
import { UserPickerProps } from '../../../types';
import { getPopupComponents } from '../../../components/components';
import { getPopupProps } from '../../../components/popup';

describe('UserPicker', () => {
  const shallowPopupUserPicker = (props: Partial<UserPickerProps> = {}) =>
    shallowWithIntl(<PopupUserPicker {...props} target={jest.fn()} />)
      .dive()
      .dive()
      .dive();

  afterEach(() => {
    (getPopupProps as jest.Mock).mockClear();
  });

  describe('PopupUserPicker', () => {
    it('should use PopupSelect', () => {
      const component = shallowPopupUserPicker();
      const select = component.find(PopupSelect);
      expect(select).toHaveLength(1);
      expect(getPopupStyles).toHaveBeenCalledWith(300, false);
    });

    it('should set width', () => {
      shallowPopupUserPicker({ width: 500 });
      expect(getPopupStyles).toHaveBeenCalledWith(500, false);
    });

    it('should call getPopupComponents', () => {
      shallowPopupUserPicker();
      expect(getPopupComponents).toHaveBeenCalled();
    });

    it('should pass popup props as pickerProps', () => {
      const component = shallowPopupUserPicker();
      expect(getPopupProps).toHaveBeenCalledTimes(1);
      expect(component.prop('pickerProps')).toEqual(
        getPopupProps(300, expect.any(Function), expect.any(Function)),
      );
    });
  });
});
