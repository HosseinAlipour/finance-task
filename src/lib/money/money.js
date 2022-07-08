/**
 * money class to handle subset math operators.
 * this is due to inaccurecy in IEEE float number
 * which is implemented in most programming languages
 */

class Money {
  constructor(amount, currency) {
    const parsedAmount = Number.parseInt(amount, 10);
    if (Number.isNaN(parsedAmount) || amount < 0) {
      throw new Error('money must be valid number larger or equal to zero');
    }
    this.parsePriceToInt(amount);
    this.currency = currency;
  }

  /**
   * parse optional float to int and a precision
   * @param {number|string} amount
   */
  parsePriceToInt(amount) {
    const amountIntLength = `${Number.parseInt(amount, 10)}`.length;
    const amountLength = `${amount}`.length;

    if (amountLength > amountIntLength) {
      // float provided convert float to str inteager
      const [int, float] = `${amount}`.split('.');
      this.amount = +(int + float);
      this.precision = amountLength - 1 - amountIntLength;
    } else {
      this.amount = amount;
      this.precision = 0;
    }
  }

  static validate(input) {
    if (input instanceof Money) return input;
    return new Money(input);
  }

  multiply(multiplyAmount) {
    const moneyInstance = Money.validate(multiplyAmount);

    this.amount *= moneyInstance.amount;
    this.precision += moneyInstance.precision;
    return this;
  }

  add(addAmount) {
    const moneyInstance = Money.validate(addAmount);

    this.amount += moneyInstance.amount;
    this.precision = Math.max(this.precision, moneyInstance.precision);
    return this;
  }

  get value() {
    const decimalFactor = `e-${this.precision}`;
    const price = this.amount + decimalFactor;
    return price * 1;
  }

  /**
   * format integer to float type to the nth decimal place
   * @param {decimalPlace = 2} decimalPlace
   */
  format(decimalPlace = 2) {
    // use number exponent to handle money
    const ceilFactor = `e${decimalPlace - this.precision}`;
    const decimalFactor = `e-${decimalPlace}`;

    const price = Math.ceil(this.amount + ceilFactor) + decimalFactor;

    // multiply price by one to remove exponent from number
    return price * 1;
  }
}

export default function money(...args) {
  return new Money(...args);
}
