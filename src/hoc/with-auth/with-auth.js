import React from "react";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import {getAuthStatus} from "../../selectors/user";
import {Authorization, ProtectionType} from "../../consts.js";
import {Redirect} from "react-router-dom";

const withAuth = (Component, protectionType) => {

  const WithAuth = ({authorizationStatus}) => {

    if (authorizationStatus === Authorization.AUTH) {
      if (protectionType === ProtectionType.AUTH_USER) {
        return <Redirect to="/"/>;
      }
    } else {
      if (protectionType === ProtectionType.UNAUTH_USER) {
        return <Redirect to="/signin"/>;
      }
    }

    return (
      <Component/>
    );
  };

  WithAuth.propTypes = {
    authorizationStatus: PropTypes.string.isRequired
  };

  const mapStateToProps = (state) => ({
    authorizationStatus: getAuthStatus(state)
  });

  return connect(mapStateToProps)(WithAuth);

};

export default withAuth;
