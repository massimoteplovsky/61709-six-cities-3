export const getAuthStatus = (state) => {
  return state.user.authorizationStatus;
};

export const getUserInfo = (state) => {
  return state.user.userInfo;
};
