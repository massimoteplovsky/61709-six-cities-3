import React from "react";
import {PropTypes} from "prop-types";
import {connect} from "react-redux";

const ServerError = ({statusCode}) => {
  return (
    <div className="page" style={{background: `transparent`}}>
      <div
        style={{
          paddingTop: `100px`,
          paddingBottom: `100px`,
          textAlign: `center`
        }}
        className="container"
      >
        <p style={{
          fontSize: `30px`,
          fontWeight: `bold`,
          marginBottom: `0`
        }}>
          Server responses with status code: {statusCode}
        </p>
      </div>
    </div>
  );
};

ServerError.propTypes = {
  statusCode: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
  statusCode: state.application.statusCode
});

export default connect(mapStateToProps)(ServerError);
