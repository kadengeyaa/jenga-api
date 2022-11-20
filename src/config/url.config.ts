import { EvnConfig } from './env.config.js';

export abstract class URLConfig {
  static kBaseURL =
    EvnConfig.kEnv === 'production' ? 'https://api-finserve-prod.azure-api.net' : 'https://uat.finserve.africa';

  // Authorization
  static kAuthToken = `${this.kBaseURL}/authentication/api/v3/authenticate/merchant`;

  // Account
  static kAccountBalance = `${this.kBaseURL}/v3-apis/account-api/v3.0/accounts/balances`;
  static kAccountMiniStatement = `${this.kBaseURL}/v3-apis/account-api/v3.0/accounts/miniStatement`;
  static kAccountFullStatement = `${this.kBaseURL}/v3-apis/account-api/v3.0/accounts/fullStatement`;
  static kAccountOpeningAndClosingBalance = `${this.kBaseURL}/v3-apis/account-api/v3.0/accounts/accountBalance/query`;
  static kAccountInquiry = `${this.kBaseURL}/v3-apis/account-api/v3.0/accounts/search`;

  // Send money
  static kSendMoneyWithinEquityBank = `${this.kBaseURL}/v3-apis/transaction-api/v3.0/remittance/internalBankTransfer`;
  static kSendMoneyToMobileWallet = `${this.kBaseURL}/v3-apis/transaction-api/v3.0/remittance/sendmobile`;
  static kSendMoneyRTGS = `${this.kBaseURL}/v3-apis/transaction-api/v3.0/remittance/rtgs`;
  static kSendMoneySWIFT = `${this.kBaseURL}/v3-apis/transaction-api/v3.0/remittance/swift`;
  static kSendMoneyEFT = `${this.kBaseURL}`; // Not provided
  static kSendMoneyPesalinkToBankAccount = `${this.kBaseURL}/v3-apis/transaction-api/v3.0/remittance/pesalinkacc`;
  static kSendMoneyPesalinkToMobileNumber = `${this.kBaseURL}/v3-apis/transaction-api/v3.0/remittance/pesalinkMobile`;

  // Send money queries
  static kSendMoneyAccountInquiry = `${this.kBaseURL}`; // Not provided
  static kSendMoneyTransactionStatus = `${this.kBaseURL}/v3-apis/transaction-api/v3.0/transactions/details`;

  // Receive money
  static kReceiveMoneyEazzyPayPush = `${this.kBaseURL}`; // Not provided
  static kReceiveMoneyLipaNaMPesaOnline = `${this.kBaseURL}`; // Not provided
  static kReceiveMoneyBillPayment = `${this.kBaseURL}/v3-apis/transaction-api/v3.0/bills/pay`;
  static kReceiveMoneyMerchantPayment = `${this.kBaseURL}/v3-apis/transaction-api/v3.0/tills/pay`;
  static kReceiveMoneyBillValidation = `${this.kBaseURL}/v3-apis/transaction-api/v3.0/bills/validation`;
  static kReceiveMoneyRefundPaymentEazyPayPush = `${this.kBaseURL}`; // Not provided

  // Receive money queries
  static kReceiveMoneyAllEazyPayMerchants = `${this.kBaseURL}/v3-apis/transaction-api/v3.0/merchants`;
  static kReceiveMoneyPaymentStatusEazzyPayPush = `${this.kBaseURL}`; // Not provided
  static kReceiveMoneyTransactionStatus = `${this.kBaseURL}`; // Not provided
  static kReceiveMoneyAllBillers = `${this.kBaseURL}/v3-apis/transaction-api/v3.0/billers`;

  // Airtime
  static kAirtimePurchase = `${this.kBaseURL}/v3-apis/transaction-api/v3.0/airtime`;

  // Loans
  static kLoanCreditScore = `${this.kBaseURL}/v3-apis/v3.0/validate/crb`;

  // Forex rates
  static kForexRates = `${this.kBaseURL}/v3-apis//transaction-api/v3.0/foreignExchangeRates`;

  // KYC
  static kYCIDSearchAndVerification = `${this.kBaseURL}/v3-apis/v3.0/validate/identity`;
}
