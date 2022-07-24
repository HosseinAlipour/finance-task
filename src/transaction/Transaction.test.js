/* eslint-disable no-undef */
import { expect } from 'chai';
import Transaction from './Transaction';

let transaction;
beforeEach(() => {
  transaction = new Transaction({
    cashIn: {
      ratio: 0.0003,
      max: {
        amount: 5,
      },
    },
  });
});

it('cash in should yield 0.03% commission', () => {
  const commission = transaction.cashIn({ amount: 200 });

  expect(commission).to.be.an('number').to.equal(0.06);
});

it('cash in should yield maximum 5 amount commission', () => {
  const commisssion = transaction.cashIn({ amount: 1000000 });

  expect(commisssion).to.be.an('number').to.equal(5);
});
