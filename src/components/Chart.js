import React, { Component } from "react";
import { Doughnut, Pie } from "react-chartjs-2";

class Chart extends Component {
  //state = { data: this.props.data };
  render() {
    return (
      <div>
        <div className="donut-chart">
          <Doughnut data={this.props.data} />
        </div>
      </div>
    );
  }
}

export default Chart;
