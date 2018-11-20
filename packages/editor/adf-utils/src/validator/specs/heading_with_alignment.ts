export default [
  {
    props: {
      marks: { type: 'array', items: [], optional: true },
      type: { type: 'enum', values: ['heading'] },
      content: {
        type: 'array',
        items: ['inline'],
        allowUnsupportedInline: true,
        optional: true,
      },
      attrs: { props: { level: { type: 'number', minimum: 1, maximum: 6 } } },
    },
  },
  { props: { marks: { type: 'array', items: ['alignment'], optional: true } } },
];
