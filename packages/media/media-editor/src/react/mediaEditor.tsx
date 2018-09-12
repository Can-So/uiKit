import * as React from 'react';

import {
  EditorContainer,
  OutputArea,
  DrawingCanvas,
  HiddenTextArea,
  HiddenTextHelperDiv,
  SupplementaryCanvas,
} from './styled';
import { Engine } from '../engine/engine';
import {
  ColorWithAlpha,
  Dimensions,
  ExportedImage,
  ShapeParameters,
  TextDirection,
  Tool,
} from '../common';
import { colorSame, colorWithAlphaSame, dimensionsSame } from '../util';

import {
  DefaultDrawingArea,
  OutputSize,
} from '../engine/components/drawingArea';
import {
  DefaultImageProvider,
  urlImageLoader,
} from '../engine/components/imageProvider';
import { DefaultMouseInput } from '../engine/components/mouseInput';
import { DefaultToolbar } from '../engine/components/toolbar';
import { DefaultKeyboardInput } from '../engine/components/keyboardInput';
import { DefaultImageReceiver } from '../engine/components/imageReceiver';
import { DefaultShapeDeleter } from '../engine/components/shapeDeleter';

export type ImageGetter = (format?: string) => ExportedImage;

export interface LoadParameters {
  imageGetter: ImageGetter;
}

export type LoadHandler = (
  imageUrl: string,
  loadParameters: LoadParameters,
) => void;
export type ErrorHandler = (imageUrl: string, error: Error) => void;
export type ShapeParametersChangedHandler = (
  parameters: ShapeParameters,
) => void;

export interface MediaEditorProps {
  imageUrl: string;
  dimensions: Dimensions;
  screenScaleFactor?: number;
  backgroundColor: ColorWithAlpha;
  shapeParameters: ShapeParameters;
  tool: Tool;

  onLoad: LoadHandler;
  onError: ErrorHandler;
  onShapeParametersChanged: ShapeParametersChangedHandler;
}

const defaultTextDirection = 'ltr';

export class MediaEditor extends React.Component<MediaEditorProps, {}> {
  private isUnmounted: boolean;

  // DOM elements that we need to create the engine
  private outputArea!: HTMLDivElement;
  private canvas!: HTMLCanvasElement;
  private supplementaryCanvas!: HTMLCanvasElement;
  private hiddenTextArea!: HTMLTextAreaElement;
  private hiddenTextHelperDiv!: HTMLDivElement;

  // Engine and its components
  private drawingArea?: DefaultDrawingArea;
  private toolbar?: DefaultToolbar;
  private engine?: Engine;

  constructor(props: MediaEditorProps) {
    super(props);
    this.isUnmounted = false;
  }

  componentDidMount() {
    this.loadEngine();
  }

  componentDidUpdate(prevProps: MediaEditorProps) {
    if (!this.engine) {
      return;
    }

    const currProps = this.props;

    if (currProps.imageUrl !== prevProps.imageUrl) {
      this.unloadEngine();
      this.loadEngine();
    }

    if (
      this.drawingArea &&
      (!dimensionsSame(currProps.dimensions, prevProps.dimensions) ||
        currProps.screenScaleFactor !== prevProps.screenScaleFactor)
    ) {
      this.drawingArea.setSize(MediaEditor.toOutputSize(currProps));
    }

    if (
      !colorWithAlphaSame(currProps.backgroundColor, prevProps.backgroundColor)
    ) {
      // TODO inform the core about the new background color
      // https://jira.atlassian.com/browse/FIL-3996
    }

    const {
      color: currColor,
      lineWidth: currLineWidth,
      addShadow: currAddShadow,
    } = currProps.shapeParameters;
    const {
      color: prevColor,
      lineWidth: prevLineWidth,
      addShadow: prevAddShadow,
    } = prevProps.shapeParameters;
    if (this.toolbar) {
      if (!colorSame(currColor, prevColor)) {
        this.toolbar.setColor(currColor);
      }
      if (currLineWidth !== prevLineWidth) {
        this.toolbar.setLineWidth(currLineWidth);
      }
      if (currAddShadow !== prevAddShadow) {
        this.toolbar.setAddShadow(currAddShadow);
      }
      if (currProps.tool !== prevProps.tool) {
        this.toolbar.setTool(currProps.tool);
      }
    }
  }

  componentWillUnmount() {
    this.isUnmounted = true;
    this.unloadEngine();
  }

  private handleOutputAreaInnerRef = (outputArea: HTMLDivElement) => {
    this.outputArea = outputArea;
  };
  private handleSupplementaryCanvasInnerRef = (canvas: HTMLCanvasElement) => {
    this.supplementaryCanvas = canvas;
  };
  private handleHiddenTextAreaInnerRef = (textArea: HTMLTextAreaElement) => {
    this.hiddenTextArea = textArea;
  };
  private handleHiddenTextHelperDivInnerRef = (div: HTMLDivElement) => {
    this.hiddenTextHelperDiv = div;
  };
  private handleDrawingCanvasInnerRef = (canvas: HTMLCanvasElement) => {
    this.canvas = canvas;
  };

  render() {
    const { dimensions } = this.props;
    const width = `${dimensions.width}px`;
    const height = `${dimensions.height}px`;

    return (
      <EditorContainer style={{ width, height }}>
        <OutputArea
          innerRef={this.handleOutputAreaInnerRef}
          style={{ width, height }}
        >
          <SupplementaryCanvas
            innerRef={this.handleSupplementaryCanvasInnerRef}
          />

          <HiddenTextArea
            autoComplete={'off'}
            innerRef={this.handleHiddenTextAreaInnerRef}
          />

          <HiddenTextHelperDiv
            innerRef={this.handleHiddenTextHelperDivInnerRef}
          />

          <DrawingCanvas
            innerRef={this.handleDrawingCanvasInnerRef}
            style={{ width, height }}
          />
        </OutputArea>
      </EditorContainer>
    );
  }

  private loadEngine(): void {
    const { imageUrl } = this.props;

    DefaultImageProvider.create(
      () => urlImageLoader(imageUrl),
      this.supplementaryCanvas,
    )
      .then(imageProvider => {
        // We must not create the engine if the component was unmounted or if the image was changed
        if (this.isUnmounted || imageUrl !== this.props.imageUrl) {
          return;
        }

        // Creating components for the engine
        const outputSize = MediaEditor.toOutputSize(this.props);
        const { backgroundColor } = this.props;
        this.drawingArea = new DefaultDrawingArea(
          this.canvas,
          outputSize,
          backgroundColor,
        );

        const mouseInput = new DefaultMouseInput(this.outputArea);
        this.toolbar = new DefaultToolbar(params =>
          this.props.onShapeParametersChanged(params),
        );
        const keyboardInput = new DefaultKeyboardInput(
          this.hiddenTextArea,
          this.supplementaryCanvas,
          this.hiddenTextHelperDiv,
        );
        const imageReceiver = new DefaultImageReceiver(
          this.supplementaryCanvas,
        );
        const shapeDeleter = new DefaultShapeDeleter(this.hiddenTextArea);

        // Creating the engine
        const { shapeParameters, tool: initialTool } = this.props;
        const textDirection =
          (window.getComputedStyle(this.outputArea)
            .direction as TextDirection) || defaultTextDirection;

        const config = {
          // tslint:disable-next-line:no-console
          onCoreError: (message: string) => {
            // tslint:disable-next-line
            console.error(message);
          },
          shapeParameters,
          initialTool,
          textDirection,
          drawingArea: this.drawingArea,
          imageProvider,
          mouseInput,
          toolbar: this.toolbar,
          keyboardInput,
          imageReceiver,
          shapeDeleter,
        };

        this.engine = new Engine(config);
        const loadParameters = {
          imageGetter: (format?: string) => this.engine!.getBase64Image(format),
        };

        this.props.onLoad(imageUrl, loadParameters);
      })
      .catch(error => this.props.onError(imageUrl, error));
  }

  private unloadEngine(): void {
    if (this.engine) {
      this.engine.unload();
      delete this.engine;
    }
  }

  private static toOutputSize(props: MediaEditorProps): OutputSize {
    const { dimensions } = props;
    const screenScaleFactor =
      props.screenScaleFactor || MediaEditor.screenScaleFactor;

    return {
      width: dimensions.width * screenScaleFactor,
      height: dimensions.height * screenScaleFactor,
      screenScaleFactor,
    };
  }

  private static get screenScaleFactor(): number {
    return window.devicePixelRatio || 1;
  }
}

export default MediaEditor;
