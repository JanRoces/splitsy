export const buildMatrix = (receipts, participants) => {
  const debtMatrix = createArrayOfOwedAmounts(receipts, participants);

  populateSplitArray(receipts, participants, debtMatrix);
  modifyMatrix(receipts, debtMatrix);

  return debtMatrix;
};

export const findPaidForReceipts = (receipts, participants) => {
  const rLen = receipts.length;
  const pLen = participants.length;
  var paidForArray = [];

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
    paidForArray.push(data);
  }

  return paidForArray;
};

const createArrayOfOwedAmounts = (receipts, participants) => {
  const rLen = receipts.length;
  const pLen = participants.length;
  var matrix = [];

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

    matrix.push(owe);
  }

  return matrix;
};

const populateSplitArray = (receipts, participants, matrix) => {
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
        runningAmount = matrix[j].splitArray[k].amount;
        runningAmount = runningAmount + receipts[i].splitEvenAmount;
        matrix[j].splitArray[k].amount = runningAmount.toFixed(2);
      }
    } else {
      for (k = 0; k < pLen; k++) {
        var amountOwed = receipts[i].splitCustomAmounts[k];
        runningAmount = matrix[j].splitArray[k].amount;
        runningAmount = runningAmount + amountOwed;
        matrix[j].splitArray[k].amount = runningAmount.toFixed(2);
      }
    }
  }
};

const modifyMatrix = (receipts, matrix) => {
  const rLen = receipts.length;

  var payer, ower, weight;
  var payerAmount;
  var owerAmount;

  for (var i = 0; i < rLen; i++) {
    payer = matrix[i].key;
    for (var j = 0; j < rLen; j++) {
      ower = matrix[i].splitArray[j].name;
      if (payer === ower) {
        matrix[i].splitArray[j].amount = 0;
      } else {
        payerAmount = matrix[i].splitArray[j].amount;
        owerAmount = matrix[j].splitArray[i].amount;
        weight = payerAmount - owerAmount;

        if (weight < 0) {
          weight = weight * -1;
          matrix[i].splitArray[j].amount = 0;
          matrix[j].splitArray[i].amount = weight.toFixed(2);
        } else if (weight > 0) {
          //situation where payer still owes ower money
          matrix[i].splitArray[j].amount = weight.toFixed(2);
          matrix[j].splitArray[i].amount = 0;
        } else if (weight === 0) {
          matrix[i].splitArray[j].amount = 0;
          matrix[j].splitArray[i].amount = 0;
        }
        weight = 0;
      }
    }
  }
};
