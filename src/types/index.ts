export type Tool = {
  name: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  date_added: string;
  logo: string;
  'data-ai-hint': string;
};

export type Category = {
  name: string;
  icon: string;
};
