import React, { Component } from "react";
import Chart from "./Chart";
//import DebtDisplay from "./DebtDisplay";
import "./Breakdown.css";

class Breakdown extends Component {
  state = {
    allReceipts: this.props.allReceipts,
    main: {},
    members: this.props.members,
    oweMatrix: [],
    paidFor: [],
    infoLoaded: false,
  };

  componentDidMount() {
    this.mainData();
    this.generateReceiptList();
    this.determineDebt();
    console.log(this.state);
  }

  render() {
    console.log(this.state);

    if (this.state.infoLoaded === true) {
      return (
        <div>
          <div>
            <Chart data={this.state.main} />
            <div className="fields">
              <button
                className="ui icon button"
                type="button"
                onClick={this.changeColor}>
                <i className="paint brush icon"></i>
              </button>
            </div>
            <br />
            <div>{this.display()}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    }
  }

  //this function creates the data set that is used
  //to display the doughnut chart
  mainData = () => {
    var data = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
          hoverbackgroundColor: [],
        },
      ],
    };

    var mem = this.state.members;
    var tmp = this.state.allReceipts;
    var rnum = 0;
    var i, j, color, name;

    for (i = 0; i < mem.length; i++) {
      data.labels.push(mem[i]);
      name = mem[i];
      for (j = 0; j < tmp.length; j++) {
        if (tmp[j].payer === name) {
          rnum = rnum + tmp[j].amount;
        }
      }
      color = "#" + Math.random().toString(16).slice(2, 8).toUpperCase();
      rnum = parseFloat(rnum);
      data.datasets[0].data.push(rnum);
      data.datasets[0].backgroundColor.push(color);
      data.datasets[0].hoverbackgroundColor.push(color);
      rnum = 0;
    }

    this.setState({ main: data });
  };

  changeColor = () => {
    var data = this.state.main;
    var len = this.state.members.length;
    var i, newColor;

    for (i = 0; i < len; i++) {
      newColor = "#" + Math.random().toString(16).slice(2, 8).toUpperCase();
      data.datasets[0].backgroundColor[i] = newColor;
      data.datasets[0].hoverbackgroundColor[i] = newColor;
    }

    this.setState({ main: data });
  };

  generateReceiptList = () => {
    var rList = []; //list containing receipts that each participant paid for
    var i;
    var j = 0;

    var mem = this.state.members;
    var rec = this.state.allReceipts;
    var len = this.state.members.length;
    var len2 = this.state.allReceipts.length;

    //loop through members and populate data.name for rList
    for (i = 0; i < len; i++) {
      var data = {
        name: "",
        paidFor: [],
      };

      data.name = mem[i];
      rList.push(data);
    }

    //loop through all receipts to find receipts that member paid for
    for (i = 0; i < len2; i++) {
      while (rec[i].payer !== rList[j].name) {
        j++;
      }
      rList[j].paidFor.push(rec[i].name);
      j = 0;
    }

    this.setState({ paidFor: rList });
  };

  determineDebt = () => {
    var mem = this.state.members;
    var rec = this.state.allReceipts;
    var len = this.state.members.length;
    var len2 = this.state.allReceipts.length;
    var i, j, k;
    var rnum,
      rnum2 = 0;
    var splitAmt = 0;
    var objArr = [];
    var p;

    //loop through list of members and create owe object
    //populate owe.key with member
    for (i = 0; i < len; i++) {
      var owe = {
        key: "",
        member: [],
      };

      owe.key = mem[i];
      //loop through list of members and create data object
      //populate owe.member with data objects
      for (j = 0; j < len; j++) {
        var data = {
          name: "",
          amt: 0,
        };

        data.name = mem[j];
        owe.member.push(data);
      }
      objArr.push(owe);
    }

    //loop through all receipts
    //receipt index: i
    for (i = 0; i < len2; i++) {
      p = rec[i].payer;
      splitAmt = rec[i].evenSplit;

      console.log("evenSplit: ", splitAmt);

      //find index of payer within member array
      //index of payer: j
      for (j = 0; j < len; j++) {
        if (mem[j] === p) {
          break;
        }
      }

      //populate .amt with respective amounts
      if (splitAmt !== 0) {
        //when splitting evenly
        for (k = 0; k < len; k++) {
          rnum = objArr[j].member[k].amt;
          rnum = rnum + splitAmt;
          objArr[j].member[k].amt = parseFloat(rnum);
        }
      } else {
        //when splitting custom
        for (k = 0; k < len; k++) {
          rnum = objArr[j].member[k].amt;
          rnum2 = rec[i].custom[k].amt;
          rnum = rnum + rnum2;
          objArr[j].member[k].amt = parseFloat(rnum);
        }
      }
    }

    var payer, ower, weight;
    var pAmt; //amount owed to payer
    var oAmt; //amount to compare difference

    //modify the 2D array
    for (i = 0; i < len; i++) {
      payer = objArr[i].key;
      console.log("payer: ", payer);
      for (j = 0; j < len; j++) {
        ower = objArr[i].member[j].name;
        console.log("ower: ", ower);
        if (payer === ower) {
          //if payer == ower then set amt = 0
          console.log("payer = ower, set amt to 0");
          objArr[i].member[j].amt = 0;
        } else {
          //measure weight
          pAmt = objArr[i].member[j].amt;
          oAmt = objArr[j].member[i].amt;
          weight = pAmt - oAmt;
          console.log("pAmt: ", pAmt);
          console.log("oAmt: ", oAmt);
          console.log("weight: ", weight);
          if (weight < 0) {
            //situation where ower still owes payer money
            weight = weight * -1;
            objArr[i].member[j].amt = 0;
            objArr[j].member[i].amt = weight.toFixed(2);
          } else if (weight > 0) {
            //situation where payer still owes ower money
            objArr[i].member[j].amt = weight.toFixed(2);
            objArr[j].member[i].amt = 0;
          } else if (weight === 0) {
<<<<<<< HEAD
            //situation where payer's and ower's amounts cancel out
=======
>>>>>>> 77191aafa98ed7402b599dfcda695d5be336c057
            objArr[i].member[j].amt = 0;
            objArr[j].member[i].amt = 0;
          }
          weight = 0;
        }
      }
    }

    this.setState({ oweMatrix: objArr, infoLoaded: true });
  };

  display = () => {
    var m = this.state.oweMatrix;
    var pf = this.state.paidFor;
    var len = this.state.oweMatrix.length;
    var i, j, x, y;
    var amt = 0;
    var oweList = [];
    var keyIndex = 0;

    for (i = 0; i < len; i++) {
      x = m[i].key;
      console.log(x);
      for (j = 0; j < len; j++) {
        y = m[i].member[j].name;
        amt = m[i].member[j].amt;
        console.log(y);
        console.log(amt);
        if (amt !== 0) {
          console.log("display amt: ", amt);
          oweList.push(
            <div className="ui big label" key={keyIndex}>
              {y} owes {x} $ {amt}
            </div>
          );
          keyIndex++;
        } else {
          console.log("amt = 0");
          console.log(j);
          continue;
        }
      }
    }

    return <div className="fields">{oweList}</div>;
  };
}

export default Breakdown;
