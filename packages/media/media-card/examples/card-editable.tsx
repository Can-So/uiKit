import * as React from 'react';
import { Component } from 'react';
import {
  createStorybookContext,
  genericFileId,
} from '@atlaskit/media-test-helpers';
import Toggle from '@atlaskit/toggle';
import Slider from '@atlaskit/field-range';
import { Card, Identifier, CardDimensions } from '../src';
import { CardDimensionsWrapper } from '../example-helpers/styled';
import {
  EditableCardOptions,
  EditableCardContent,
} from '../example-helpers/styled';

const context = createStorybookContext();

export interface EditableCardState {
  identifier: Identifier;
  dimensions: CardDimensions;
  parentDimensions: CardDimensions;
  isWidthPercentage: boolean;
  isHeightPercentage: boolean;
  isLazy: boolean;
  useDimensions: boolean;
  usePixelUnits: boolean;
}

class EditableCard extends Component<{}, EditableCardState> {
  state: EditableCardState = {
    identifier: genericFileId,
    dimensions: { width: '100%', height: '50%' },
    parentDimensions: { height: 300, width: 500 },
    isWidthPercentage: true,
    isHeightPercentage: true,
    isLazy: false,
    useDimensions: true,
    usePixelUnits: false,
  };

  onWidthChange = e => {
    const dimensions = this.state.dimensions;

    dimensions.width = e;
    this.setState({ dimensions });
  };

  onHeightChange = e => {
    const dimensions = this.state.dimensions;

    dimensions.height = e;
    this.setState({ dimensions });
  };

  onWidthPercentageChange = () => {
    this.setState({ isWidthPercentage: !this.state.isWidthPercentage });
  };

  onHeightPercentageChange = () => {
    this.setState({ isHeightPercentage: !this.state.isHeightPercentage });
  };

  onParentWidthChange = width => {
    const parentDimensions = this.state.parentDimensions;

    parentDimensions.width = width;
    this.setState({ parentDimensions });
  };

  onParentHeightChange = height => {
    const parentDimensions = this.state.parentDimensions;

    parentDimensions.height = height;
    this.setState({ parentDimensions });
  };

  onIsLazyChange = () => {
    this.setState({ isLazy: !this.state.isLazy });
  };

  onUseDimensionsChange = () => {
    this.setState({ useDimensions: !this.state.useDimensions });
  };

  onPixelsUnitChange = () => {
    this.setState({ usePixelUnits: !this.state.usePixelUnits });
  };

  render() {
    const {
      identifier,
      dimensions,
      isWidthPercentage,
      isHeightPercentage,
      parentDimensions,
      isLazy,
      useDimensions,
      usePixelUnits,
    } = this.state;
    const width = parseInt(`${dimensions.width}`, 0);
    const height = parseInt(`${dimensions.height}`, 0);
    const { width: parentWidth, height: parentHeight } = parentDimensions;
    const parentStyle = { width: parentWidth, height: parentHeight };
    const newDimensions: CardDimensions = { width, height };

    if (isWidthPercentage) {
      newDimensions.width = `${width}%`;
    }

    if (isHeightPercentage) {
      newDimensions.height = `${height}%`;
    }

    if (usePixelUnits) {
      newDimensions.width = `${width}px`;
      newDimensions.height = `${height}px`;
    }

    return (
      <div>
        <EditableCardOptions>
          Card dimensions <hr />
          <CardDimensionsWrapper>
            <div>
              Card Width ({width}) | Use percentage:
              <Toggle
                isDefaultChecked={isWidthPercentage}
                onChange={this.onWidthPercentageChange}
              />
              <Slider
                value={Number(width)}
                min={0}
                max={1000}
                onChange={this.onWidthChange}
              />
            </div>
            <div>
              Card Height ({height}) | Use percentage:
              <Toggle
                isDefaultChecked={isHeightPercentage}
                onChange={this.onHeightPercentageChange}
              />
              <Slider
                value={Number(height)}
                min={50}
                max={1000}
                onChange={this.onHeightChange}
              />
            </div>
            <div>
              Parent Width ({parentWidth})
              <Slider
                value={Number(parentWidth)}
                min={0}
                max={1000}
                onChange={this.onParentWidthChange}
              />
            </div>
            <div>
              Parent Height ({parentHeight})
              <Slider
                value={Number(parentHeight)}
                min={50}
                max={1000}
                onChange={this.onParentHeightChange}
              />
            </div>
          </CardDimensionsWrapper>
          isLazy
          <Toggle isDefaultChecked={isLazy} onChange={this.onIsLazyChange} />
          use dimensions
          <Toggle
            isDefaultChecked={useDimensions}
            onChange={this.onUseDimensionsChange}
          />
          use pixels
          <Toggle
            isDefaultChecked={usePixelUnits}
            onChange={this.onPixelsUnitChange}
          />
        </EditableCardOptions>
        <EditableCardContent style={parentStyle}>
          <Card
            context={context}
            identifier={identifier}
            dimensions={useDimensions ? newDimensions : undefined}
            isLazy={isLazy}
          />
        </EditableCardContent>
      </div>
    );
  }
}

export default () => <EditableCard />;
