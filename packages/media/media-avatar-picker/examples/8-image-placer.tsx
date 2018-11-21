import * as React from 'react';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import { ImagePlacer, ImagePlacerAPI } from '../src/image-placer';
import {
  Slider,
  Label,
  ExportedImage,
  ExportedImageWrapper,
  DisabledText,
} from '../example-helpers/styled';

export interface ExampleState {
  containerWidth: number;
  containerHeight: number;
  margin: number;
  zoom: number;
  maxZoom: number;
  useConstraints: boolean;
  circular: boolean;
  renderCircularMask: boolean;
  src?: string;
  file?: File;
  exportedDataURI?: string;
}

const CONTAINER_WIDTH_LABEL = 'Container_Width';
const CONTAINER_HEIGHT_LABEL = 'Container_Height';
const MARGIN_LABEL = 'Margin';

class Example extends React.Component<{}, ExampleState> {
  zoomSliderRef?: HTMLInputElement;

  // part of ImagePlacerAPI exported with onSaveImage prop of ImagePlacer
  toDataURL?: () => string;

  state: ExampleState = {
    containerWidth: 200,
    containerHeight: 200,
    margin: 30,
    zoom: 0,
    maxZoom: 2,
    useConstraints: true,
    circular: false,
    renderCircularMask: false,
  };

  private setZoomSliderValue(value: number) {
    if (this.zoomSliderRef) {
      this.zoomSliderRef.value = `${value * 100}`;
    }
  }

  onZoomSliderChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const value = e.currentTarget.valueAsNumber;
    const zoom = value / 100;
    this.setState({ zoom });
  };

  onUseConstraintsChanged = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const useConstraints = e.currentTarget.checked;
    this.setZoomSliderValue(0);
    this.setState({ zoom: 0, useConstraints });
  };

  onCircularChanged = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const circular = e.currentTarget.checked;
    this.setState({ circular });
  };

  onRenderCircularMaskChanged = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const renderCircularMask = e.currentTarget.checked;
    this.setState({ renderCircularMask });
  };

  onZoomSliderRef = (el: any) => {
    this.zoomSliderRef = el;
  };

  onImageChange = () => {
    this.setState({ zoom: 0 });
  };

  onZoomChange = (zoom: number) => {
    this.setZoomSliderValue(zoom);
  };

  onFileInputChange = async (e: React.SyntheticEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const file = e.currentTarget.files[0];
      this.setState({ src: undefined, file });
    }
  };

  onSaveImage = (api: ImagePlacerAPI) => {
    this.toDataURL = api.toDataURL;
  };

  onGetImageClick = () => {
    const { toDataURL } = this;
    if (toDataURL) {
      this.setState({
        exportedDataURI: toDataURL(),
      });
    }
  };

  render() {
    const {
      containerWidth,
      containerHeight,
      margin,
      zoom,
      maxZoom,
      useConstraints,
      circular,
      renderCircularMask,
      file,
      src,
      exportedDataURI,
    } = this.state;

    return (
      <Page>
        <Grid>
          <GridColumn>
            <h1>Image Placer</h1>
            <p>
              This component allows placement of an image via panning and
              zooming.
            </p>
            <p>It supports touch, svg, and Exif orientation.</p>
            <p>
              Normally you would set a fixed container size and margin, but feel
              free to change them here in this demo.
            </p>
            <p>
              With constraints, the image will never be smaller than the inner
              visible area (default:true), but this can turned off via
              useConstraints prop.
            </p>
            <p>
              To receive an object with api to provide current view in different
              formats, provide a callback to the onSaveImage prop.
            </p>
            {this.createSlider(CONTAINER_WIDTH_LABEL, containerWidth)}
            {this.createSlider(CONTAINER_HEIGHT_LABEL, containerHeight)}
            {this.createSlider(MARGIN_LABEL, margin, 0, 100, 5)}
            <Label>
              <span>Circular:</span>
              <input
                type="checkbox"
                defaultChecked={circular}
                onChange={this.onCircularChanged}
              />
            </Label>
            <Label>
              {circular ? (
                <span>Render Circular Mask:</span>
              ) : (
                <DisabledText>Render Circular Mask:</DisabledText>
              )}
              <input
                type="checkbox"
                disabled={!circular}
                defaultChecked={renderCircularMask}
                onChange={this.onRenderCircularMaskChanged}
              />
            </Label>
            <Label>
              <span>Use Constraints:</span>
              <input
                type="checkbox"
                defaultChecked={useConstraints}
                onChange={this.onUseConstraintsChanged}
              />
            </Label>
          </GridColumn>
        </Grid>
        <Grid>
          <GridColumn>
            <ImagePlacer
              containerWidth={containerWidth}
              containerHeight={containerHeight}
              src={src}
              file={file}
              margin={margin}
              zoom={zoom}
              maxZoom={maxZoom}
              useConstraints={useConstraints}
              circular={circular}
              renderCircularMask={renderCircularMask}
              onImageChange={this.onImageChange}
              onZoomChange={this.onZoomChange}
              onSaveImage={this.onSaveImage}
            />
          </GridColumn>
        </Grid>
        <Grid>
          <GridColumn>
            <Slider
              type="range"
              min="0"
              max="100"
              defaultValue={`${zoom * 100}`}
              step="1"
              onChange={this.onZoomSliderChange}
              innerRef={this.onZoomSliderRef}
              style={{ width: containerWidth + margin * 2 }}
            />
          </GridColumn>
        </Grid>
        <Grid>
          <GridColumn>
            <input type="file" onChange={this.onFileInputChange} />
            {typeof src === 'string' || file !== undefined ? (
              <p>
                <button onClick={this.onGetImageClick}>Export DataURI</button>
              </p>
            ) : null}
          </GridColumn>
        </Grid>
        <Grid>
          <GridColumn>
            {exportedDataURI ? (
              <ExportedImageWrapper>
                <ExportedImage src={exportedDataURI} style={{ margin }} />
              </ExportedImageWrapper>
            ) : null}
          </GridColumn>
        </Grid>
      </Page>
    );
  }

  private createSlider(
    title: string,
    defaultValue: number,
    min: number = 0,
    max: number = 500,
    step: number = 50,
  ): JSX.Element {
    const dataListOptions: JSX.Element[] = [];
    for (let i = min; i < max; i += step) {
      dataListOptions.push(<option key={i + title}>{i}</option>);
    }
    const displayTitle = title.replace(/_/g, ' ');
    const stepListId = `stepList_${displayTitle}`;
    return (
      <Label>
        <span>{displayTitle}:</span>
        <Slider
          type="range"
          min={min}
          max={max}
          defaultValue={`${defaultValue}`}
          step={step}
          list={stepListId}
          onChange={this.onSliderChange(title)}
        />
        {defaultValue}
        <datalist id={stepListId}>{dataListOptions}</datalist>
      </Label>
    );
  }

  private onSliderChange(id: string) {
    return (e: React.SyntheticEvent<HTMLInputElement>) => {
      const value = e.currentTarget.valueAsNumber;
      switch (id) {
        case CONTAINER_WIDTH_LABEL:
          this.setState({ containerWidth: value });
          break;
        case CONTAINER_HEIGHT_LABEL:
          this.setState({ containerHeight: value });
          break;
        case MARGIN_LABEL:
          this.setState({ zoom: 0, margin: value });
          this.setZoomSliderValue(0);
          break;
      }
    };
  }
}

export default () => <Example />;
