import styled from 'styled-components';
import { sizes } from '../constants';
export default styled.div.withConfig({
  displayName: "Skeleton",
  componentId: "sc-2h9vi0-0"
})(["\n  width: ", ";\n  height: ", ";\n  display: inline-block;\n  border-radius: 50%;\n  background-color: ", ";\n  opacity: ", ";\n"], function (props) {
  return sizes[props.size];
}, function (props) {
  return sizes[props.size];
}, function (_ref) {
  var color = _ref.color;
  return color || 'currentColor';
}, function (_ref2) {
  var weight = _ref2.weight;
  return weight === 'strong' ? 0.3 : 0.15;
});