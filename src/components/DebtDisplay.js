import React, { Component } from "react";

class DebtDisplay extends Component {
  state = { matrix: [] };

  componentDidMount() {
    this.setState({ matrix: this.props.matrix });
    console.log(this.state.matrix);
    console.log("hello");
  }
  render() {
    return <div>Debt Display{this.display()}</div>;
  }

  display = () => {
    var m = this.props.matrix;
    var len = this.props.members.length;
    var i, j, x, y;
    var amt = 0;
    console.log(m);
    console.log(len);

    // for (i = 0; i < len; i++) {
    //   x = m[i].key;
    //   for (j = 0; j < len; j++) {
    //     y = m[i].member[j].name;
    //     amt = m[i].member[j].amt;
    //     if (amt != 0) {
    //       return (
    //         <div>
    //           <label>{this.y}</label> owes <label>{this.x}</label>$ {this.amt}
    //         </div>
    //       );
    //     }
    //   }
    // }
  };
}

export default DebtDisplay;
