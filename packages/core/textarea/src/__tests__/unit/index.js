// @flow
import React from 'react';
import { shallow, mount } from 'enzyme';

import FieldTextArea from '../..';
import TextAreaWithAnalytics, {
  TextAreaWithoutAnalytics as TextArea,
} from '../../components/TextArea';

import { TextAreaWrapper } from '../../styled';

describe('FieldTextAreaStateless', () => {
  // Stub window.cancelAnimationFrame, so Popper (used in Layer) doesn't error when accessing it.
  const animStub = window.cancelAnimationFrame;
  beforeEach(() => {
    window.cancelAnimationFrame = () => {};
  });

  afterEach(() => {
    window.cancelAnimationFrame = animStub;
  });

  describe('isReadOnly prop', () => {
    describe('set to true', () => {
      it('should sets its value on the input', () => {
        expect(
          mount(<TextArea onChange={() => {}} isReadOnly />)
            .find('textarea')
            .props().readOnly,
        ).toBe(true);
      });

      it('should reflect its value to the TextAreaWrapper', () => {
        expect(
          mount(<FieldTextArea onChange={() => {}} isReadOnly label="" />)
            .find(TextAreaWrapper)
            .props().isReadOnly,
        ).toBe(true);
      });
    });

    describe('set to false', () => {
      it('should sets its value on the input', () => {
        expect(
          mount(<TextArea onChange={() => {}} label="" />)
            .find('textarea')
            .props().readOnly,
        ).toBe(false);
      });

      it('should reflect its value to the FieldBase', () => {
        expect(
          mount(<TextArea onChange={() => {}} label="" />)
            .find(TextAreaWrapper)
            .props().isReadOnly,
        ).toBe(false);
      });
    });
  });

  describe('required prop', () => {
    it('should sets its value on the input', () => {
      expect(
        mount(<TextArea onChange={() => {}} isRequired />)
          .find('textarea')
          .props().required,
      ).toBe(true);
    });
  });

  describe('isInvalid prop', () => {
    it.skip('should reflect its value to the FieldBase', () => {
      expect(
        shallow(<TextArea onChange={() => {}} isInvalid />)
          .find(TextAreaWrapper)
          .props().isInvalid,
      ).toBe(true);
    });
  });

  describe('spellCheck prop', () => {
    it('should render an input with a spellCheck prop', () => {
      expect(
        mount(<TextArea onChange={() => {}} spellCheck label="" />)
          .find('textarea')
          .props().spellCheck,
      ).toBe(true);
    });
  });

  describe('isMonospaced prop', () => {
    it('should render an input with an isMonospaced prop', () => {
      expect(
        mount(<TextArea onChange={() => {}} isMonospaced label="" />)
          .find(TextAreaWrapper)
          .props().isMonospaced,
      ).toBe(true);
    });
  });

  [
    { name: 'test' },
    { placeholder: 'test placeholder' },
    { maxlength: 5 },
  ].forEach(prop =>
    describe(JSON.stringify(prop), () =>
      it('TextArea should have attribute defined', () => {
        const key = Object.keys(prop)[0];
        // $FlowFixMe
        const value = prop[key];
        expect(
          mount(<TextArea onChange={() => {}} {...prop} />)
            .find('textarea')
            .prop(key),
        ).toBe(value);
      }),
    ),
  );

  it('TextArea should have value="something"', () =>
    expect(
      mount(<TextArea onChange={() => {}} value="something" />)
        .find('textarea')
        .prop('value'),
    ).toBe('something'));

  it('onChange should be called when input value changes', () => {
    const spy = jest.fn();
    const wrapper = mount(<TextArea onChange={spy} label="" />);
    wrapper.find('textarea').simulate('change');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe('TextArea', () => {
  it('should call onChange when input value changes', () => {
    const spy = jest.fn();
    const wrapper = mount(<TextArea onChange={spy} label="" />);
    wrapper.find('textarea').simulate('change');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe.skip('TextArea input focus', () => {
  it('should get focus when focus() is called', () => {
    let hasFocus = 0;
    const wrapper = mount(<TextArea onChange={() => {}} label="" />);
    wrapper.getDOMNode().addEventListener(
      'focus',
      () => {
        hasFocus = 1;
      },
      true,
    );
    wrapper.instance().focus();

    expect(hasFocus).toBe(1);
  });
});

describe('TextAreaWithAnalytics', () => {
  beforeEach(() => {
    jest.spyOn(global.console, 'warn');
    jest.spyOn(global.console, 'error');
  });
  afterEach(() => {
    global.console.warn.mockRestore();
    global.console.error.mockRestore();
  });

  it('should mount without errors', () => {
    mount(<TextAreaWithAnalytics onChange={() => {}} label="" />);
    /* eslint-disable no-console */
    expect(console.warn).not.toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();
    /* eslint-enable no-console */
  });
});
