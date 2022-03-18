import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import "./Chart.css";

const OPTIONS = {
  maintainAspectRatio: true,
  legend: { position: "bottom" },
  responsive: true,
};

const STYLE = {
  position: "relative !important",
};

const SIZE = {
  width: "500",
  height: "500",
};

class Chart extends Component {
  render() {
    return (
      <div>
        <div className="container-donut">
          <Doughnut
            data={this.props.data}
            width={SIZE.width}
            height={SIZE.height}
            options={OPTIONS}
            style={STYLE}
          />
        </div>
      </div>
    );
  }
}

export default Chart;
