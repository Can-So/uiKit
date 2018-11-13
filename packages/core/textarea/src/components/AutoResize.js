// @flow
import { Component, type ElementRef, type Node } from 'react';
import memoizeOne from 'memoize-one';

type Props = {
  /** The value of the text-area. */
  value: string | number,
  children: (height: number, getTextAreaRef: (ElementRef<*>) => void) => Node,
};

const hiddenTextArea = document.createElement('textarea');
hiddenTextArea.disabled = true;
let refCount = 0;

export default class AutoResize extends Component<Props> {
  textArea: ElementRef<*>;

  constructor(props: Props) {
    super(props);
    this.getNewHeight = memoizeOne(this.getNewHeight);
  }

  componentDidMount() {
    if (refCount === 0 && document.body) {
      document.body.appendChild(hiddenTextArea);
    }
    refCount++;
  }

  componentWillUnmount() {
    refCount--;
    if (refCount === 0 && document.body) {
      document.body.removeChild(hiddenTextArea);
    }
  }

  getNewHeight = (value: string | number) => {
    let newHeight = 0;

    if (this.textArea) {
      hiddenTextArea.style.cssText = window.getComputedStyle(
        this.textArea,
      ).cssText;
      hiddenTextArea.style.visibility = 'hidden';
      hiddenTextArea.value = String(value);
      hiddenTextArea.style.height = '0';
      newHeight = hiddenTextArea.scrollHeight;
    }

    return newHeight;
  };

  getTextAreaRef = (ref: ElementRef<*>) => {
    this.textArea = ref;
  };

  render() {
    const height = this.getNewHeight(this.props.value);
    return this.props.children(height, this.getTextAreaRef);
  }
}
