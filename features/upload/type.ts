export interface Book {
  title: string;
  author: string;
  highlights: Highlight[];
  coverUrl?: string;
  selected?: boolean;
}

export interface Highlight {
  info: string;
  quote: string;
}
