import Transaction from './Transaction';
import $ from '../lib/money/money';
import dbInterface from '../lib/db/fakeDbInterface';

const commisionPercent = 0.003;

export default class NaturalTransaction extends Transaction {
  static cashOut(transaction) {
    const { amount } = transaction;
    const totalTransaction = dbInterface.getThisWeekTotalTransaction('cash_out', transaction);

    if (totalTransaction >= 1000) {
      return $(amount).multiply(commisionPercent).format();
    }

    // totalTransaction with this transaction goes over 1000
    // calculates commission what's overflow 1000
    if ($(totalTransaction).add(amount).value > 1000) {
      const noCommission = $(1000).subtract(totalTransaction);
      const commissionApplicable = $(amount).subtract(noCommission);

      return commissionApplicable.multiply(commisionPercent).format();
    }

    return 0;
  }
}
