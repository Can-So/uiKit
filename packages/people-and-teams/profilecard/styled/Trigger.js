import _taggedTemplateLiteral from "@babel/runtime/helpers/taggedTemplateLiteral";

function _templateObject4() {
  var data = _taggedTemplateLiteral(["translateX(", "px)"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["translateX(", "px)"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["translateY(", "px)"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["translateY(", "px)"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import styled, { keyframes } from 'styled-components';
import { akAnimationMixins } from '@atlaskit/util-shared-styles';
import { gridSize } from '@atlaskit/theme';
var createBold = akAnimationMixins.createBold,
    interpolate = akAnimationMixins.interpolate; // animation constants

var animDistance = 2 * gridSize();
var animDelay = 0.1;
var animTime = animDelay + 1; // properties to animate

var slideUp = {
  property: 'transform',
  value: interpolate(_templateObject(), function (t) {
    return t;
  }),
  deltas: [{
    from: animDistance,
    to: 0
  }]
};
var slideDown = {
  property: 'transform',
  value: interpolate(_templateObject2(), function (t) {
    return t;
  }),
  deltas: [{
    from: -animDistance,
    to: 0
  }]
};
var slideLeft = {
  property: 'transform',
  value: interpolate(_templateObject3(), function (t) {
    return t;
  }),
  deltas: [{
    from: animDistance,
    to: 0
  }]
};
var slideRight = {
  property: 'transform',
  value: interpolate(_templateObject4(), function (t) {
    return t;
  }),
  deltas: [{
    from: -animDistance,
    to: 0
  }]
};
var fadeIn = {
  property: 'opacity',
  deltas: [{
    from: 0,
    to: 1
  }]
};
var KEYFRAMES = {
  bottom: keyframes(["", ""], createBold([slideDown, fadeIn])),
  left: keyframes(["", ""], createBold([slideLeft, fadeIn])),
  right: keyframes(["", ""], createBold([slideRight, fadeIn])),
  top: keyframes(["", ""], createBold([slideUp, fadeIn]))
};
var KEYFRAMES_FLIPPED = {
  bottom: KEYFRAMES.top,
  left: KEYFRAMES.right,
  right: KEYFRAMES.left,
  top: KEYFRAMES.bottom
};
export var getKeyframeName = function getKeyframeName(props) {
  var position = props.position,
      isFlipped = props.isFlipped;
  var mainPosition = position.split(' ')[0];
  return isFlipped ? KEYFRAMES_FLIPPED[mainPosition] : KEYFRAMES[mainPosition];
};
export var AnimationWrapper = styled.div.withConfig({
  displayName: "Trigger__AnimationWrapper",
  componentId: "sc-1g1sd6n-0"
})(["\n  animation: ", " ", "s ", "s\n    backwards;\n"], function (props) {
  return getKeyframeName(props);
}, animTime, animDelay);