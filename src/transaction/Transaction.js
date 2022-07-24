import $ from '../lib/money/money';

export default class Transaction {
  constructor(transactionConfig) {
    this.cashInConfig = transactionConfig.cashIn;
  }

  cashIn({ amount }) {
    const threePrecentOfAmount = $(amount).multiply(this.cashInConfig.ratio);
    const commission = Math.min(this.cashInConfig.max.amount, threePrecentOfAmount.format());

    return commission;
  }
}
