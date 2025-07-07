interface Location {
  latitude: number;
  longitude: number;
}

interface DisplayName {
  text: string;
  languageCode: string;
}

export default interface IGooglePlacePartial {
  googlePlaceId: string
  formattedAddress: string
  location: Location
  displayName: DisplayName
}