import asDataProvider from './as-data-provider';

const SOME_STATIC_DATA = {
  data: 'yay!',
};

export default asDataProvider(() => SOME_STATIC_DATA);
