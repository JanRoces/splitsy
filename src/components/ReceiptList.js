import React, { Component } from "react";
import "./ReceiptList.css";

class ReceiptList extends Component {
  renderReceipts = () => {
    const { receipts } = this.props;
    const len = receipts.length;
    const receiptList = [];

    for (var i = 0; i < len; i++) {
      const name = receipts[i].name;
      const total = receipts[i].total;
      const id = name + i;

      receiptList.push(
        <div className="ui right labeled icon input list-item" key={id}>
          <input type="text" value={name} readOnly></input>
          <a className="ui tag label">$ {total}</a>
        </div>
      );
    }

    return receiptList;
  };

  render() {
    return (
      <div>
        <div className="divider-receipts">
          <h5 className="ui horizontal divider header header-title">
            <i className="tag icon icon-receipts"></i>
            Receipts
          </h5>
        </div>
        <div className="container-list">{this.renderReceipts()}</div>
      </div>
    );
  }
}

export default ReceiptList;
