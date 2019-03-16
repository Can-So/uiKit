import { css } from 'styled-components';
import * as colors from './colors';
import { gridSize, fontSize } from './index';

var baseHeading = function baseHeading(size, lineHeight) {
  return "\n  font-size: ".concat(size / fontSize(), "em;\n  font-style: inherit;\n  line-height: ").concat(lineHeight / size, ";\n");
};

export var h900 = function h900() {
  return css(["\n  ", " color: ", ";\n  font-weight: 500;\n  letter-spacing: -0.01em;\n  margin-top: ", "px;\n"], baseHeading(35, 40), colors.heading, gridSize() * 6.5);
};
export var h800 = function h800() {
  return css(["\n  ", " color: ", ";\n  font-weight: 600;\n  letter-spacing: -0.01em;\n  margin-top: ", "px;\n"], baseHeading(29, 32), colors.heading, gridSize() * 5);
};
export var h700 = function h700() {
  return css(["\n  ", " color: ", ";\n  font-weight: 500;\n  letter-spacing: -0.01em;\n  margin-top: ", "px;\n"], baseHeading(24, 28), colors.heading, gridSize() * 5);
};
export var h600 = function h600() {
  return css(["\n  ", " color: ", ";\n  font-weight: 500;\n  letter-spacing: -0.008em;\n  margin-top: ", "px;\n"], baseHeading(20, 24), colors.heading, gridSize() * 3.5);
};
export var h500 = function h500() {
  return css(["\n  ", " color: ", ";\n  font-weight: 600;\n  letter-spacing: -0.006em;\n  margin-top: ", "px;\n"], baseHeading(16, 20), colors.heading, gridSize() * 3);
};
export var h400 = function h400() {
  return css(["\n  ", " color: ", ";\n  font-weight: 600;\n  letter-spacing: -0.003em;\n  margin-top: ", "px;\n"], baseHeading(14, 16), colors.heading, gridSize() * 2);
};
export var h300 = function h300() {
  return css(["\n  ", " color: ", ";\n  font-weight: 600;\n  margin-top: ", "px;\n  text-transform: uppercase;\n"], baseHeading(12, 16), colors.heading, gridSize() * 2.5);
};
export var h200 = function h200() {
  return css(["\n  ", " color: ", ";\n  font-weight: 600;\n  margin-top: ", "px;\n"], baseHeading(12, 16), colors.subtleHeading, gridSize() * 2);
};
export var h100 = function h100() {
  return css(["\n  ", " color: ", ";\n  font-weight: 700;\n  margin-top: ", "px;\n"], baseHeading(11, 16), colors.subtleHeading, gridSize() * 2);
};