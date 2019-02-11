export const fetchJson = <T>(url: string): Promise<T> =>
  fetch(url).then(response => response.json());

export const postJson = <T>(url: string, data: any): Promise<T> =>
  fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(response => response.json());
