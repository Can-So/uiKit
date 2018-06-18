import * as React from 'react';
import Select from '@atlaskit/select';
import RemoveIcon from '@atlaskit/icon/glyph/editor/remove';
import Separator from '../../../../ui/Separator';
import { TrashToolbarButton, FloatingToolbar } from './styles';
import {
  createLanguageList,
  DEFAULT_LANGUAGES,
  getLanguageIdentifier,
} from '@atlaskit/editor-common';

const LANGUAGE_LIST_ITEMS = createLanguageList(DEFAULT_LANGUAGES).map(lang => ({
  label: lang.name,
  value: getLanguageIdentifier(lang),
}));

export interface Props {
  activeCodeBlockDOM: HTMLElement;
  activeLanguage?: string;
  setLanguage: (language: string) => void;
  deleteCodeBlock: () => void;
  innerRef?: (node?: HTMLElement) => void;

  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
}

export class LanguagePicker extends React.Component<Props> {
  private prevActiveCodeBlockWidth: { height: number; width: number };
  constructor(props: Props) {
    super(props);
    const {
      clientHeight: height,
      clientWidth: width,
    } = props.activeCodeBlockDOM;
    this.prevActiveCodeBlockWidth = { height, width };
  }

  shouldComponentUpdate(nextProps: Props) {
    if (nextProps.activeLanguage !== this.props.activeLanguage) {
      return true;
    }
    if (nextProps.activeCodeBlockDOM !== this.props.activeCodeBlockDOM) {
      return true;
    }
    if (
      this.prevActiveCodeBlockWidth.height !==
        nextProps.activeCodeBlockDOM.clientHeight ||
      this.prevActiveCodeBlockWidth.width !==
        nextProps.activeCodeBlockDOM.clientWidth
    ) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    const {
      clientHeight: height,
      clientWidth: width,
    } = this.props.activeCodeBlockDOM;
    this.prevActiveCodeBlockWidth = {
      height,
      width,
    };
  }

  handleLanguageSelected = ({ value }) => {
    this.props.setLanguage(value);
  };

  handleCodeBlockDelete = () => {
    this.props.deleteCodeBlock();
  };

  render() {
    const {
      innerRef,
      popupsMountPoint,
      popupsBoundariesElement,
      activeCodeBlockDOM,
      activeLanguage,
    } = this.props;

    const defaultLanguage =
      LANGUAGE_LIST_ITEMS.find(lang => lang.value === activeLanguage) || null;

    return (
      <FloatingToolbar
        containerRef={innerRef}
        target={activeCodeBlockDOM}
        offset={[0, 12]}
        popupsMountPoint={popupsMountPoint}
        popupsBoundariesElement={popupsBoundariesElement}
      >
        <div style={{ width: '200px' }}>
          <Select
            options={LANGUAGE_LIST_ITEMS}
            value={defaultLanguage}
            onChange={this.handleLanguageSelected}
            placeholder="Select language"
          />
        </div>
        <Separator />
        <TrashToolbarButton
          onClick={this.handleCodeBlockDelete}
          title="Remove code block"
          iconBefore={<RemoveIcon label="Remove code block" />}
        />
      </FloatingToolbar>
    );
  }
}

export default class LanguagePickerWithOutsideListeners extends React.PureComponent<
  Props & { isEditorFocused: boolean },
  { isToolbarFocused: boolean }
> {
  state = { isToolbarFocused: false };
  toolbar?: HTMLElement;

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick);
  }

  setToolbarRef = (node?: HTMLElement) => {
    this.toolbar = node;
  };

  handleClick = (event: MouseEvent) => {
    const wasToolbarClicked =
      !!this.toolbar && this.toolbar.contains(event.target as Node);
    if (wasToolbarClicked !== this.state.isToolbarFocused) {
      this.setState({ isToolbarFocused: wasToolbarClicked });
    }
  };

  render() {
    const { isEditorFocused, ...rest } = this.props;
    if (isEditorFocused || this.state.isToolbarFocused) {
      return <LanguagePicker {...rest} innerRef={this.setToolbarRef} />;
    }
    return null;
  }
}
