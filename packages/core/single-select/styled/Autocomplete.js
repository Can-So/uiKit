import styled, { css } from 'styled-components';
import { colors, gridSize, math } from '@atlaskit/theme';
import placeholderStyles from './placeholderStyles';
/* Placeholder has been temporarily inlined until we have a helper library for such things */

var getPlaceholderStyle = function getPlaceholderStyle(style) {
  return css(["\n  &::-webkit-input-placeholder {\n    /* WebKit, Blink, Edge */\n    ", ";\n  }\n  &::-moz-placeholder {\n    /* Mozilla Firefox 19+ */\n    ", " opacity: 1;\n  }\n  &::-ms-input-placeholder {\n    /* Microsoft Edge */\n    ", ";\n  }\n  &:-moz-placeholder {\n    /* Mozilla Firefox 4 to 18 */\n    ", " opacity: 1;\n  }\n  &:-ms-input-placeholder {\n    /* Internet Explorer 10-11 */\n    ", ";\n  }\n"], style, style, style, style, style);
};

var AutocompleteWrapper = styled.div.withConfig({
  displayName: "Autocomplete__AutocompleteWrapper",
  componentId: "i8d2m3-0"
})(["\n  flex: 1 1 auto;\n  white-space: nowrap;\n  padding: 0 ", "px;\n"], gridSize);
AutocompleteWrapper.displayName = 'SingleSelectAutocompleteWrapper';
var AutocompleteInput = styled.input.withConfig({
  displayName: "Autocomplete__AutocompleteInput",
  componentId: "i8d2m3-1"
})(["\n  background: none;\n  border: 0;\n  color: ", ";\n  font-size: 14px;\n  margin: 0;\n  min-height: ", "px;\n  outline: 0;\n  padding: 0;\n  width: 100%;\n\n  ", ";\n"], colors.heading, math.multiply(gridSize, 4.5), getPlaceholderStyle(placeholderStyles));
AutocompleteInput.displayName = 'SingleSelectAutocompleteInput';
export default AutocompleteInput;
export { AutocompleteInput, AutocompleteWrapper };