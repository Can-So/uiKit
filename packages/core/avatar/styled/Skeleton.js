import styled from 'styled-components';
import { AVATAR_SIZES, AVATAR_RADIUS, BORDER_WIDTH } from './constants';
export default styled.div.withConfig({
  displayName: "Skeleton",
  componentId: "sc-1wbn63x-0"
})(["\n  width: ", "px;\n  height: ", "px;\n  display: inline-block;\n  border-radius: ", ";\n  background-color: ", ";\n  border: ", "px solid transparent;\n  opacity: ", ";\n"], function (_ref) {
  var size = _ref.size;
  return AVATAR_SIZES[size];
}, function (_ref2) {
  var size = _ref2.size;
  return AVATAR_SIZES[size];
}, function (props) {
  return props.appearance === 'square' ? "".concat(AVATAR_RADIUS[props.size], "px") : '50%';
}, function (_ref3) {
  var color = _ref3.color;
  return color || 'currentColor';
}, function (_ref4) {
  var size = _ref4.size;
  return BORDER_WIDTH[size];
}, function (_ref5) {
  var weight = _ref5.weight;
  return weight === 'strong' ? 0.3 : 0.15;
});