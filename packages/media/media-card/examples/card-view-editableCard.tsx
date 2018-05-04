/* tslint:disable:no-console */

import * as React from 'react';
import { Component } from 'react';
import FieldRadioGroup from '@atlaskit/field-radio-group';
import {
  videoFileDetails,
  imageFileDetails,
  audioFileDetails,
  emptyLinkDetails,
  docFileDetails,
  unknownFileDetails,
  genericLinkDetails,
  gifDataUri,
  smallImage,
  smallTransparentImage,
  tallImage,
  wideImage,
  wideTransparentImage,
  imageLinkDetails,
  erroredLinkDetails,
  longLinkDetails,
  transparentLinkDetails,
  linkNoImageDetails,
  noTitleLinkDetails,
} from '@atlaskit/media-test-helpers';
import { ImageResizeMode, MediaItemType } from '@atlaskit/media-core';
import Toggle from '@atlaskit/toggle';
import Slider from '@atlaskit/field-range';
import { CardView } from '../src/root/cardView';
import { CardAppearance, CardStatus, CardDimensions, CardAction } from '../src';
import {
  openAction,
  closeAction,
  deleteAction,
  actions,
} from '../example-helpers';
import {
  EditableCardOptions,
  EditableCardContent,
  SliderWrapper,
  OptionsWrapper,
  CardDimensionsWrapper,
  MainWrapper,
  CardPreviewWrapper,
} from '../example-helpers/styled';
import { defaultImageCardDimensions } from '../src/utils/cardDimensions';

const appearanceOptions = [
  { value: 'auto', label: 'Auto' },
  { value: 'small', label: 'Small' },
  { value: 'image', label: 'Image' },
  { value: 'square', label: 'Square' },
  { value: 'horizontal', label: 'Horizontal' },
];
const metadataOptions = [
  { value: 'fileImage', label: 'File image' },
  { value: 'fileVideo', label: 'File video' },
  { value: 'fileAudio', label: 'File audio' },
  { value: 'fileDoc', label: 'File doc' },
  { value: 'fileUnknown', label: 'File unknown' },
  { value: 'genericLink', label: 'Link generic' },
  { value: 'transparentLink', label: 'Link transparent' },
  { value: 'noImageLink', label: 'Link no image' },
  { value: 'noTitleLink', label: 'Link no title' },
  { value: 'longLink', label: 'Link long' },
  { value: 'imageLink', label: 'Link image' },
  { value: 'emptyLink', label: 'Link empty' },
  { value: 'erroredLink', label: 'Link errored' },
];
const mediaItemTypeOptions = [
  { value: 'file', label: 'File' },
  { value: 'link', label: 'Link' },
];
const dataURIOptions = [
  { value: gifDataUri, label: 'Gif' },
  { value: smallImage, label: 'Small' },
  { value: smallTransparentImage, label: 'Small transparent' },
  { value: tallImage, label: 'Tall' },
  { value: wideImage, label: 'Wide' },
  { value: wideTransparentImage, label: 'Wide transparent' },
  { value: undefined, label: 'No Image' },
];
const statusOptions = [
  { value: 'complete', label: 'complete' },
  { value: 'uploading', label: 'uploading' },
  { value: 'loading', label: 'loading' },
  { value: 'processing', label: 'processing' },
  { value: 'error', label: 'error' },
];
const resizeModeOptions = [
  { value: 'crop', label: 'crop' },
  { value: 'fit', label: 'fit' },
  { value: 'full-fit', label: 'full-fit' },
];

export const generateStoriesForEditableCards = () => {
  const localStorageKeyName = 'editableCardState';
  const metadataOptionsMap = {
    fileImage: imageFileDetails,
    fileVideo: videoFileDetails,
    fileAudio: audioFileDetails,
    fileDoc: docFileDetails,
    fileUnknown: unknownFileDetails,
    genericLink: genericLinkDetails,
    emptyLink: emptyLinkDetails,
    imageLink: imageLinkDetails,
    longLink: longLinkDetails,
    transparentLink: transparentLinkDetails,
    noImageLink: linkNoImageDetails,
    erroredLink: erroredLinkDetails,
    noTitleLink: noTitleLinkDetails,
  };
  const getStateFromLocalStorage = (): EditableCardState | null => {
    const previousState = localStorage.getItem(localStorageKeyName);

    try {
      return JSON.parse(previousState || '');
    } catch (e) {
      return null;
    }
  };

  const getOptionsWithDefaultValue = (
    options: Array<{ value?: string }>,
    value: string,
  ) => {
    const optionsWithDefault = options.map(option => ({
      ...option,
      defaultSelected: option.value === value,
    }));

    return optionsWithDefault;
  };

  interface EditableCardProps {}

  interface EditableCardState {
    appearance: CardAppearance;
    status: CardStatus;
    dimensions: CardDimensions;
    parentDimensions: CardDimensions;
    metadata: string;
    dataURI: string;
    progress: number;
    menuActions: Array<CardAction>;
    selectable: boolean;
    selected: boolean;
    resizeMode: ImageResizeMode;
    mediaItemType: MediaItemType;
    isMouseEnterHandlerActive: boolean;
    isClickHandlerActive: boolean;
    isParentInlineBlock: boolean;
    doesParentHasWidth: boolean;
    isWidthPercentage: boolean;
    isHeightPercentage: boolean;
    useDimensions: boolean;
  }

  class EditableCard extends Component<EditableCardProps, EditableCardState> {
    debounced: any;

    constructor(props) {
      super(props);
      const defaultState: EditableCardState = {
        appearance: 'auto',
        status: 'complete',
        metadata: 'fileImage',
        dataURI: gifDataUri,
        dimensions: {
          width: defaultImageCardDimensions.width,
          height: defaultImageCardDimensions.height,
        },
        parentDimensions: {
          width: '100%',
          height: '100%',
        },
        progress: 0,
        menuActions: actions,
        selectable: false,
        selected: false,
        resizeMode: 'crop',
        mediaItemType: 'file',
        isMouseEnterHandlerActive: true,
        isClickHandlerActive: true,
        isParentInlineBlock: false,
        doesParentHasWidth: true,
        isWidthPercentage: true,
        isHeightPercentage: true,
        useDimensions: true,
      };
      const previousState = getStateFromLocalStorage();
      const state = previousState || defaultState;
      // We need to override "menuActions" since it can't be serialized because it contains react no
      this.state = { ...state, menuActions: actions };
    }

    componentDidUpdate() {
      localStorage.setItem(localStorageKeyName, JSON.stringify(this.state));
    }

    render() {
      const {
        appearance,
        status,
        dataURI,
        dimensions,
        parentDimensions,
        metadata: metadataKey,
        menuActions,
        progress,
        selectable,
        selected,
        resizeMode,
        mediaItemType,
        isClickHandlerActive,
        isMouseEnterHandlerActive,
        isParentInlineBlock,
        doesParentHasWidth,
        isWidthPercentage,
        isHeightPercentage,
        useDimensions,
      } = this.state;
      const width = parseInt(`${dimensions.width}`, 0);
      const height = parseInt(`${dimensions.height}`, 0);
      const metadata = metadataOptionsMap[metadataKey];
      const { width: parentWidth, height: parentHeight } = parentDimensions;
      const parentStyle = { height: parentHeight };
      const newDimensions: CardDimensions = { width, height };

      if (isParentInlineBlock) {
        parentStyle['display'] = 'inline-block';
      }

      if (doesParentHasWidth) {
        parentStyle['width'] = parentWidth;
      }

      if (isWidthPercentage) {
        newDimensions.width = `${width}%`;
      }

      if (isHeightPercentage) {
        newDimensions.height = `${height}%`;
      }

      return (
        <MainWrapper>
          <CardPreviewWrapper>
            <CardDimensionsWrapper>
              <div>
                Card dimensions: {width}x{height}
              </div>
              <div>
                Parent dimensions: {parentWidth}x{parentHeight}
              </div>
            </CardDimensionsWrapper>
            <EditableCardContent style={parentStyle}>
              <CardView
                onRetry={() => console.log('onRetry')}
                appearance={appearance}
                status={status}
                metadata={metadata}
                mediaItemType={mediaItemType}
                dataURI={dataURI}
                dimensions={useDimensions ? newDimensions : undefined}
                actions={menuActions}
                progress={progress}
                selectable={selectable}
                selected={selected}
                resizeMode={resizeMode}
                onClick={this.onClick}
                onMouseEnter={this.onMouseEnter}
              />
            </EditableCardContent>
          </CardPreviewWrapper>
          <EditableCardOptions>
            <SliderWrapper>
              <div>
                Card dimensions <hr />
                <div>
                  Width ({width}) | Percentage
                  <Toggle
                    isDefaultChecked={isWidthPercentage}
                    onChange={this.onWidthPercentageChange}
                  />
                  <Slider
                    value={Number(width)}
                    min={0}
                    max={500}
                    onChange={this.onWidthChange}
                  />
                </div>
                <div>
                  Height ({height}) | Percentage
                  <Toggle
                    isDefaultChecked={isHeightPercentage}
                    onChange={this.onHeightPercentageChange}
                  />
                  <Slider
                    value={Number(height)}
                    min={0}
                    max={500}
                    onChange={this.onHeightChange}
                  />
                </div>
              </div>
              <div>
                Parent properties <hr />
                <div>
                  Has width
                  <Toggle
                    isDefaultChecked={doesParentHasWidth}
                    onChange={this.onDoesParentHasWidthChange}
                  />
                </div>
                {doesParentHasWidth ? (
                  <div>
                    Width ({parentWidth})
                    <Slider
                      value={Number(parentWidth)}
                      min={50}
                      max={1000}
                      onChange={this.onParentWidthChange}
                    />
                  </div>
                ) : null}
                <div>
                  Height ({parentHeight})
                  <Slider
                    value={Number(parentHeight)}
                    min={50}
                    max={1000}
                    onChange={this.onParentHeightChange}
                  />
                </div>
                <div>
                  Is inline-block
                  <Toggle
                    isDefaultChecked={isParentInlineBlock}
                    onChange={this.onIsParentInlineBlockChange}
                  />
                </div>
              </div>
              <div>
                Progress ({progress})
                <Slider
                  value={Number(progress)}
                  min={0}
                  max={1}
                  onChange={this.onProgressChange}
                />
              </div>
              <div>
                Actions <hr />
                <div>
                  <input
                    type="checkbox"
                    onChange={this.onActionsChange(openAction)}
                    checked={this.isActionChecked(openAction)}
                  />{' '}
                  Open
                </div>
                <div>
                  <input
                    type="checkbox"
                    onChange={this.onActionsChange(closeAction)}
                    checked={this.isActionChecked(closeAction)}
                  />{' '}
                  Close
                </div>
                <div>
                  <input
                    type="checkbox"
                    onChange={this.onActionsChange(deleteAction)}
                    checked={this.isActionChecked(deleteAction)}
                  />{' '}
                  Delete
                </div>
              </div>
              <div>
                Selectable
                <Toggle
                  isDefaultChecked={selectable}
                  onChange={this.onSelectableChange}
                />
                <hr />
                Selected
                <Toggle
                  isDefaultChecked={selected}
                  onChange={this.onSelectedChange}
                />
              </div>
              <div>
                On click
                <Toggle
                  isDefaultChecked={isClickHandlerActive}
                  onChange={this.onClickChange}
                />
                <hr />
                On mouse enter
                <Toggle
                  isDefaultChecked={isMouseEnterHandlerActive}
                  onChange={this.onMouseEnterChange}
                />
                <hr />
                use dimensions
                <Toggle
                  isDefaultChecked={useDimensions}
                  onChange={this.onUseDimensionsChange}
                />
              </div>
            </SliderWrapper>
            <OptionsWrapper>
              <FieldRadioGroup
                label="Appearance"
                items={getOptionsWithDefaultValue(
                  appearanceOptions,
                  appearance,
                )}
                onRadioChange={this.onAppearanceChange}
              />
              <FieldRadioGroup
                label="Metadata"
                items={getOptionsWithDefaultValue(metadataOptions, metadataKey)}
                onRadioChange={this.onMetadataChange}
              />
              <FieldRadioGroup
                label="MediaItemType"
                items={getOptionsWithDefaultValue(
                  mediaItemTypeOptions,
                  mediaItemType,
                )}
                onRadioChange={this.onMediaItemTypeChange}
              />
              <FieldRadioGroup
                label="URI"
                items={getOptionsWithDefaultValue(dataURIOptions, dataURI)}
                onRadioChange={this.onDataURIChange}
              />
              <FieldRadioGroup
                label="Status"
                items={getOptionsWithDefaultValue(statusOptions, status)}
                onRadioChange={this.onStatusChange}
              />
              <FieldRadioGroup
                label="Resize mode"
                items={getOptionsWithDefaultValue(
                  resizeModeOptions,
                  resizeMode,
                )}
                onRadioChange={this.onResizeModeChange}
              />
            </OptionsWrapper>
          </EditableCardOptions>
        </MainWrapper>
      );
    }

    onWidthPercentageChange = () => {
      this.setState({ isWidthPercentage: !this.state.isWidthPercentage });
    };

    onHeightPercentageChange = () => {
      this.setState({ isHeightPercentage: !this.state.isHeightPercentage });
    };

    onMouseEnterChange = () => {
      this.setState({
        isMouseEnterHandlerActive: !this.state.isMouseEnterHandlerActive,
      });
    };

    onClickChange = () => {
      this.setState({ isClickHandlerActive: !this.state.isClickHandlerActive });
    };

    onClick = () => {
      if (this.state.isClickHandlerActive) {
        console.log('onClick');
      }
    };

    onMouseEnter = () => {
      if (this.state.isMouseEnterHandlerActive) {
        console.log('onMouseEnter');
      }
    };

    onSelectedChange = e => {
      this.setState({ selected: !this.state.selected });
    };

    onSelectableChange = e => {
      this.setState({ selectable: !this.state.selectable });
    };

    isActionChecked = action => this.state.menuActions.indexOf(action) !== -1;

    onActionsChange = action => e => {
      const { checked } = e.target;
      const { menuActions } = this.state;

      if (checked) {
        menuActions.push(action);
      } else {
        menuActions.splice(menuActions.indexOf(action), 1);
      }

      this.setState({ menuActions });
    };

    onAppearanceChange = e => {
      const appearance = e.target.value;
      this.setState({ appearance });
    };

    onMediaItemTypeChange = e => {
      const mediaItemType = e.target.value;
      this.setState({ mediaItemType });
    };

    onMetadataChange = e => {
      const metadata = e.target.value;

      this.setState({ metadata });
    };

    onDataURIChange = e => {
      const dataURI = e.target.value;

      this.setState({ dataURI });
    };

    onStatusChange = e => {
      const status = e.target.value;

      this.setState({ status });
    };

    onResizeModeChange = e => {
      const resizeMode = e.target.value;

      this.setState({ resizeMode });
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

    onIsParentInlineBlockChange = () => {
      this.setState({ isParentInlineBlock: !this.state.isParentInlineBlock });
    };

    onDoesParentHasWidthChange = () => {
      this.setState({ doesParentHasWidth: !this.state.doesParentHasWidth });
    };

    onProgressChange = progress => {
      this.setState({ progress });
    };

    onUseDimensionsChange = () => {
      this.setState({ useDimensions: !this.state.useDimensions });
    };
  }

  return <EditableCard />;
};

export default () => generateStoriesForEditableCards();
