export type Content = {
  ari: string;
  link: string;
  title: string;
};

export type Comment = {
  format: 'plain_text' | 'adf';
  value: string;
};
