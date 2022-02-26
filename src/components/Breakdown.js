import React, { Component } from "react";
import Chart from "./Chart";
//import DebtDisplay from "./DebtDisplay";
import "./Breakdown.css";

class Breakdown extends Component {
  state = { chartData: this.props.chartData };
  render() {
    return (
      <div>
        <Chart data={this.state.chartData} />
      </div>
    );
  }
  //   if (this.state.infoLoaded === true) {
  //     return (
  //       <div>
  //         <div>
  //           <Chart data={this.state.main} />
  //           <div className="fields">
  //             <button
  //               className="ui icon button"
  //               type="button"
  //               onClick={this.changeColor}>
  //               <i className="paint brush icon"></i>
  //             </button>
  //           </div>
  //           <br />
  //           {/*<div>{this.display()}</div>*/}
  //           <div className="card-container">
  //             <div className="ui four cards">{this.cardDisplay()}</div>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div>
  //         <h1>Loading...</h1>
  //       </div>
  //     );
  //   }
  // }

  changeColor = () => {
    // var data = this.state.main;
    // var len = this.state.members.length;
    // var i, newColor;
    // for (i = 0; i < len; i++) {
    //   newColor = "#" + Math.random().toString(16).slice(2, 8).toUpperCase();
    //   data.datasets[0].backgroundColor[i] = newColor;
    //   data.datasets[0].hoverbackgroundColor[i] = newColor;
    // }
    // this.setState({ main: data });
  };

  cardDisplay = () => {
    // var m = this.state.oweMatrix;
    // var len = this.state.oweMatrix.length;
    // var i, x;
    // var keyIndex = 0;
    // var cards = [];
    // for (i = 0; i < len; i++) {
    //   x = m[i].key;
    //   cards.push(
    //     <div className="card" key={keyIndex}>
    //       <div className="content">
    //         <div className="center aligned header">{x}'s Receipts</div>
    //         <div className="description">{this.receiptDisplay(i)}</div>
    //       </div>
    //       <div className="extra content">
    //         <div className="description">{this.oweDisplay(i, x)}</div>
    //       </div>
    //     </div>
    //   );
    //   keyIndex++;
    // }
    // return <React.Fragment>{cards}</React.Fragment>;
  };

  receiptDisplay = (index) => {
    // var p = this.state.paidFor;
    // var len = p[index].paidFor.length;
    // var i;
    // var r = [];
    // var keyIndex = 0;
    // for (i = 0; i < len; i++) {
    //   r.push(
    //     <div className="item" key={keyIndex}>
    //       {p[index].paidFor[i]}
    //     </div>
    //   );
    //   keyIndex++;
    // }
    // return <div className="ui list">{r}</div>;
  };

  oweDisplay = (i, x) => {
    //   var m = this.state.oweMatrix;
    //   var len = m.length;
    //   var y, j, amt;
    //   var oweList = [];
    //   var keyIndex = 0;
    //   for (j = 0; j < len; j++) {
    //     y = m[i].member[j].name;
    //     amt = m[i].member[j].amt;
    //     if (amt !== 0) {
    //       oweList.push(
    //         <div className="ui label" key={keyIndex}>
    //           {y} owes {x} ${amt}
    //         </div>
    //       );
    //     } else {
    //       continue;
    //     }
    //     keyIndex++;
    //   }
    //   return <div className="ui large labels">{oweList}</div>;
    // };
  };
}
export default Breakdown;
