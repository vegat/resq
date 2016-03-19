import {createStore, applyMiddleware, compose, Middleware, combineReducers} from 'redux';
import {fromJS, Map} from "immutable";

import user from "./lib/user/reducer";
import contacts from "./lib/contacts/reducer";
import request from "./lib/request/reducer";
import userRegisterMiddleware from './middlewares/user/register';

let store;

function getInitialState(source) {
    let immutableState = {};
    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            immutableState[key] = fromJS(source[key]);
        }
    }
    return immutableState;
}

let reducers = combineReducers({
    user,
    request,
    allContacts: contacts,
    iceContacts: contacts
});

let data = {};

import Validator from 'redux-validator';

const validator = Validator();
const createStoreWithMiddleware = applyMiddleware(
  validator,
  userRegisterMiddleware
)(createStore);

export default store = createStoreWithMiddleware(reducers, getInitialState(data), compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));
