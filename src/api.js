import axios from "axios";
import {convertObjectKeys} from "./helpers.js";
import history from "./history.js";

const Errors = {
  REQUEST_ERRORS: [400, 404],
  SERVER_ERROR: 500,
  NO_AUTHORIZED: 401
};

export const createAPI = (onUnauthorized, onRequestFail) => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-3.appspot.com/six-cities`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return convertObjectKeys(response);
  };

  const onFail = (err) => {
    const {response, request} = err;

    if (!response || Errors.REQUEST_ERRORS.includes(response.status) || response.status >= Errors.SERVER_ERROR) {
      onRequestFail(response.status);
      return err;
    }

    if (response.status === Errors.NO_AUTHORIZED) {
      onUnauthorized();
      if (!request.responseURL.includes(`login`)) {
        history.push(`/signin`);
      }

      return err;
    }

    return err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
