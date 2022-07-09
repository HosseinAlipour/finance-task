import Transaction from './Transaction';
import $ from '../lib/money/money';

const commisionPercent = 0.003;

export default class JuridicalTransaction extends Transaction {
  static cashOut({ amount }) {
    const amountCommission = $(amount).multiply(commisionPercent);
    return Math.max(0.5, amountCommission.format());
  }
}
