import {
  REQUIRE_AUTHORIZATION,
  LOAD_USER_INFO
} from "../type/user.js";
import {Authorization} from "../../consts.js";
import {loadAllOffers, loadFavoriteOffers} from "./offers.js";
import {Routes} from "../../consts.js";
import history from "../../history.js";

export const requireAuthorization = (status) => ({
  type: REQUIRE_AUTHORIZATION,
  payload: status
});

const saveUserInfoToState = (userInfo) => ({
  type: LOAD_USER_INFO,
  payload: userInfo
});

export const checkAuth = () => (dispatch, _, api) => {
  api.get(`/login`)
    .then((res) => {
      if (res.status === 200) {
        dispatch(requireAuthorization(Authorization.AUTH));
        dispatch(saveUserInfoToState(res.data));
        dispatch(loadFavoriteOffers());
      }
    });
};

export const login = (formData) => (dispatch, _, api) => {
  api.post(`/login`, formData)
    .then((res) => {
      dispatch(requireAuthorization(Authorization.AUTH));
      dispatch(loadFavoriteOffers());
      dispatch(saveUserInfoToState(res.data));
      dispatch(loadAllOffers());
      history.push(Routes.MAIN);
    });
};
