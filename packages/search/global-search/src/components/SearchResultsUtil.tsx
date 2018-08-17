export const ADVANCED_CONFLUENCE_SEARCH_RESULT_ID = 'search_confluence';
export const ADVANCED_JIRA_SEARCH_RESULT_ID = 'search_jira';
export const ADVANCED_PEOPLE_SEARCH_RESULT_ID = 'search_people';

export const isAdvancedSearchResult = (resultId: string) =>
  [
    ADVANCED_CONFLUENCE_SEARCH_RESULT_ID,
    ADVANCED_JIRA_SEARCH_RESULT_ID,
    ADVANCED_PEOPLE_SEARCH_RESULT_ID,
  ].some(advancedResultId => advancedResultId === resultId);

export function getConfluenceAdvancedSearchLink(query?: string) {
  const queryString = query ? `?queryString=${encodeURIComponent(query)}` : '';
  return `/wiki/dosearchsite.action${queryString}`;
}

export function redirectToConfluenceAdvancedSearch(query = '') {
  // XPSRCH-891: this breaks SPA navigation. Consumer needs to pass in a redirect/navigate function.
  window.location.assign(getConfluenceAdvancedSearchLink(query));
}

export function take<T>(array: Array<T>, n: number) {
  return (array || []).slice(0, n);
}

export function isEmpty<T>(array: Array<T>) {
  return array.length === 0;
}

/**
 *
 * Gracefully handle promise catch and returning default value
 * @param promise promise to handle its catch block
 * @param defaultValue value returned by the promise in case of error
 * @param errorHandler function to be called in case of promise rejection
 */
export function handlePromiseError<T>(
  promise: Promise<T>,
  defaultValue?: T,
  errorHandler?: ((reason: any) => T | void),
): Promise<T | undefined> {
  return promise.catch(error => {
    try {
      if (errorHandler) {
        errorHandler(error);
      }
    } catch {}
    return defaultValue;
  });
}
