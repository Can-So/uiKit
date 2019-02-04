/**
 * Only used internally ATM
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Component, CSSProperties } from 'react';
import { getCssFromImageOrientation, isRotated } from '@atlaskit/media-ui';
import { ImageComponent } from './styled';

export interface MediaImageProps {
  dataURI: string;
  crop?: boolean;
  stretch?: boolean;
  previewOrientation?: number;
}

export interface MediaImageState {
  isImageLoaded: boolean;
  imgWidth: number;
  imgHeight: number;
  parentWidth: number;
  parentHeight: number;
}

export class MediaImage extends Component<MediaImageProps, MediaImageState> {
  static defaultProps: Partial<MediaImageProps> = {
    crop: true,
    stretch: false,
  };
  imageRef: React.RefObject<HTMLImageElement>;

  constructor(props: MediaImageProps) {
    super(props);
    this.imageRef = React.createRef();

    this.state = {
      isImageLoaded: false,
      imgWidth: 0,
      imgHeight: 0,
      parentWidth: Infinity,
      parentHeight: Infinity,
    };
  }

  // TODO FIL-4060 we need to check whether the dataURI changes in componentWillReceiveProps()
  // and if it does recalculate the image height and width

  componentDidMount() {
    const parent = ReactDOM.findDOMNode(this)!.parentElement;
    if (!parent) {
      return;
    }
    const { width, height } = parent.getBoundingClientRect();

    this.setState({
      parentWidth: width,
      parentHeight: height,
    });
  }

  onImageLoad = () => {
    if (!this.imageRef || !this.imageRef.current) {
      return;
    }
    this.setState({
      isImageLoaded: true,
      imgWidth: this.imageRef.current.naturalWidth,
      imgHeight: this.imageRef.current.naturalHeight,
    });
  };

  render() {
    const { crop, stretch, dataURI, previewOrientation } = this.props;
    const {
      parentWidth,
      parentHeight,
      imgWidth,
      imgHeight,
      isImageLoaded,
    } = this.state;

    const parentRatio = parentWidth / parentHeight;
    let imgRatio = imgWidth / imgHeight;
    let percentSize = '100%';

    const isImageRotated = isRotated(previewOrientation || 1);
    /*
      When photo has orientation of 90deg or 270deg (store in meta data)
      things get very tricky. Let me go through an example to explain how we deal with that:

      Image gets in as     ________    But it needs to be     ┌──────┐
      horizontal picture  |        |   displayed as 750x1000  │      │
      of 1000x750         |        |                          │      │
                          |________|                          │      │
                                                              │      │
                                                              └──────┘

      Container is much smaller, but at least has right dimensions of 75x100.
      (There is other place where we flip width and height to get right container dimensions)
      So, parameters are:
        parentWidth: 75
        parentHeight: 100
        imgWidth: 1000
        imgHeight: 750
        crop: false (means we want to fit)
        stretch: true
        previewOrientation: 6

      For algo to work properly first we need to flip the imgRation. Initial value would be
      1000/750 = 1.33 but we want it to be 750/1000 = 0.75
      At this point this can be achieved by 1/1.3333 = 0.75.

      In this situation it's not very important what fit and stretch values are, since
      container and image ratios are the same. This means it's not very important if resulting
      style will be height: 100% or width: 100%. But, in this case algorithm will choose
      height: 100%.

      Now here is what going to happened.
      FIRST, Browser will put an image with 1000x750 into the box 75x100 and apply height:100%.

      ┌───┬──────┬───┐  This will scale an image according to rules of ratios:
      │░░░│▓▓▓▓▓▓│░░░│  (img height) -> (container height /
      │░░░│▓▓▓▓▓▓│░░░│                   scaled down img height) -- This defined by css height: 100%
      │░░░│▓▓▓▓▓▓│░░░│  750px        -> 100px
      └───┴──────┴───┘  (img width)  -> (scaled down img width)
                        1000px       -> (100 x 1000) / 750 = 133.33px

      And only NOW browser will apply rotate: 90deg and turn image around.
      And we end up with this:

      ┌──────────┐   Where our image has size of 100x133.3
      │░░░░░░░░░░│   in the box of size 75x100.
      │░┌──────┐░│
      │░│▓▓▓▓▓▓│░│
      │░│▓▓▓▓▓▓│░│
      │░│▓▓▓▓▓▓│░│
      │░└──────┘░│
      │░░░░░░░░░░│
      └──────────┘

      To combat this we will not make height: 100% but use ratio of an image.
      In this case imgRatio is now 0.75 (after flipping)
      
      New math will look like this:
      (img height) -> (container height /
                       scaled down img height) -- This defined by css height: 75%
      750px        -> (0.75 x 100px) = 75px
      (img width)  -> (scaled down img width)
      1000px       -> (75 x 1000) / 750 = 100px

      Resulting in scaled down image size: 75x100, which matched container.

     */
    if (isImageRotated) {
      imgRatio = 1 / imgRatio;
      percentSize = `${Math.floor(imgRatio * 100)}%`;
    }

    /*
      Cover strategy means we want to full entire screen with an image. Here is an example:

         Image           Container   Result (░ - is what cropped out)
     ┌──────────────┐    ┌──────┐    ┌───┬──────┬───┐
     │▓▓▓▓▓▓▓▓▓▓▓▓▓▓│    │      │    │░░░│▓▓▓▓▓▓│░░░│
     │▓▓▓▓▓▓▓▓▓▓▓▓▓▓│ -> │      │ => │░░░│▓▓▓▓▓▓│░░░│
     │▓▓▓▓▓▓▓▓▓▓▓▓▓▓│    │      │    │░░░│▓▓▓▓▓▓│░░░│
     │▓▓▓▓▓▓▓▓▓▓▓▓▓▓│    └──────┘    └───┴──────┴───┘
     └──────────────┘
    */
    const isCoverStrategy = crop;

    /*
      Fit strategy means image is fully inside container even if there is empty space left.
      Here is an example:

             Image            Container     Result
     ┌────────────────────┐    ┌──────┐    ┌──────┐
     │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│    │      │    ├──────┤
     │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│ -> │      │ => │▓▓▓▓▓▓│
     │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│    │      │    │▓▓▓▓▓▓│
     │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│    │      │    ├──────┤
     └────────────────────┘    └──────┘    └──────┘
     */
    const isFitStrategy = !crop;

    /*
      Here is an example of when isImageMoreLandscapyThanContainer is true:

        Image      Container   OR   Image      Container
       ________      _____          ____           __
      |        | -> |     |        |    |   ->    |  |
      |________|    |_____|        |    |         |  |
                                   |    |         |  |
                                   |    |         |  |
                                   |____|         |__|

      For false just swap "Image" and "Container" in the example above.
     */
    const isImageMoreLandscapyThanContainer = imgRatio > parentRatio;

    /*
      When isStretchingAllowed is false image is as big as it is, but as small as container
      (according to strategy - cover or fit).
      isStretchingAllowed is true if image is bigger then container.
     */
    const isStretchingAllowed = stretch;

    /*
      We do not want to show image until we finish deciding on sizing strategy.
      Though if it is a "fit" strategy we can display it right away, since it doesn't depend
      on isImageMoreLandscapyThanContainer nor it will change when isStretchingAllowed changes
      it's value after imgRatio and parentRatio get defined.
     */
    const showImage = isImageLoaded || isFitStrategy;

    const style: CSSProperties = {
      transform: 'translate(-50%, -50%)',
    };

    if (isStretchingAllowed) {
      if (isFitStrategy && isImageMoreLandscapyThanContainer) {
        /*
          Image matches its width to container's and height scales accordingly.

            Image       Container       Result
                       ┌─────────┐    ┌─────────┐
           ┌──────┐    │         │    ├─────────┤
           │▓▓▓▓▓▓│ -> │         │ => │▓▓▓▓▓▓▓▓▓│
           │▓▓▓▓▓▓│    │         │    │▓▓▓▓▓▓▓▓▓│
           └──────┘    │         │    ├─────────┤
                       └─────────┘    └─────────┘
         */
        style.width = percentSize;
      } else if (isFitStrategy && !isImageMoreLandscapyThanContainer) {
        /*
          Image matches its height to container's and width scales accordingly.
         */
        style.height = percentSize;
      } else if (isCoverStrategy && isImageMoreLandscapyThanContainer) {
        /*
          In order to cover whole container guaranteed (even in expense of stretching)
          image matches its height to container's. Width scales accordingly and crops out sides.

             Image       Container    Result (░ - is what cropped out)
                       ┌─────────┐    ┌──┬──────┬──┐
           ┌──────┐    │         │    │░░│▓▓▓▓▓▓│░░│
           │▓▓▓▓▓▓│ -> │         │ => │░░│▓▓▓▓▓▓│░░│
           │▓▓▓▓▓▓│    │         │    │░░│▓▓▓▓▓▓│░░│
           └──────┘    │         │    │░░│▓▓▓▓▓▓│░░│
                       └─────────┘    └──┴──────┴──┘
         */
        style.height = percentSize;
      } else if (isCoverStrategy && !isImageMoreLandscapyThanContainer) {
        style.width = percentSize;
      }
    } else {
      if (isFitStrategy) {
        /*
          We want image to be as wide and as height as container but not bigger then it's own size.

            Image       Container       Result
           ┌───────────┐    ┌─────────┐    ┌─────────┐
           │▓▓▓▓▓▓▓▓▓▓▓│    │         │    ├─────────┤
           │▓▓▓▓▓▓▓▓▓▓▓│    │         │    │▓▓▓▓▓▓▓▓▓│
           │▓▓▓▓▓▓▓▓▓▓▓│->  │         │ => │▓▓▓▓▓▓▓▓▓│
           └───────────┘    │         │    │▓▓▓▓▓▓▓▓▓│
                            │         │    ├─────────┤
                            └─────────┘    └─────────┘

         And if image is smaller it doesn't change its size

            Image       Container       Result
                       ┌──────────┐    ┌──────────┐
                       │          │    │          │
           ┌──────┐    │          │    │ ┌──────┐ │
           │▓▓▓▓▓▓│ -> │          │ => │ │▓▓▓▓▓▓│ │
           │▓▓▓▓▓▓│    │          │    │ │▓▓▓▓▓▓│ │
           └──────┘    │          │    │ └──────┘ │
                       │          │    │          │
                       └──────────┘    └──────────┘
         */
        style.maxWidth = percentSize;
        style.maxHeight = percentSize;
      } else if (isCoverStrategy && isImageMoreLandscapyThanContainer) {
        /*
          We want to fill container but we can't stretch an image if it's smaller then container.

            Image            Container       Result
           ┌────────────┐    ┌───────┐    ┌──┬───────┬──┐
           │▓▓▓▓▓▓▓▓▓▓▓▓│    │       │    │░░│▓▓▓▓▓▓▓│░░│
           │▓▓▓▓▓▓▓▓▓▓▓▓│    │       │    │░░│▓▓▓▓▓▓▓│░░│
           │▓▓▓▓▓▓▓▓▓▓▓▓│->  │       │ => │░░│▓▓▓▓▓▓▓│░░│
           │▓▓▓▓▓▓▓▓▓▓▓▓│    └───────┘    └──┴───────┴──┘
           └────────────┘

         */
        style.maxHeight = percentSize;
      } else if (isCoverStrategy && !isImageMoreLandscapyThanContainer) {
        style.maxWidth = percentSize;
      }
    }

    if (!showImage) {
      style.display = 'none';
    }

    if (previewOrientation && previewOrientation > 1) {
      const transform = getCssFromImageOrientation(previewOrientation);

      style.transform += ` ${transform}`;
    }

    return (
      <ImageComponent
        draggable={false}
        style={style}
        onLoad={this.onImageLoad}
        innerRef={this.imageRef}
        src={dataURI}
      />
    );
  }
}
