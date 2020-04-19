import * as React from "react";

interface State {
  activeIndex: number
}

const withActiveItem = (Component) => {

  type ComponentProps = React.ComponentProps<typeof Component>;

  class WithActiveItem extends React.PureComponent<ComponentProps, State> {
    constructor(props) {
      super(props);

      this.state = {
        activeIndex: 0
      };

      this.handleChangeActiveItem = this.handleChangeActiveItem.bind(this);
    }

    handleChangeActiveItem(index: number): void {
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
