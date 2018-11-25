// @flow

/*
 * util to support defining url for the examples website to be used in webdriver tests.
 */

/**
 * @see https://www.browserstack.com/question/663
 */
const baseUrl = 'http://127.0.0.1:9000';

const getExampleUrl = (
  group: string,
  packageName: string,
  exampleName: string = '',
) =>
  `${baseUrl}/examples.html?groupId=${group}&packageId=${packageName}&exampleId=${exampleName}`;

module.exports = {
  baseUrl,
  getExampleUrl,
};
