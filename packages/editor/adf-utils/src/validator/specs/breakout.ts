export default {
  props: {
    type: { type: 'enum', values: ['breakout'] },
    attrs: {
      props: { mode: { type: 'enum', values: ['full-width', 'wide'] } },
    },
  },
};
