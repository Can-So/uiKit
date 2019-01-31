export const fetchJson = (url: string) =>
  fetch(url).then(response => response.json());
