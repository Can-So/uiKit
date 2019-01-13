import withDataProviders from './with-data-provider';

const SOME_STATIC_DATA = {
  data: 'yay!',
};

export default withDataProviders(() => {
  return {
    staticData: SOME_STATIC_DATA,
  };
});
