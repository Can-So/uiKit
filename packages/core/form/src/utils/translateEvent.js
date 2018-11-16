// @flow

// gets called with a sythetic event and pulls the relevent value of of it
const translate = fn => e => {
  if (e.target) {
    if (e.target.type === 'checkbox') {
      if (e.target.checked) {
        fn(e.target.value || true);
      } else {
        fn(e.target.value ? undefined : false);
      }
    } else {
      fn(e.target.value);
    }
  } else {
    fn(e);
  }
};

export default translate;
