export default {
  props: {
    type: { type: 'enum', values: ['taskList'] },
    content: { type: 'array', items: ['taskItem'], minItems: 1 },
    attrs: { props: { localId: { type: 'string' } } },
  },
};
