// @flow

// gets called with a sythetic event and pulls the relevent value of of it
const translate = fn => e => {
  if (e.target) {
    const { target } = e;
    if (target.checked !== undefined) {
      fn(target.checked ? target.value : undefined);
    } else {
      fn(e.target.value);
    }
  }
  fn(e);
};

export default translate;
