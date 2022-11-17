const axios = require("axios");
const auth = require("./auth");
const sign = require("./sign");

async function sendWithinEquity(source, destination, transfer) {
  const {
    countryCode: sourceCountryCode,
    name: sourceName,
    accountNumber: sourceAccountNumber,
  } = source;
  const {
    type: destinationType,
    countryCode: destinationCountryCode,
    name: destinationName,
    accountNumber: destinationAccountNumber,
  } = destination;
  const {
    type: transferType,
    amount: transferAmount,
    currencyCode: transferCurrencyCode,
  } = transfer;

  const url =
    "https://uat.finserve.africa/v3-apis/transaction-api/v3.0/remittance/internalBankTransfer";

  const accessToken = await auth.getAccessToken();

  const data = `${countryCode}${accountId}${date}`;

  const signature = sign.getSignature(data);

  const openingAndClosingBalance = (
    await axios.post(
      url,
      {
        countryCode,
        accountId,
        date,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          signature: signature,
          "Content-Type": "application/json",
        },
      }
    )
  ).data;

  console.log("openingAndClosingBalance:", openingAndClosingBalance.data);

  return openingAndClosingBalance;
}

getInquiry("KE", "1450160649886");

module.exports = {
  getBalance,
  getMiniStatement,
  getFullStatement,
  getOpeningAndClosingBalance,
  getInquiry,
};
