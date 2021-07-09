import React, { Component } from "react";

class Like extends Component {
  state = {};

  getHeartClassName(isLiked) {
    console.log(isLiked)
    if (isLiked) {
      return "fa fa-heart";
    }
    return "fa fa-heart-o";
  }

  render() {
    return (
      <i
        className={this.getHeartClassName(this.props.liked)}
        onClick={
          this.props.onIconClicked(this.props.movie._id)
        }
        style={{ cursor: 'pointer' }}
      ></i>
    );
  }
}

export default Like;
