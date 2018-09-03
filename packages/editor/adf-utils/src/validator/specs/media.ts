export default {
  props: {
    type: { type: 'enum', values: ['media'] },
    attrs: [
      {
        props: {
          type: { type: 'enum', values: ['link', 'file'] },
          id: { type: 'string', minLength: 1 },
          collection: { type: 'string' },
          height: { type: 'number', optional: true },
          width: { type: 'number', optional: true },
          occurrenceKey: { type: 'string', minLength: 1, optional: true },
        },
      },
      {
        props: {
          type: { type: 'enum', values: ['external'] },
          url: { type: 'string' },
          width: { type: 'number', optional: true },
          height: { type: 'number', optional: true },
        },
      },
    ],
  },
  required: ['attrs'],
};
