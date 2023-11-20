import axios from "axios";

const apiKey = "live_SOQUwbBJp7SdKrG9q4yg98wu5COkSubVNkG7GRxEQDaqsolCd1Ia5dgduy4S0u92";

axios.defaults.headers.common["x-api-key"] = apiKey;

export const fetchBreeds = async () => {
 
    const response = await axios.get("https://api.thecatapi.com/v1/breeds");
    return response.data;

};

export const fetchCatByBreed = async (breedId) => {

    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    return response.data;
};