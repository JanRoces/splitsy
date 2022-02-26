export const buildChartData = (receipts, participants) => {
  var data = {
    labels: participants,
    datasets: [
      {
        data: getExpenseDistribution(receipts, participants),
        backgroundColor: getRandomColors(participants.length),
      },
    ],
  };

  return data;
};

const getExpenseDistribution = (receipts, participants) => {
  const pLen = participants.length;
  const rLen = receipts.length;
  const data = [];

  for (var i = 0; i < pLen; i++) {
    const name = participants[i];
    var totalAmountPaidFor = 0;

    for (var j = 0; j < rLen; j++) {
      const paidBy = receipts[j].paidBy;

      if (name === paidBy) {
        totalAmountPaidFor = totalAmountPaidFor + receipts[j].total;
      }
    }

    data.push(totalAmountPaidFor);
  }

  return data;
};

const getRandomColors = (length) => {
  const colors = [];

  for (var i = 0; i < length; i++) {
    var randomColor;
    randomColor = "#" + Math.random().toString(16).slice(2, 8).toUpperCase();
    colors.push(randomColor);
  }

  return colors;
};
