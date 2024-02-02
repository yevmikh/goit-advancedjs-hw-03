import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';
const SELECTOR_END_POINT = `${BASE_URL}/breeds1`;
const EMAGE_END_POIND = `${BASE_URL}/images/search?`;
const API_KEY =
  'live_hYHqSU1vkpXeYjXQ3zdI4yWdoi0g8Rg34LE74zI7SScY4LWF3GhroxnVWF81pKGm';

axios.defaults.headers.common['x-api-key'] = API_KEY;

function fetchBreeds() {
  return axios.get(`${SELECTOR_END_POINT}`).then(res => res.data);
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`${EMAGE_END_POIND}breed_ids=${breedId}`)
    .then(res => res.data);
}

export { fetchBreeds, fetchCatByBreed };
