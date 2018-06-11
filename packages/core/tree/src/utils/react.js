//@flow

export const sameProps = (oldProps, newProps, props) =>
  props.find(p => oldProps[p] !== newProps[p]) === undefined;
