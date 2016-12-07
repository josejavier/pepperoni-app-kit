import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';
import {getPlace, getAnotherPlace} from '../../services/randomResponseService';
import * as NavigationState from '../../modules/navigation/NavigationState';

// Initial state
const initialState = Map({
  value: '',
  loading: false,
  place: {}
});

// Actions
const REQUEST_CITY = 'REQUEST_CITY';
export const RESPONSE_SUCCESS_CITY = 'RESPONSE_SUCCESS_CITY';
export const RESPONSE_FAILURE_CITY = 'RESPONSE_FAILURE_CITY';

const REQUEST_LOCATION = 'REQUEST_LOCATION';
export const RESPONSE_SUCCESS_LOCATION = 'RESPONSE_SUCCESS_LOCATION';
export const RESPONSE_FAILURE_LOCATION = 'RESPONSE_FAILURE_LOCATION';

// Action creators
export function selectCity(city) {
  return {
    type: REQUEST_CITY,
    payload: city
  };
}

export function retryPlace(city, oldPlace) {
  return {
    type: REQUEST_LOCATION,
    payload: {
      city,
      oldPlace
    }
  };
}

// Reducer
export default function CityStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case REQUEST_CITY:
      return loop(
        state
          .set('loading', true)
          .set('value', action.payload),
        Effects.promise(getPlace, action.payload)
      );
    case RESPONSE_SUCCESS_CITY:
      return loop(
          state
            .set('loading', false)
            .set('place', action.payload),
          Effects.constant(NavigationState.pushRoute({
            key: 'Location',
            title: state.get('value')
          }))
        );

    case RESPONSE_FAILURE_CITY:
      return state
        .set('loading', false)
        .set('errorMessage', action.payload);

    case REQUEST_LOCATION:
      return loop(
        state
          .set('loading', true)
          .set('value', action.payload.city),
        Effects.promise(getAnotherPlace, action.payload.city, action.payload.oldPlace)
      );

    case RESPONSE_SUCCESS_LOCATION:
      console.log('RESPONSE_SUCCESS ', action.payload);
      return state
        .set('loading', false)
        .set('place', action.payload);

    case RESPONSE_FAILURE_LOCATION:
      return state
        .set('loading', false)
        .set('errorMessage', action.payload);

    default:
      return state;
  }
}
