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
    case personsActionTypes.GET_MORE_PERSONS:
      return {
        ...state,
        persons: action.payload,
      };
    case personsActionTypes.LIKE_PERSON:
      return {
        ...state,
        persons: action.payload,
      }
    case personsActionTypes.EDIT_AVATAR:
      return {
        ...state,
        persons: action.payload,
      }
    default:
      return state;
  }
}
