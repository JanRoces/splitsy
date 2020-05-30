// ACTION CREATOR

export const createReceipt = () => {
  type: "CREATE_RECEIPT";
  payload: {
    title: title;
    amount: amount;
    payer: payer;
    evenSplit: evensplit;
    customSplit: customsplit;
  }
};
