import {
  REQUEST_FAIL
} from "../type/application";

export const requestFail = (statusCode) => ({
  type: REQUEST_FAIL,
  payload: {
    error: true,
    statusCode
  }
});
