import * as React from 'react';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import { getOrientation, getFileInfo } from '../src';
import {
  InputWrapper,
  PreviewList,
  PreviewItem,
  Code,
  CloseButton,
  OrientationSelectWrapper,
  PreviewImageContainer,
} from '../example-helpers/styled';
import Lozenge from '@atlaskit/lozenge';

const ORIENT_TRANSFORMS: { [key: number]: string } = {
  1: 'none',
  2: 'rotateY(180deg)',
  3: 'rotate(180deg)',
  4: 'rotate(180deg) rotateY(180deg)',
  5: 'rotate(270deg) rotateY(180deg)',
  6: 'rotate(90deg)',
  7: 'rotate(90deg) rotateY(180deg)',
  8: 'rotate(270deg)',
};

interface ExamplePreview {
  filename: string;
  src: string;
  orientation: number;
  duration: number;
}

export interface ExampleState {
  previews: ExamplePreview[];
  orientation: number;
}

class Example extends React.Component<{}, ExampleState> {
  state: ExampleState = {
    previews: [],
    orientation: 0,
  };

  onChange = async (e: any) => {
    const { files } = e.target;
    const { previews } = this.state;
    for (let file of files) {
      const startTime = Date.now();
      const fileInfo = await getFileInfo(file);
      const orientation = await getOrientation(file);
      const duration = Date.now() - startTime;
      previews.push({
        filename: file.name,
        orientation,
        src: fileInfo.src,
        duration,
      });
    }
    this.setState({ previews: [...previews] });
  };

  onSelectOrientation = (e: any) => {
    const orientation = parseInt(e.target.value, 10);
    this.setState({ orientation });
  };

  render() {
    const { orientation } = this.state;

    return (
      <Page>
        <Grid>
          <GridColumn>
            <h1>Image Orientation Preview</h1>
            <p>
              <Lozenge>@atlaskit/media-ui</Lozenge> exports:{' '}
              <Code>async getOrientation(file:File): number</Code>
            </p>
            <p>
              async Example:
              <br />
              <Code>
                const orientation: number = await getOrientation(file);
              </Code>
            </p>
            <p>
              Select a local image to see it's Exif orientation (if available).<br />
              Currently only supports Exif / XMP tags in <b>JPEG</b> and{' '}
              <b>PNG</b> formats.
            </p>
          </GridColumn>
        </Grid>
        <Grid>
          <GridColumn>
            <InputWrapper>
              <input type="file" onChange={this.onChange} />
            </InputWrapper>
            <OrientationSelectWrapper>
              Use Orientation:&nbsp;
              <select
                defaultValue={`${orientation}`}
                onChange={this.onSelectOrientation}
              >
                <option value="0">From Image (if metadata available)</option>
                <option value="1">1 (none)</option>
                <option value="2">2 (flip horizontal)</option>
                <option value="3">3 (rotate 180)</option>
                <option value="4">4 (flip vertical)</option>
                <option value="5">5 (transpose)</option>
                <option value="6">6 (rotate 90)</option>
                <option value="7">7 (transverse)</option>
                <option value="8">8 (rotate 270)</option>
              </select>
            </OrientationSelectWrapper>
          </GridColumn>
        </Grid>
        <Grid>
          <GridColumn>
            <PreviewList>{this.renderPreviews()}</PreviewList>
          </GridColumn>
        </Grid>
      </Page>
    );
  }

  onRemovePreview = (index: number) => () => {
    const { previews } = this.state;
    previews.splice(index, 1);
    this.setState({ previews: [...previews] });
  };

  renderPreviews() {
    const { previews, orientation: forcedOrientation } = this.state;
    return previews.map((preview, i) => {
      // const orientation =
      //   preview.orientation === null ? 1 : preview.orientation;
      const orientation =
        forcedOrientation === 0 ? preview.orientation : forcedOrientation;
      return (
        <PreviewItem key={`preview-${i}`}>
          <div>
            <p>
              filename:{' '}
              <Lozenge appearance="inprogress">{preview.filename}</Lozenge>
            </p>
            <p>
              orientation:{' '}
              <Lozenge appearance="success" isBold>
                {orientation}
              </Lozenge>
            </p>
            <p>
              transform:{' '}
              <Lozenge appearance="moved">
                {ORIENT_TRANSFORMS[orientation]}
              </Lozenge>
            </p>
            <p>
              duration: <Lozenge>{preview.duration}ms</Lozenge>
            </p>
          </div>
          <PreviewImageContainer>
            <img
              src={preview.src}
              style={{ transform: ORIENT_TRANSFORMS[orientation] }}
            />
          </PreviewImageContainer>
          <CloseButton onClick={this.onRemovePreview(i)}>X</CloseButton>
        </PreviewItem>
      );
    });
  }
}

export default () => <Example />;
