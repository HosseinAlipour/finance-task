import $ from '../lib/money/money';

const commisionPercent = 0.0003;

export default class Transaction {
  static cashIn({ amount }) {
    const threePrecentOfAmount = $(amount).multiply(commisionPercent);
    const commission = Math.min(5, threePrecentOfAmount.format());

    return commission;
  }
}
