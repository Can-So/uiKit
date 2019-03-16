export var sameProps = function sameProps(oldProps, newProps, props) {
  return props.find(function (p) {
    return oldProps[p] !== newProps[p];
  }) === undefined;
};