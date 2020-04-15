import {
  REQUEST_FAIL
} from "../../actions/type/application.js";

const initialState = {
  error: false,
  statusCode: null
};

export const application = (state = initialState, {type, payload}) => {
  switch (type) {
    case REQUEST_FAIL:
      const {error, statusCode} = payload;
      return Object.assign(
          {},
          state,
          {
            error,
            statusCode
          }
      );
    default:
      return state;
  }
};
