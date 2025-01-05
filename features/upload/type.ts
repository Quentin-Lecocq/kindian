export interface Book {
  title: string;
  highlights: Highlight[];
  selected?: boolean;
}

export interface Highlight {
  info: string;
  quote: string;
}
