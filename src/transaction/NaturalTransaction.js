import Transaction from './Transaction';
import $ from '../lib/money/money';
import dbInterface from '../lib/db/fakeDbInterface';

export default class NaturalTransaction extends Transaction {
  constructor(transactionConfig) {
    super(transactionConfig);
    this.cashOutConfig = transactionConfig.cashOut;
  }

  cashOut(transaction) {
    const { amount } = transaction;
    const totalTransaction = dbInterface.getThisWeekTotalTransaction('cash_out', transaction);

    if (totalTransaction >= this.cashOutConfig.week_limit.amount) {
      return $(amount).multiply(this.cashOutConfig.ratio).format();
    }

    if ($(totalTransaction).add(amount).value > this.cashOutConfig.week_limit.amount) {
      const noCommission = $(this.cashOutConfig.week_limit.amount).subtract(totalTransaction);
      const commissionApplicable = $(amount).subtract(noCommission);

      return commissionApplicable.multiply(this.cashOutConfig.ratio).format();
    }

    return 0;
  }
}
