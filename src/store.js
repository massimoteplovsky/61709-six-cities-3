import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import {rootReducer} from "./reducers/reducer.js";
import {createAPI} from "./api.js";
//import {requestFail} from "./actions/action-creators/application-actions/application-actions.js";
//import {requireAuthorization} from "./actions/action-creators/user-actions/user-actions.js";
//import {NO_AUTH} from "./consts.js";

// const onUnauthorized = () => {
//   store.dispatch(requireAuthorization(NO_AUTH));
// };

// const onRequestFail = () => {
//   store.dispatch(requestFail());
// };

const api = createAPI();

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

export default store;
