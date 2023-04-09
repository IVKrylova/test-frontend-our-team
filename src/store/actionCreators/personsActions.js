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

export const likePerson = (persons, id) => {
  return {
    type: personsActionTypes.LIKE_PERSON,
    payload: persons.map(el => {
      if (el.id === id) {
        el.isLiked ? el.isLiked = false : el.isLiked = true;
      }
      return el;
    }),
  }
}

export const editAvatar = (persons, id, avatar) => {
  return {
    type: personsActionTypes.EDIT_AVATAR,
    payload: persons.map(el => {
      if (el.id === id) {
        el.avatar = avatar;
      }
      return el;
    }),
  }
}

export const clearPersons = () => {
  return {
    type: personsActionTypes.CLEAR_PERSONS,
    payload: [],
  }
}
