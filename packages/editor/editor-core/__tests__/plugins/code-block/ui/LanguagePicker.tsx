import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import Select from '@atlaskit/single-select';
import { TrashToolbarButton } from '../../../../src/plugins/code-block/ui/LanguagePicker/styles';
import LanguagePickerWithOutsideListeners, {
  LanguagePicker,
} from '../../../../src/plugins/code-block/ui/LanguagePicker';

describe('@atlaskit/editor-core/ui/LanguagePicker', () => {
  let languagePicker: ReactWrapper<any, any>;
  let setLanguageStub, deleteCodeBlockStub;

  beforeEach(() => {
    setLanguageStub = jest.fn();
    deleteCodeBlockStub = jest.fn();
    languagePicker = mount(
      <LanguagePicker
        activeCodeBlockDOM={document.body}
        deleteCodeBlock={deleteCodeBlockStub}
        setLanguage={setLanguageStub}
      />,
    );
  });

  afterEach(() => {
    languagePicker.unmount();
  });

  describe('#shouldComponentUpdate', () => {
    it('should not re-render if setLanguage prop changes', () => {
      const renderSpy = jest.spyOn(languagePicker.instance(), 'render');
      languagePicker.setProps({ setLanguage: () => {} });
      expect(renderSpy).toHaveBeenCalledTimes(0);
    });

    it('should not re-render if deleteCodeBlock prop changes', () => {
      const renderSpy = jest.spyOn(languagePicker.instance(), 'render');
      languagePicker.setProps({ deleteCodeBlock: () => {} });
      expect(renderSpy).toHaveBeenCalledTimes(0);
    });

    it('should re-render if activeLanguage prop changes', () => {
      const renderSpy = jest.spyOn(languagePicker.instance(), 'render');
      languagePicker.setProps({ activeLanguage: 'javascript' });
      expect(renderSpy).toHaveBeenCalledTimes(1);
    });

    it('should re-render if activeCodeBlockDOM prop changes', () => {
      const renderSpy = jest.spyOn(languagePicker.instance(), 'render');
      languagePicker.setProps({ activeCodeBlockDOM: undefined as any });
      expect(renderSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('#render', () => {
    it('should call deleteCodeBlock when trash icon clicked', () => {
      expect(deleteCodeBlockStub).toHaveBeenCalledTimes(0);
      languagePicker.find(TrashToolbarButton).simulate('click');
      expect(deleteCodeBlockStub).toHaveBeenCalledTimes(1);
    });

    it('should show active language by default in select', () => {
      languagePicker.setProps({ activeLanguage: 'javascript' });
      const defaultSelected = languagePicker
        .find(Select)
        .prop('defaultSelected');
      expect(defaultSelected).toEqual({
        content: 'JavaScript',
        value: 'javascript',
      });
    });

    it('should call setLanguage when dropdown item selected', () => {
      expect(setLanguageStub).toHaveBeenCalledTimes(0);
      (languagePicker.find(Select).instance() as any).selectItem({
        content: 'Javascript',
        value: 'javascript',
      });
      expect(setLanguageStub).toHaveBeenCalledTimes(1);
      expect(setLanguageStub).toHaveBeenCalledWith('javascript');
    });
  });
});

describe('@atlaskit/editor-core/ui/LanguagePickerWithOutsideListeners', () => {
  let wrapper: ReactWrapper;
  let instance: LanguagePickerWithOutsideListeners;
  const getElementInsideToolbar = () =>
    wrapper
      .find(LanguagePicker)
      .getDOMNode()
      .querySelector('[placeholder="Select language"]') as HTMLElement;
  beforeEach(() => {
    wrapper = mount(
      <LanguagePickerWithOutsideListeners
        activeCodeBlockDOM={document.body}
        deleteCodeBlock={jest.fn()}
        setLanguage={jest.fn()}
        isEditorFocused={true}
      />,
    );
    instance = wrapper.instance() as LanguagePickerWithOutsideListeners;
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should show the toolber when the editor is focused', () => {
    wrapper.setProps({ isEditorFocused: true });
    expect(wrapper.find(LanguagePicker).exists()).toBe(true);
  });

  it('should not show the toolbar when the editor has lost focus', () => {
    wrapper.setProps({ isEditorFocused: false });
    expect(wrapper.find(LanguagePicker).exists()).toBe(false);
  });

  it('should keep showing the toolbar if toolbar clicked before editor has lost focus', () => {
    // invoke click handler directly since enzyme & EventListeners don't play nice
    instance.handleClick({ target: getElementInsideToolbar() } as any);
    wrapper.setProps({ isEditorFocused: false });
    expect(wrapper.find(LanguagePicker).exists()).toBe(true);
  });

  it('should hide toolbar if user clicks outside when `isToolbarFocused` is true', () => {
    wrapper.setState({ isToolbarFocused: true });
    wrapper.setProps({ isEditorFocused: false });
    instance.handleClick({ target: document.head } as any);
    wrapper.update();
    expect(wrapper.find(LanguagePicker).exists()).toBe(false);
  });
});
