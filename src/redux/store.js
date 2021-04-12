import userReducer from "./reducers/userReducer";
import tutorialsReducer from "./reducers/tutorialsReducer";
import historyReducer from "./reducers/historyReducer";
import { devToolsEnhancer } from "redux-devtools-extension";
import { createStore, combineReducers } from "redux";

const rootReducer = combineReducers({
  userReducer,
  tutorialsReducer,
  historyReducer,
});

export default createStore(rootReducer, devToolsEnhancer());
