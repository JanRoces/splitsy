import React, { Component } from "react";
import ReactDOM from "react-dom";

class ReceiptList extends Component {
  state = {
    details: this.props.details,
  };

  render() {
    return <div>{this.showList()}</div>;
  }

  showList = () => {
    var d = this.state.details;
    var len = d.length;
    var i;
    for (i = 0; i < len; i++) {
      return (
        <div>
          <button className="ui secondary basic button">{d[i].name}</button>
        </div>
      );
    }
  };
}

export default ReceiptList;
