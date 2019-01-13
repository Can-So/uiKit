import { fetchJson } from '../utils/fetch';
import withDataProviders from './with-data-provider';

export default withDataProviders(({ cloudId }) => {
  return {
    customLinks: fetchJson(
      `/gateway/api/activity/api/client/recent/containers?cloudId=${cloudId}`,
    ),
  };
});
