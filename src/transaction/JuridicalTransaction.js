import Transaction from './Transaction';
import $ from '../lib/money/money';

export default class JuridicalTransaction extends Transaction {
  constructor(transactionConfig) {
    super(transactionConfig);
    this.cashOutConfig = transactionConfig.cashOut;
  }

  cashOut({ amount }) {
    const amountCommission = $(amount).multiply(this.cashOutConfig.ratio);
    return Math.max(this.cashOutConfig.min.amount, amountCommission.format());
  }
}
