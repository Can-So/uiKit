import { gridSize } from '@atlaskit/theme';

var externalContent = function externalContent(hasIframeLoaded) {
  return {
    visibility: hasIframeLoaded ? 'visible' : 'hidden',
    height: "calc(100% - ".concat(3 * gridSize(), "px)"),
    width: '100%',
    border: 0,
    flex: '1 1 auto'
  };
};

var spinnerWrapper = {
  display: 'flex',
  'justify-content': 'center',
  position: 'relative',
  top: '11.25rem'
};
export { externalContent, spinnerWrapper };