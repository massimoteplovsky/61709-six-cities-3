import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import {rootReducer} from "./reducers/reducer.js";
import {createAPI} from "./api.js";
import {requestFail} from "./actions/action-creators/application.js";
import {requireAuthorization} from "./actions/action-creators/user.js";
import {Authorization} from "./consts.js";

const onUnauthorized = () => {
  store.dispatch(requireAuthorization(Authorization.NO_AUTH));
};

const onRequestFail = (statusCode) => {
  store.dispatch(requestFail(statusCode));
};

const api = createAPI(onUnauthorized, onRequestFail);

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

export default store;
