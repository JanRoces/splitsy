import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

class Chart extends Component {
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
