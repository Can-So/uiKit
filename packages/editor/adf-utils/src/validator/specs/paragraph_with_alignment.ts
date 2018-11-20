export default [
  {
    props: {
      marks: { type: 'array', items: [], optional: true },
      type: { type: 'enum', values: ['paragraph'] },
      content: {
        type: 'array',
        items: ['inline'],
        allowUnsupportedInline: true,
        optional: true,
      },
    },
  },
  { props: { marks: { type: 'array', items: ['alignment'], optional: true } } },
];
