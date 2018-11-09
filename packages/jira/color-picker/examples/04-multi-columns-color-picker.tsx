import * as React from 'react';
import ColorPicker from '../src';
import { simplePalette } from '../examples-helpers/constants';
import { colors } from '@atlaskit/theme';

class ColorPickerExample extends React.Component<{}, { color: string }> {
  state = {
    color: colors.P200,
  };

  render() {
    return (
      <ColorPicker
        palette={simplePalette}
        selectedColor={this.state.color}
        cols={3}
        onChange={newColor => this.setState({ color: newColor })}
      />
    );
  }
}

export default () => <ColorPickerExample />;
