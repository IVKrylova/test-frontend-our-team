import { personsActionTypes } from '../actionTypes/persons';

const initialState = {
  persons: [],
}

export const personsReducer = (state = initialState, action) => {
  switch(action.type) {
    case personsActionTypes.SET_PERSONS:
      return {
        ...state,
        persons: action.payload,
      };
    default:
      return state;
  }
}
