import { combineReducers } from 'redux';
import { personsReducer } from './personsReducer';

export const rootReduser = combineReducers({
  persons: personsReducer,
});
