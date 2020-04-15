import {
  LOAD_USER_INFO,
  REQUIRE_AUTHORIZATION
} from "../../actions/type/user.js";
import {Authorization} from "../../consts.js";

const initialState = {
  authorizationStatus: Authorization.NO_AUTH,
  userInfo: null
};

export const user = (state = initialState, {type, payload}) => {
  switch (type) {
    case LOAD_USER_INFO:
      return Object.assign(
          {},
          state,
          {userInfo: payload}
      );
    case REQUIRE_AUTHORIZATION:
      return Object.assign(
          {},
          state,
          {authorizationStatus: payload}
      );
    default:
      return state;
  }
};
