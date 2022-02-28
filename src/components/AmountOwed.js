import React, { Component } from "react";
import { LABEL_COLORS } from "../util";
import "./AmountOwed.css";

class AmountOwed extends Component {
  state = {
    customAmounts: this.props.splitCustomAmounts,
  };

  addReceipt = () => {
    this.props.onAddReceipt();
  };

  allocateIcon = () => {
    const allocateAmount = this.calculateAllocation();
    const zeroAmount = 0;
    const zeroFixed = zeroAmount.toFixed(2);
    const { customAmounts } = this.state;
    const len = customAmounts.length;
    var customAmountsSum = 0;

    for (var i = 0; i < len; i++) {
      customAmountsSum += +customAmounts[i];
    }

    if (allocateAmount === zeroFixed && customAmountsSum !== 0) {
      return "green check circle icon";
    } else if (allocateAmount < 0) {
      return "red exclamation circle icon";
    } else {
      return "";
    }
  };

  calculateAllocation = () => {
    const { customAmounts } = this.state;
    const { total } = this.props;
    const len = customAmounts.length;

    var customAmountsSum = 0;
    var allocateAmount = 0;

    for (var i = 0; i < len; i++) {
      customAmountsSum += +customAmounts[i];
    }

    allocateAmount = +total - +customAmountsSum;
    allocateAmount = allocateAmount.toFixed(2);

    return allocateAmount;
  };

  setCustomSplitValue = (e) => {
    var { customAmounts } = this.state;
    var id = e.target.id;

    id = id.split("-")[1];
    customAmounts[id] = e.target.value;

    this.setState({ customAmounts: customAmounts });
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

    return <div className="container-split-list">{splitList}</div>;
  };

  renderCustomInputs = () => {
    const { customAmounts } = this.state;
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
            value={customAmounts[i]}
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
              value={`$ ${this.calculateAllocation()}`}
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

  renderAddReceiptButton = (splitType) => {
    const { editMode, splitEvenAmount, title } = this.props;
    const zeroAmount = 0;
    const zeroFixed = zeroAmount.toFixed(2);
    const allocateAmount = this.calculateAllocation();
    const buttonText = editMode ? "Update Receipt" : "Add Receipt";
    const isDisabled =
      (splitType === "even" || allocateAmount === zeroFixed) &&
      splitEvenAmount !== 0 &&
      splitEvenAmount !== zeroFixed &&
      title
        ? false
        : true;

    return (
      <div className="container-button-add-receipt">
        <button
          className="ui button"
          type="button"
          disabled={isDisabled}
          onClick={this.addReceipt}>
          <i className="paperclip icon"></i>
          {buttonText}
        </button>
      </div>
    );
  };

  render() {
    if (this.props.evenSplit) {
      return (
        <div>
          {this.renderEvenSplitList()}
          {this.renderAddReceiptButton("even")}
        </div>
      );
    } else if (this.props.customSplit) {
      return (
        <div>
          {this.renderCustomInputs()}
          {this.renderAddReceiptButton("custom")}
        </div>
      );
    } else {
      return "";
    }
  }
}

export default AmountOwed;
