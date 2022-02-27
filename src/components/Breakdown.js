import React, { Component } from "react";
import { changeChartColor } from "./ChartBuilder";
import Chart from "./Chart";
import "./Breakdown.css";

class Breakdown extends Component {
  state = { chartData: this.props.chartData };

  changeColor = () => {
    const { chartData } = this.state;
    var newColorChart = changeChartColor(chartData);
    this.setState({ chartData: newColorChart });
  };

  renderDebtOwed = (matrix, index) => {
    const len = matrix.length;
    const debtList = [];
    const key = matrix[index].key;
    const splitArray = matrix[index].splitArray;

    for (var i = 0; i < len; i++) {
      const name = splitArray[i].name;
      const amount = splitArray[i].amount;

      if (amount !== 0) {
        debtList.push(
          <div className="ui label label-debt">
            {name} owes {key}
            <div className="detail">${amount}</div>
          </div>
        );
      }
    }

    return debtList;
  };

  renderDebtBreakdownCards = () => {
    const { matrix, paidFor } = this.props;
    const len = paidFor.length;
    const cardList = [];

    for (var i = 0; i < len; i++) {
      const name = paidFor[i].name;
      const receiptNames = paidFor[i].receiptNames;
      cardList.push(
        <div className="ui card" key={i}>
          <div className="content">
            <div className="header">{name}'s Receipts</div>
            <div className="meta">{this.renderReceiptList(receiptNames)}</div>
            <div className="description">{this.renderDebtOwed(matrix, i)}</div>
          </div>
        </div>
      );
    }

    return <div>{cardList}</div>;
  };

  renderReceiptList = (receipts) => {
    const len = receipts.length;
    const receiptList = [];

    for (var i = 0; i < len; i++) {
      const receipt = receipts[i];
      receiptList.push(<div>{receipt}</div>);
    }

    return receiptList;
  };

  render() {
    return (
      <div>
        <Chart data={this.state.chartData} />
        <div className="container-button">
          <button className="ui button" onClick={this.changeColor}>
            <i className="paint brush icon"></i>Change Color
          </button>
        </div>
        <div className="container-cards">{this.renderDebtBreakdownCards()}</div>
        <br />
      </div>
    );
  }
}

export default Breakdown;
