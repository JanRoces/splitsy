import React, { Component } from "react";
import { Doughnut, Pie } from "react-chartjs-2";

class Chart extends Component {
  //state = { data: this.props.data };
  render() {
    return (
      <div>
        <div className="donut-chart">
          <Doughnut
            data={this.props.data}
            options={{
              height: "50%",
              width: "50%",
            }}
          />
        </div>
      </div>
    );
  }
}

export default Chart;
