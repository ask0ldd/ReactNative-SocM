import googleAPIKey from "@/googleAPIKeys"
import IGooglePlacesSearchCircle from "@/types/IGooglePlacesSearchCircle"
import IAutocompleteRequestBody from "@/types/requests/IAutoCompleteRequestBody"
import IGooglePlaceResponse from "@/types/responses/IGooglePlaceResponse"
import IGooglePlacesAutocompleteResponse from "@/types/responses/IGooglePlacesAutocompleteResponse"

export default class GooglePlacesService{

    private readonly autocompleteRequestBaseBody : IAutocompleteRequestBody = {
        input: "gym",
        includedPrimaryTypes: ["sports_complex", "gym", "fitness_center", "sports_club", "sports_activity_location"],
        locationBias: {
            circle: {
                center: {
                latitude: 0,
                longitude: 0
                },
                radius: 500.0
            }
        }
    }

    private readonly placeRequestBaseBody = {

    }

    private readonly APIUrls : Record<string, string> = {
        'autocomplete' : 'https://places.googleapis.com/v1/places:autocomplete',
        'place' : 'https://places.googleapis.com/v1/places/'
    }

    async getAutocompleteSuggestions(input : string, circle : IGooglePlacesSearchCircle) : Promise<IGooglePlacesAutocompleteResponse>{
        if (input.length < 3) return { suggestions: [] }
        try{
            const response = await fetch(this.APIUrls.autocomplete, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Goog-Api-Key': googleAPIKey
                },
                body: JSON.stringify({...this.autocompleteRequestBaseBody, input, locationBias : {circle}})
            })
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(
                    `Google Places Autocomplete failed: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
                );
            }
            const data = (await response.json()) as IGooglePlacesAutocompleteResponse
            return data   
        } catch (error : unknown){
            console.error(error)
            return {suggestions : []}
        }
    }

    async getPlaceDetails(placeId : string) : Promise<IGooglePlaceResponse | null>{
        try{
            const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Goog-Api-Key': googleAPIKey,
                    'X-Goog-FieldMask': 'location,displayName,formattedAddress'
                },
            })
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(
                    `Google Places Details failed: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`
                );
            }
            const data = (await response.json()) as IGooglePlaceResponse
            return data  
        } catch (error : unknown){
            console.error(error)
            return null
        }
    }
}

/* 
    arena *
    athletic_field
    fishing_charter *
    fishing_pond *
    fitness_center
    golf_course
    gym
    ice_skating_rink *
    playground *
    ski_resort
    sports_activity_location *
    sports_club
    sports_coaching *
    sports_complex
    stadium
    swimming_pool
*/