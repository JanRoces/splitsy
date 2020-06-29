import React, { Component } from "react";
import { Doughnut, Pie } from "react-chartjs-2";

class Chart extends Component {
  //state = { data: this.props.data };
  render() {
    return (
      <div>
        <div className="donut-chart-container">
          <Doughnut
            data={this.props.data}
            width={300}
            height={300}
            options={{ maintainAspectRatio: false }}
          />
        </div>
      </div>
    );
  }
}

export default Chart;
