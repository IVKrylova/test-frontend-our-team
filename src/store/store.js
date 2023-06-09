import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReduser } from './reducers/rootReduser ';
import thunk from 'redux-thunk';

const store = createStore(rootReduser, composeWithDevTools(applyMiddleware(thunk)));

export default store;
