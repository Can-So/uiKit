import * as tslib_1 from "tslib";
/**
 * Only used internally ATM
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Component } from 'react';
import { getCssFromImageOrientation, isRotated } from '@atlaskit/media-ui';
import { ImageComponent } from './styled';
var MediaImage = /** @class */ (function (_super) {
    tslib_1.__extends(MediaImage, _super);
    function MediaImage(props) {
        var _this = _super.call(this, props) || this;
        _this.onImageLoad = function () {
            if (!_this.imageRef || !_this.imageRef.current) {
                return;
            }
            _this.setState({
                isImageLoaded: true,
                imgWidth: _this.imageRef.current.naturalWidth,
                imgHeight: _this.imageRef.current.naturalHeight,
            });
        };
        _this.imageRef = React.createRef();
        _this.state = {
            isImageLoaded: false,
            imgWidth: 0,
            imgHeight: 0,
            parentWidth: Infinity,
            parentHeight: Infinity,
        };
        return _this;
    }
    // TODO FIL-4060 we need to check whether the dataURI changes in componentWillReceiveProps()
    // and if it does recalculate the image height and width
    MediaImage.prototype.componentDidMount = function () {
        var parent = ReactDOM.findDOMNode(this).parentElement;
        if (!parent) {
            return;
        }
        var _a = parent.getBoundingClientRect(), width = _a.width, height = _a.height;
        this.setState({
            parentWidth: width,
            parentHeight: height,
        });
    };
    MediaImage.prototype.render = function () {
        var _a = this.props, crop = _a.crop, stretch = _a.stretch, dataURI = _a.dataURI, previewOrientation = _a.previewOrientation;
        var _b = this.state, parentWidth = _b.parentWidth, parentHeight = _b.parentHeight, imgWidth = _b.imgWidth, imgHeight = _b.imgHeight, isImageLoaded = _b.isImageLoaded;
        var parentRatio = parentWidth / parentHeight;
        var imgRatio = imgWidth / imgHeight;
        var percentSize = '100%';
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
        var isCoverStrategy = crop;
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
        var isFitStrategy = !crop;
        var isImageRotated = isRotated(previewOrientation || 1);
        /*
          When photo has orientation of 90deg or 270deg (stored in EXIF meta data)
          things get very tricky. Let me go through an two examples to explain how we deal with that:
    
          Example #1:
    
          Image comes in as    ________    But it needs to be     ┌──────┐
          horizontal picture  |        |   displayed as 750x1000  │      │
          of 1000x750         |        |   because orientation    │      │
                              |________|   say it must be rotated │      │
                                           90 degrees             │      │
                                                                  └──────┘
    
          Container is smaller, and has dimensions of 100x200.
          So, input parameters are:
            parentWidth: 100
            parentHeight: 200
            imgWidth: 1000
            imgHeight: 750
            crop: true (means we want to cover)
            stretch: true
            previewOrientation: 6
    
          To see what true value of isImageMoreLandscapyThanContainer is we need to flip imgRatio.
          Since initial value is 1000/750 = 1.33 we can just do 1/1.3333 = 0.75.
    
          In this situation final values will be:
            imgRatio: 0.75
            parentRatio: 0.5
            isCoverStrategy: true
            isFitStrategy: false
            isImageRotated: true
            isImageMoreLandscapyThanContainer: true
            isStretchingAllowed: true
    
          According to this variables state css will become:
            height: 100%;
    
          Now here is what going to happened.
          FIRST, Browser will put an image with 1000x750 (NB! Not yet rotated) into the box 100x200
          and apply height: 100%.
    
          ┌────┬──────┬────┐  This will scale an image according to rules of proportions:
          │░░░░│▓▓▓▓▓▓│░░░░│  (https://en.wikipedia.org/wiki/Cross-multiplication#Rule_of_Three)
          │░░░░│▓▓▓▓▓▓│░░░░│  (orig img height) -> (scaled down img height)
          │░░░░│▓▓▓▓▓▓│░░░░│  750px             -> 200px  (is === container height, since `height: 100%`)
          └────┴──────┴────┘  (orig img width)  -> (scaled down img width)
                  ↑           1000px            -> (200 x 1000) / 750 = 266.66px
           266x200 image in
           100x200 container.
    
          And only NOW browser will apply rotate: 90deg and turn image around.
          And we end up with this:
    
          ┌──────────┐   Where 200x266 image
          │░░░░░░░░░░│   in the 100x200 container.
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
          (orig img height) -> (scaled down img height)
          750px             -> (0.75 x 200px) = 150px (since `height: 75%`)
          (orig img width)  -> (scaled down img width)
          1000px            -> (150 x 1000) / 750 = 200px
    
          ┌─┬──────┬─┐  Now 150x200 image
          │░│▓▓▓▓▓▓│░│  is in 100x200 container.
          │░│▓▓▓▓▓▓│░│
          │░│▓▓▓▓▓▓│░│
          │░│▓▓▓▓▓▓│░│
          └─┴──────┴─┘
    
          Unfortunately this is not over yet.
    
    
    
          Example #2:
    
          Input parameters:
            parentWidth: 100
            parentHeight: 200
            imgWidth: 1000
            imgHeight: 750
            crop: false (means we want to fit)  <-- This is only changed parameter
            stretch: true
            previewOrientation: 6
    
          Final variable values will be:
            imgRatio: 0.75
            parentRatio: 0.5
            isCoverStrategy: false
            isFitStrategy: true
            isImageRotated: true
            isImageMoreLandscapyThanContainer: true
            isStretchingAllowed: true
    
           According to this variables state css will become:
            width: 100%;
    
          FIRST, Browser will put an image with 1000x750 (NB! Not yet rotated) into the box 100x200
          and apply width: 100%.
    
          ┌────────┐  This will scale an image according to rules of proportions:
          │░░░░░░░░│  (https://en.wikipedia.org/wiki/Cross-multiplication#Rule_of_Three)
          ├────────┤  (orig img width)  -> (scaled down img width)
          │▓▓▓▓▓▓▓▓│  1000px            -> 100px (is === container width, since `width: 100%`)
          │▓▓▓▓▓▓▓▓│  (orig img height) -> (scaled down img height)
          ├────────┤  750px             -> (750x100) / 1000 = 75px
          │░░░░░░░░│
          └────────┘
              ↑
           100x75 image in
           100x200 container.
    
          Now browser will turn image 90degrees and we und up with:
          ┌──────────┐
          │          │  75x100 image in
          │ ┌──────┐ │  100x200 container
          │ │▓▓▓▓▓▓│ │
          │ │▓▓▓▓▓▓│ │
          │ │▓▓▓▓▓▓│ │
          │ └──────┘ │
          │          │
          └──────────┘
    
          This looks familiar, and you might want to try what we did before and apply 75% not 100%.
          Unfortunately this will make it even worse. If you do calculation you will find out that
          final result will be 75x56 image in 100x200 container. For this and one more specific
          variables state we need to use original imgRatio for percent size. In this case it's 1.333, so
          134%
    
          New math will look like this:
          (orig img width)  -> (scaled down img width)
          1000px            -> (100px * 1.34) = 134px (since `width: 134%`)
          (orig img height) -> (scaled down img height)
          750px             -> (750x134) / 1000 = 100px
    
          So, 100x134 image in 100x200 container.
         */
        if (isImageRotated) {
            imgRatio = 1 / imgRatio;
            percentSize = Math.ceil(imgRatio * 100) + "%";
        }
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
        var isImageMoreLandscapyThanContainer = imgRatio > parentRatio;
        /*
        This is two cases we need to cover as described in Example #2 above.
         */
        var needToFlipRatioBack = isImageRotated &&
            ((isFitStrategy && isImageMoreLandscapyThanContainer) ||
                (isCoverStrategy && !isImageMoreLandscapyThanContainer));
        if (needToFlipRatioBack) {
            percentSize = Math.ceil((1 / imgRatio) * 100) + "%";
        }
        /*
          When isStretchingAllowed is false image is as big as it is, but as small as container
          (according to strategy - cover or fit).
          isStretchingAllowed is true if image is bigger then container.
         */
        var isStretchingAllowed = stretch;
        /*
          We do not want to show image until we finish deciding on sizing strategy.
          Though if it is a "fit" strategy (and image hasn't been rotated) we can display it right away,
          since it doesn't depend on isImageMoreLandscapyThanContainer nor it will change when isStretchingAllowed
          changes it's value after imgRatio and parentRatio get defined.
          The reason for exclude isImageRotated is that we need to calculate percentSize variable
          and we can do that only when image is loaded (and we have image size)
         */
        var showImage = isImageLoaded || (isFitStrategy && !isImageRotated);
        var style = {
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
            }
            else if (isFitStrategy && !isImageMoreLandscapyThanContainer) {
                /*
                  Image matches its height to container's and width scales accordingly.
                 */
                style.height = percentSize;
            }
            else if (isCoverStrategy && isImageMoreLandscapyThanContainer) {
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
            }
            else if (isCoverStrategy && !isImageMoreLandscapyThanContainer) {
                style.width = percentSize;
            }
        }
        else {
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
            }
            else if (isCoverStrategy && isImageMoreLandscapyThanContainer) {
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
            }
            else if (isCoverStrategy && !isImageMoreLandscapyThanContainer) {
                style.maxWidth = percentSize;
            }
        }
        if (!showImage) {
            style.display = 'none';
        }
        if (previewOrientation && previewOrientation > 1) {
            var transform = getCssFromImageOrientation(previewOrientation);
            style.transform += " " + transform;
        }
        return (React.createElement(ImageComponent, { draggable: false, style: style, onLoad: this.onImageLoad, innerRef: this.imageRef, src: dataURI }));
    };
    MediaImage.defaultProps = {
        crop: true,
        stretch: false,
    };
    return MediaImage;
}(Component));
export { MediaImage };
//# sourceMappingURL=index.js.map