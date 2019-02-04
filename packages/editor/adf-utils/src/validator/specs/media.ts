export default {
  props: {
    type: { type: 'enum', values: ['media'] },
    attrs: [
      {
        props: {
          type: { type: 'enum', values: ['link', 'file'] },
          id: { type: 'string', minLength: 1 },
          collection: { type: 'string' },
          height: { type: 'integer', optional: true },
          width: { type: 'integer', optional: true },
          occurrenceKey: { type: 'string', minLength: 1, optional: true },
        },
      },
      {
        props: {
          type: { type: 'enum', values: ['external'] },
          url: { type: 'string' },
          width: { type: 'integer', optional: true },
          height: { type: 'integer', optional: true },
        },
      },
    ],
  },
  required: ['attrs'],
};
