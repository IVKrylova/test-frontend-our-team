import { personsActionTypes } from '../actionTypes/persons';

export const setPersons = (persons) => {
  return {
    type: personsActionTypes.SET_PERSONS,
    payload: persons,
  }
}
