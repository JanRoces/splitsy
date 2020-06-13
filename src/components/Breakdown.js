import React, { Component } from "react";
import Chart from "./Chart";
import DebtDisplay from "./DebtDisplay";

class Breakdown extends Component {
  state = {
    allReceipts: this.props.allReceipts,
    main: {},
    members: this.props.members,
    oweArr: [],
  };

  //dataSet = [];

  componentDidMount() {
    this.mainData();
    this.determineDebt();
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <div>
          <Chart data={this.state.main} />
          <div>
            <button type="button" onClick={this.changeColor}>
              Change Color
            </button>
          </div>
          <br />
          {/*<DebtDisplay
            matrix={this.state.oweArr}
            members={this.state.members}
          />*/}
          <div>{this.display()}</div>
        </div>
      </div>
    );
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
      //console.log("newColor: ", newColor);
      data.datasets[0].backgroundColor[i] = newColor;
      data.datasets[0].hoverbackgroundColor[i] = newColor;
    }

    this.setState({ main: data });
  };

  determineDebt = () => {
    var mem = this.state.members;
    var rec = this.state.allReceipts;
    var len = this.state.members.length;
    var len2 = this.state.allReceipts.length;
    var i, j, k;
    var rnum = 0;
    var splitAmt = 0;
    var objArr = [];
    var p;

    for (i = 0; i < len; i++) {
      var owe = {
        key: "",
        member: [],
      };

      owe.key = mem[i];
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

      //find index of payer within member array
      //index of payer: j
      for (j = 0; j < len; j++) {
        if (mem[j] === p) {
          break;
        }
      }

      //populate .amt with respective amounts
      if (splitAmt != 0) {
        for (k = 0; k < len; k++) {
          rnum = objArr[j].member[k].amt;
          rnum = rnum + splitAmt;
          objArr[j].member[k].amt = rnum;
        }
      } else {
        for (k = 0; k < len; k++) {
          rnum = objArr[j].member[k].amt;
          rnum = rnum + rec[i].custom[k];
          objArr[j].member[k].amt = rnum;
        }
      }
    }

    var payer, ower, weight;
    var pAmt; //amount owed to payer
    var oAmt; //amount to compare difference

    for (i = 0; i < len; i++) {
      payer = objArr[i].key;
      console.log("payer: ", payer);
      for (j = 0; j < len; j++) {
        ower = objArr[i].member[j].name;
        console.log("ower: ", ower);
        if (payer == ower) {
          objArr[i].member[j].amt = 0;
        } else {
          pAmt = objArr[i].member[j].amt;
          oAmt = objArr[j].member[i].amt;
          console.log("pAmt: ", pAmt);
          console.log("oAmt: ", oAmt);
          weight = pAmt - oAmt;
          if (weight < 0) {
            weight = weight * -1;
            objArr[i].member[j].amt = 0;
            objArr[j].member[i].amt = weight;
          } else if (weight > 0) {
            objArr[i].member[j].amt = weight;
            objArr[j].member[i].amt = 0;
          } else if (weight == 0) {
            objArr[i].member[j].amt = 0;
            objArr[j].member[i].amt = 0;
          }
          weight = 0;
        }
      }
    }
    this.setState({ oweArr: objArr });
  };

  display = () => {
    var m = this.state.oweArr;
    console.log(m);
    return <div>hello</div>;
  };
}

export default Breakdown;
