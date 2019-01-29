import asDataProvider from '../../src/providers/as-data-provider';

interface MockDataStructure {
  data: string;
}

const SOME_STATIC_DATA: MockDataStructure = {
  data: 'yay!',
};

export default asDataProvider<
  DataProviderProps<MockDataStructure>,
  MockDataStructure
>(() => SOME_STATIC_DATA);
