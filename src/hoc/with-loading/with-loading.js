import React, {PureComponent} from "react";

const withLoading = (Component) => {
  class WithLoading extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        loading: true
      };

      this.handleChangeStatus = this.handleChangeStatus.bind(this);
    }

    handleChangeStatus(status, cb) {
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
