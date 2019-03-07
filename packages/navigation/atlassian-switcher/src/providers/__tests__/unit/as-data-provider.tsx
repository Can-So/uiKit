import * as React from 'react';
import { shallow } from 'enzyme';
import asDataProvider from '../../as-data-provider';

const RESOLVED_VALUE = {};
const CHILDREN_PROP_RETURN_VALUE = 'TEST';
const EXPECTED_ERROR_VALUE = 'ERROR';

describe('as-data-provider', () => {
  const childrenPropMock = jest.fn();

  beforeEach(() => {
    childrenPropMock.mockReturnValue(CHILDREN_PROP_RETURN_VALUE);
    jest.useFakeTimers();
  });

  afterEach(() => {
    childrenPropMock.mockReset();
    jest.clearAllTimers();
  });

  it("should render what it's callback returns", () => {
    const resolvedPromise = Promise.resolve(RESOLVED_VALUE);
    const DataProvider = asDataProvider(() => resolvedPromise);

    const wrapper = shallow(<DataProvider>{childrenPropMock}</DataProvider>);
    expect(wrapper.contains(CHILDREN_PROP_RETURN_VALUE)).toBe(true);
    expect(childrenPropMock).toHaveBeenCalled();
  });
  it('should resolve with static data', () => {
    const DataProvider = asDataProvider(() => RESOLVED_VALUE);

    shallow(<DataProvider>{childrenPropMock}</DataProvider>);
    expect(childrenPropMock).toHaveBeenCalledTimes(2);
    expect(childrenPropMock.mock.calls[1][0].isLoading).toBe(false);
    expect(childrenPropMock.mock.calls[1][0].data).toBe(RESOLVED_VALUE);
    expect(childrenPropMock.mock.calls[1][0].error).toBe(null);
  });

  it('should send isLoading and data parameters to children render prop', () => {
    const promise = new Promise(accept =>
      setTimeout(() => accept(RESOLVED_VALUE), 100),
    );
    const DataProvider = asDataProvider(() => promise);

    shallow(<DataProvider>{childrenPropMock}</DataProvider>);
    expect(childrenPropMock).toHaveBeenCalledTimes(1);
    expect(childrenPropMock.mock.calls[0][0].isLoading).toBe(true);
    expect(childrenPropMock.mock.calls[0][0].data).toBe(null);
    expect(childrenPropMock.mock.calls[0][0].error).toBe(null);
    jest.runAllTimers();
    promise.then(() => {
      expect(childrenPropMock).toHaveBeenCalledTimes(2);
      expect(childrenPropMock.mock.calls[1][0].isLoading).toBe(false);
      expect(childrenPropMock.mock.calls[1][0].data).toBe(RESOLVED_VALUE);
      expect(childrenPropMock.mock.calls[1][0].error).toBe(null);
    });
  });

  it('should send an error parameter when the promise rejects', () => {
    const promise = new Promise((_, reject) =>
      setTimeout(() => reject(EXPECTED_ERROR_VALUE), 20),
    );
    const DataProvider = asDataProvider(() => promise);

    shallow(<DataProvider>{childrenPropMock}</DataProvider>);
    expect(childrenPropMock).toHaveBeenCalledTimes(1);
    expect(childrenPropMock.mock.calls[0][0].isLoading).toBe(true);
    expect(childrenPropMock.mock.calls[0][0].data).toBe(null);
    expect(childrenPropMock.mock.calls[0][0].error).toBe(null);
    jest.runAllTimers();
    setTimeout(() => {
      expect(childrenPropMock).toHaveBeenCalledTimes(2);
      expect(childrenPropMock.mock.calls[1][0].isLoading).toBe(false);
      expect(childrenPropMock.mock.calls[1][0].data).toBe(null);
      expect(childrenPropMock.mock.calls[1][0].error).toBe(
        EXPECTED_ERROR_VALUE,
      );
    }, 25);
  });
});
