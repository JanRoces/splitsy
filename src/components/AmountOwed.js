import React, { Component } from "react";
import { LABEL_COLORS } from "../util";
import "./AmountOwed.css";

class AmountOwed extends Component {
  state = {
    allocate: this.props.total,
    customAmounts: this.props.splitCustomAmounts,
  };

  allocateIcon = () => {
    const allocateAmount = this.state.allocate;

    if (allocateAmount === 0.0) {
      return "green check circle icon";
    } else if (allocateAmount < 0) {
      return "red exclamation circle icon";
    } else {
      return "";
    }
  };

  setCustomSplitValue = (e) => {
    const total = this.props.total;
    var { allocate, customAmounts } = this.state;
    var len = customAmounts.length;
    var id = e.target.id;
    var customAmountsSum = 0;

    id = id.split("-")[1];
    customAmounts[id] = e.target.value;

    for (var i = 0; i < len; i++) {
      customAmountsSum += +customAmounts[i];
    }

    allocate = +total - +customAmountsSum;
    allocate = allocate.toFixed(2);

    this.setState({ allocate: allocate, customAmounts: customAmounts });
  };

  renderEvenSplitList = () => {
    const { participants, splitEvenAmount } = this.props;
    const len = participants.length;
    const splitList = [];

    var j = 0;
    var i;

    for (i = 0; i < len; i++) {
      j = j > 10 ? 0 : j;

      const name = participants[i];
      const id = name + i;

      splitList.push(
        <div className="ui left labeled input container-label-split" key={id}>
          <div className={`ui ${LABEL_COLORS[j]} label label-split`}>
            {name}
          </div>
          <input type="number" value={splitEvenAmount} readOnly></input>
        </div>
      );
      j++;
    }

    return splitList;
  };

  renderCustomInputs = () => {
    const participants = this.props.participants;
    const len = participants.length;

    var splitList = [];
    var j = 0;
    var i;

    for (i = 0; i < len; i++) {
      j = j > 10 ? 0 : j;

      const name = participants[i];
      const id = name + "-" + i;

      splitList.push(
        <div className="ui left labeled input container-label-split" key={id}>
          <div className={`ui ${LABEL_COLORS[j]} label label-split`}>
            {name}
          </div>
          <input
            id={id}
            type="number"
            placeholder="$ 0.00"
            min="0.00"
            step="0.01"
            onChange={this.setCustomSplitValue}></input>
        </div>
      );
      j++;
    }

    return (
      <div>
        <div className="inline field field-allocate">
          <div className="ui right pointing label">Amount to Allocate</div>
          <div className="ui icon input">
            <input
              className="input-allocate"
              value={`$ ${this.state.allocate}`}
              readOnly></input>
            <i className={this.allocateIcon()}></i>
          </div>
        </div>
        <div className="container-split-list">
          <div className="field field-center">{splitList}</div>
        </div>
      </div>
    );
  };

  render() {
    if (this.props.evenSplit) {
      return (
        <div className="container-split-list">{this.renderEvenSplitList()}</div>
      );
    } else if (this.props.customSplit) {
      return <div>{this.renderCustomInputs()}</div>;
    } else {
      return "";
    }
  }
}

export default AmountOwed;
