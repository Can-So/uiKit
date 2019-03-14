import * as React from 'react';
import { Input } from './Input';

export type Props = {
  selectProps: { disableInput?: boolean };
  innerRef: (ref: HTMLInputElement) => void;
};

export class PopupInput extends React.Component<Props> {
  private ref: HTMLInputElement | null = null;

  componentDidMount() {
    if (this.ref) {
      this.ref.select();
    }
  }

  private handleInnerRef = (ref: HTMLInputElement) => {
    this.ref = ref;
    if (this.props.innerRef) {
      this.props.innerRef(ref);
    }
  };

  render() {
    return <Input {...this.props} innerRef={this.handleInnerRef} />;
  }
}
