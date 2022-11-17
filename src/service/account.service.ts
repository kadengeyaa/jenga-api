const axios = require("axios");
const auth = require("./auth");
const sign = require("./sign");

async function getBalance(countryCode, accountId) {
  const url =
    "https://uat.finserve.africa/v3-apis/account-api/v3.0/accounts/balances";

  const accessToken = await auth.getAccessToken();

  const data = `${countryCode}${accountId}`;

  const signature = sign.getSignature(data);

  const balance = (
    await axios.get(`${url}/${countryCode}/${accountId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        signature: signature,
        "Content-Type": "application/json",
      },
    })
  ).data;

  console.log("balance:", balance.data);

  return balance;
}

async function getMiniStatement(countryCode, accountNumber) {
  const url =
    "https://uat.finserve.africa/v3-apis/account-api/v3.0/accounts/miniStatement";

  const accessToken = await auth.getAccessToken();

  const data = `${countryCode}${accountNumber}`;

  const signature = sign.getSignature(data);

  const miniStatement = (
    await axios.get(`${url}/${countryCode}/${accountNumber}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        signature: signature,
        "Content-Type": "application/json",
      },
    })
  ).data;

  console.log("miniStatement:", miniStatement.data);

  return miniStatement;
}

async function getFullStatement(
  countryCode,
  accountNumber,
  fromDate,
  toDate,
  limit
) {
  const url =
    "https://uat.finserve.africa/v3-apis/account-api/v3.0/accounts/fullStatement";

  const accessToken = await auth.getAccessToken();

  const data = `${countryCode}${accountNumber}${toDate}`;

  const signature = sign.getSignature(data);

  const fullStatement = (
    await axios.post(
      url,
      {
        countryCode,
        accountNumber,
        fromDate,
        toDate,
        limit,
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

  console.log("fullStatement:", fullStatement.data);

  return fullStatement;
}

async function getOpeningAndClosingBalance(countryCode, accountId, date) {
  const url =
    "https://uat.finserve.africa/v3-apis/account-api/v3.0/accounts/accountBalance/query";

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

async function getInquiry(countryCode, accountNumber) {
  const url =
    "https://uat.finserve.africa/v3-apis/account-api/v3.0/accounts/search";

  const accessToken = await auth.getAccessToken();

  const data = `${countryCode}${accountNumber}`;

  const signature = sign.getSignature(data);

  const inquiry = (
    await axios.get(`${url}/${countryCode}/${accountNumber}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        signature: signature,
        "Content-Type": "application/json",
      },
    })
  ).data;

  console.log("inquiry:", inquiry.data);

  return inquiry;
}

getInquiry("KE", "1450160649886");

module.exports = {
  getBalance,
  getMiniStatement,
  getFullStatement,
  getOpeningAndClosingBalance,
  getInquiry,
};
