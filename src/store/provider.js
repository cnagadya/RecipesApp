import React from "react";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import { recipesReducer } from "./recipes";
import { Provider } from "react-redux";

const middleware = [thunk];

const rootReducer = combineReducers({
  stateObj: recipesReducer
});

export default ({ children, initialState = {} }) => {
  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware))
  );

  return <Provider store={store}>{children}</Provider>;
};
