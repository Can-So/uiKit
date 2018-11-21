export default {
  props: {
    type: { type: 'enum', values: ['listItem'] },
    content: {
      type: 'array',
      items: [
        ['paragraph_with_no_marks', 'mediaSingle'],
        ['paragraph_with_no_marks', 'bulletList', 'mediaSingle', 'orderedList'],
      ],
      minItems: 1,
    },
  },
};
