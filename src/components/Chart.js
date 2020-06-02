import React, { Component } from "react";
import { Doughnut, Pie } from "react-chartjs-2";

class Chart extends Component {
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
