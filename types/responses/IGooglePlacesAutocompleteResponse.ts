type Match = {
  endOffset: number;
};

type TextPrediction = {
  text: string;
  matches: Match[];
};

type PlacePrediction = {
  place: string; // e.g. "places/ChIJ5YQQf1GHhYARPKG7WLIaOko"
  placeId: string;
  text: TextPrediction;
  // ...other possible fields (add as needed)
};

type QueryPrediction = {
  text: TextPrediction;
  // ...other possible fields (add as needed)
};

export type TSuggestion =
  | { placePrediction: PlacePrediction }
  | { queryPrediction: QueryPrediction };

interface IGooglePlacesAutocompleteResponse {
  suggestions: TSuggestion[];
};

export default IGooglePlacesAutocompleteResponse