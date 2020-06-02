import React, { Component } from "react";
//import { Doughnut, Pie } from "react-chartjs-2";
import Chart from "./Chart";

class Breakdown extends Component {
  state = {
    allReceipts: this.props.allReceipts,
    main: {},
    members: this.props.members,
  };

  dataSet = [];

  componentDidMount() {
    this.mainData();
  }

  //test colors
  // "#FF5733",
  // "#FFDA33",
  // "#77FF33",
  // "#336BFF",
  // "#F333FF",
  mainData = () => {
    var data = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
          hoverbackgroundColor: [],
        },
      ],
    };

    var mem = this.state.members;
    var tmp = this.state.allReceipts;

    var rnum = 0;
    var i, j, color, name;

    for (i = 0; i < mem.length; i++) {
      data.labels.push(mem[i]);
      name = mem[i];
      for (j = 0; j < tmp.length; j++) {
        if (tmp[j].payer === name) {
          rnum = rnum + tmp[j].amount;
        }
      }
      color = "#" + Math.random().toString(16).slice(2, 8).toUpperCase();
      console.log("color: ", color);
      console.log("rnum: ", rnum);
      data.datasets[0].data.push(rnum);
      data.datasets[0].backgroundColor.push(color);
      data.datasets[0].hoverbackgroundColor.push(color);
      rnum = 0;
      console.log("data: ", data);
    }

    this.setState({ main: data });
    console.log(this.state);
  };

  render() {
    console.log(this.state);

    return (
      <div>
        <div>
          <Chart data={this.state.main} />
        </div>
      </div>
    );
  }
}

export default Breakdown;
