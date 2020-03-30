import React, {PureComponent} from "react";

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeIndex: 0
      };

      this.handleChangeActiveItem = this.handleChangeActiveItem.bind(this);
    }

    handleChangeActiveItem(index) {
      this.setState({activeIndex: index});
    }

    render() {
      const {activeIndex} = this.state;

      return (
        <Component
          {...this.props}
          activeIndex={activeIndex}
          onChangeActiveItem={this.handleChangeActiveItem}
        />
      );
    }
  }

  return WithActiveItem;
};

export default withActiveItem;
