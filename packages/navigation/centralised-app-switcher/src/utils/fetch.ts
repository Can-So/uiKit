export const fetchJson = (url: string) =>
  fetch(url).then(response => response.json());

export const postJson = (url: string, data: any) =>
  fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(response => response.json());
