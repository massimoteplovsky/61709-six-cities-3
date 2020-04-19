import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/app/app";
import {Provider} from "react-redux";
import store from "./store.js";

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.querySelector(`#root`)
);
