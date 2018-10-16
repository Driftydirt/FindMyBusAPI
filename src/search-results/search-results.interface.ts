export interface SearchResults {
  fromLocation: string;
  toLocation: string;
  results: SearchResult[];
}

export interface SearchResult {
  title: string;
  directions: string[];
}
