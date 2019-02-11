import memoizeOne from 'memoize-one';

export const getModalProps = memoizeOne((isModal: boolean) => {
  if (isModal) {
    return {
      searchThreshold: -1,
      controlShouldRenderValue: true,
    };
  }
  return {};
});
