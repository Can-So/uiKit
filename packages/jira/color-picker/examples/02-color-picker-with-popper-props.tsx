import * as React from 'react';
import ColorPicker from '../src';
import { simplePalette } from '../mock-data';
import { colors } from '@atlaskit/theme';

class ColorPickerExample extends React.Component<{}, { color: string }> {
  state = {
    color: colors.P200,
  };

  render() {
    return (
      <div style={{ padding: 20 }}>
        <ColorPicker
          label="Change color"
          palette={simplePalette}
          selectedColor={this.state.color}
          popperProps={{
            positionFixed: true,
            modifiers: {
              offset: {
                offset: '-10 5',
              },
            },
          }}
          cols={3}
          onChange={(newColor: string) => this.setState({ color: newColor })}
        />
      </div>
    );
  }
}

export default () => <ColorPickerExample />;
