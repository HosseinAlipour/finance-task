/* eslint-disable no-undef */
import { expect } from 'chai';
import JuridicalTransaction from './JuridicalTransaction';

let transaction;
beforeEach(() => {
  transaction = new JuridicalTransaction({
    cashOut: {
      ratio: 0.003,
      min: {
        amount: 0.5,
      },
    },
  });
});

it('juridical cash out should yield 0.3% commission', () => {
  const commission = transaction.cashOut({ amount: 200 });

  expect(commission).to.be.an('number').to.equal(0.6);
});

it('juridical cash out should yield minimum 0.5 amount commission', () => {
  const commission = transaction.cashOut({ amount: 100 });

  expect(commission).to.be.an('number').to.equal(0.5);
});
