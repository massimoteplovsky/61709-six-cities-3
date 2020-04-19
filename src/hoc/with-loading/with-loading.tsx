import * as React from "react";

interface State {
  loading: boolean
}

const withLoading = (Component) => {
  class WithLoading extends React.PureComponent<{}, State> {
    constructor(props) {
      super(props);

      this.state = {
        loading: true
      };

      this.handleChangeStatus = this.handleChangeStatus.bind(this);
    }

    handleChangeStatus(status: boolean, cb: () => void) {
      this.setState({loading: status}, () => {
        if (typeof cb === `function`) {
          cb();
        }
      });
    }

    render() {
      const {loading} = this.state;

      return (
        <Component
          {...this.props}
          isLoading={loading}
          onChangeLoadingStatus={this.handleChangeStatus}
        />
      );
    }
  }

  return WithLoading;
};

export default withLoading;
