import * as React from "react";
import {connect} from "react-redux";
import {getAuthStatus} from "../../selectors/user";
import {Authorization, ProtectionType, Routes} from "../../consts";
import {Redirect} from "react-router-dom";

interface Props {
  authorizationStatus: string
}

const withAuth = (Component, protectionType) => {

  const WithAuth: React.FC<Props> = (props: Props) => {

    const {authorizationStatus} = props;

    if (authorizationStatus === Authorization.AUTH) {
      if (protectionType === ProtectionType.AUTH_USER) {
        return <Redirect to={Routes.MAIN}/>;
      }
    } else {
      if (protectionType === ProtectionType.UNAUTH_USER) {
        return <Redirect to={Routes.SIGN_IN}/>;
      }
    }

    return (
      <Component/>
    );
  };

  const mapStateToProps = (state) => ({
    authorizationStatus: getAuthStatus(state)
  });

  return connect(mapStateToProps)(WithAuth);

};

export default withAuth;
