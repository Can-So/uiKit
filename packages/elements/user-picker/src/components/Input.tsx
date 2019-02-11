import { components } from '@atlaskit/select';
import * as React from 'react';

type Props = {
  selectProps: { disableInput?: boolean };
  innerRef: (ref: HTMLInputElement) => void;
};

export class Input extends React.PureComponent<Props> {
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
    return <components.Input {...this.props} disabled={this.props.selectProps.disableInput} innerRef={this.handleInnerRef} />;
  }
}
