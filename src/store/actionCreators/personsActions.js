import { personsActionTypes } from '../actionTypes/persons';

export const setPersons = (persons) => {
  return {
    type: personsActionTypes.SET_PERSONS,
    payload: persons,
  }
}

export const getMorePersons = (persons, newPersons) => {
  return {
    type: personsActionTypes.GET_MORE_PERSONS,
    payload: [...persons, ...newPersons],
  }
}
