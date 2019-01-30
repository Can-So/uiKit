// @flow
import { getMockProfileClient as getMockProfileClientUtil } from '../../mock-helpers';
import { AkProfileClient, modifyResponse } from '../../src';
import type { ProfilecardProps } from '../../src/types';

export const getMockProfileClient = (
  cacheSize: number,
  cacheMaxAge: number,
  extraProps: ProfilecardProps = {},
) => {
  const MockProfileClient = getMockProfileClientUtil(
    AkProfileClient,
    response => {
      return {
        ...modifyResponse(response),
        ...extraProps,
      };
    },
  );

  return new MockProfileClient({
    cacheSize,
    cacheMaxAge,
  });
};

export default null;
