export default interface IAutocompleteRequestBody {
  input: string;
  includedPrimaryTypes: string[];
  locationBias: {
    circle: {
      center: {
        latitude: number;
        longitude: number;
      };
      radius: number;
    };
  };
}