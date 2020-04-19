import * as React from "react";
import {getApplicationStatus} from "../../selectors/application";
import {connect} from "react-redux";

interface Props {
  app: {
    error: boolean,
    statusCode: number
  }
}

const ServerError: React.FC<Props> = (props: Props) => {

  const {app} = props;

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
          Server responses with status code: {app.statusCode}
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  app: getApplicationStatus(state)
});

export default connect(mapStateToProps)(ServerError);
