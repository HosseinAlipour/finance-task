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

    return 0;
  }
}
