import React, { Component } from "react";

class Like extends Component {
  state = {};
  render() {
    return (
      <i
        className="fa fa-heart"
        onClick={() => {
          this.props.onIconClicked(this.props.id);
        }}
      ></i>
    );
  }
}

export default Like;
