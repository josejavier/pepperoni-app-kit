import {
  RESPONSE_SUCCESS_CITY,
  RESPONSE_FAILURE_CITY,
  RESPONSE_SUCCESS_LOCATION,
  RESPONSE_FAILURE_LOCATION
} from '../modules/city/CityState';

function generateRandomResponse(city) {
  // Load sample locations from JSON file
  var offices = require('../data/sampleLocations.json');
  var places = offices[city].places;
  // Randomly pick a place up from the city places
  var randomPicker = () => Math.floor(Math.random() * places.length);
  var place = places[randomPicker()];
  console.log('randomResponseService - place: ', place);
  return place;
}

export function getAnotherPlace(city, oldPlace) {
  const min = 500;
  const max = 3000;
  var newPlace = oldPlace;
  while (newPlace.name === oldPlace.name) {
    newPlace = generateRandomResponse(city);
    console.log('getAnotherPlace - new newPlace: ', newPlace);
  }

  return new Promise((res) => setTimeout(res, addDelay(min, max)))
    .then(() => ({type: RESPONSE_SUCCESS_LOCATION, payload: newPlace}))
    .catch((error) => ({type: RESPONSE_FAILURE_LOCATION, payload: error.message}));
}

export function getPlace(city) {
  const min = 500;
  const max = 3000;
  let place = generateRandomResponse(city);
  console.log('getPlace - place: ', place);
  return new Promise((res) => setTimeout(res, addDelay(min, max)))
    .then(() => ({type: RESPONSE_SUCCESS_CITY, payload: place}))
    .catch((error) => ({type: RESPONSE_FAILURE_CITY, payload: error.message}));
}

// simulate an asynchronous operation that can last between min (included) and max (excluded)
function addDelay(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
