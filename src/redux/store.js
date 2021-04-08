import userReducer from './reducers/userReducer'
import tutorialsReducer from './reducers/tutorialsReducer'
import {devToolsEnhancer} from 'redux-devtools-extension';
import {createStore, combineReducers} from 'redux';

const rootReducer = combineReducers({
    userReducer,
    tutorialsReducer
})

export default createStore(rootReducer, devToolsEnhancer())