export const buildMatrix = (receipts, participants) => {
  console.log("receipts :>> ", receipts);
  const paidForArray = findRecieptsParticipantPaidFor(receipts, participants);
  var oweAmountArray = createArrayOfOwedAmounts(receipts, participants);
  oweAmountArray = populateSplitArray(receipts, participants, oweAmountArray);
  console.log("oweAmountArray :>> ", oweAmountArray);
  return ["hello", "world"];
};

const findRecieptsParticipantPaidFor = (receipts, participants) => {
  const rLen = receipts.length;
  const pLen = participants.length;
  var objArr = [];

  for (var i = 0; i < pLen; i++) {
    var data = {
      name: "",
      paidFor: [],
    };

    for (var j = 0; j < rLen; j++) {
      if (receipts[j].paidBy === participants[i]) {
        data.paidFor.push(receipts[j].name);
      }
    }
    data.name = participants[i];
    objArr.push(data);
  }

  return objArr;
};

const createArrayOfOwedAmounts = (receipts, participants) => {
  const rLen = receipts.length;
  const pLen = participants.length;
  var objArr = [];

  for (var i = 0; i < pLen; i++) {
    var owe = {
      key: "",
      splitArray: [],
    };

    owe.key = participants[i];

    for (var j = 0; j < pLen; j++) {
      var data = {
        name: "",
        amount: 0,
      };

      data.name = participants[j];
      owe.splitArray.push(data);
    }

    objArr.push(owe);
  }

  return objArr;
};

const populateSplitArray = (receipts, participants, oweAmountArray) => {
  const rLen = receipts.length;
  const pLen = participants.length;
  var runningAmount;
  var j, k;

  for (var i = 0; i < rLen; i++) {
    const payer = receipts[i].paidBy;

    for (j = 0; j < pLen; j++) {
      if (participants[j] === payer) {
        break;
      }
    }

    if (receipts[i].splitEven) {
      for (k = 0; k < pLen; k++) {
        runningAmount = oweAmountArray[j].splitArray[k].amount;
        runningAmount = runningAmount + receipts[i].splitEvenAmount;
        oweAmountArray[j].splitArray[k].amount = runningAmount.toFixed(2);
      }
    } else {
      for (k = 0; k < pLen; k++) {
        var amountOwed = receipts[i].splitCustomAmounts[k];
        runningAmount = oweAmountArray[j].splitArray[k].amount;
        runningAmount = runningAmount + amountOwed;
        oweAmountArray[j].splitArray[k].amount = runningAmount.toFixed(2);
      }
    }
  }

  return oweAmountArray;
};
