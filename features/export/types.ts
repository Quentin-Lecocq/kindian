export interface Book {
  id: string;
  title: string;
  author: string;
  highlights: Highlight[];
  selected?: boolean;
}

export interface Highlight {
  info: string;
  quote: string;
}
