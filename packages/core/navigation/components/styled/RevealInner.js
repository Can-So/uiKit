import PropTypes from 'prop-types';
import styled from 'styled-components';
import { animationTime } from '../../shared-variables';
var transition = "height ".concat(animationTime, ", opacity ").concat(animationTime);
var RevealInner = styled.div.withConfig({
  displayName: "RevealInner",
  componentId: "sc-16hc41s-0"
})(["\n  flex-shrink: 0;\n  height: ", "px;\n  opacity: ", ";\n  transition: ", ";\n"], function (props) {
  return props.isOpen ? props.openHeight : 0;
}, function (props) {
  return props.isOpen ? 1 : 0;
}, function (props) {
  return props.shouldAnimate ? transition : 'none';
});
RevealInner.displayName = 'RevealInner';
RevealInner.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  openHeight: PropTypes.number.isRequired
};
export default RevealInner;