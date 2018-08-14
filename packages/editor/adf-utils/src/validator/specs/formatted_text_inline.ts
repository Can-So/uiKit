export default [
  'text',
  {
    props: {
      marks: {
        type: 'array',
        items: [
          [
            'em',
            'strike',
            'strong',
            'underline',
            'link',
            'subsup',
            'textColor',
            'action',
          ],
        ],
        optional: true,
      },
    },
  },
];
