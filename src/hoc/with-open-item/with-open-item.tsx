import * as React from "react";

interface State {
  isOpen: boolean
}

const withOpenItem = (Component) => {
  class WithOpenItem extends React.PureComponent<{}, State> {
    constructor(props) {
      super(props);

      this.state = {
        isOpen: false
      };

      this.handleOpenMode = this.handleOpenMode.bind(this);
    }

    handleOpenMode(status) {
      this.setState({
        isOpen: status
      });
    }

    render() {
      const {isOpen} = this.state;

      return (
        <Component
          {...this.props}
          isOpen={isOpen}
          onToggleOpenMode={this.handleOpenMode}
        />
      );
    }
  }

  return WithOpenItem;
};

export default withOpenItem;
