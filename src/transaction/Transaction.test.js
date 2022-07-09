/* eslint-disable no-undef */
import { expect } from 'chai';
import transaction from './Transaction';

it('cash in should yield 0.03% commission', () => {
  expect(transaction.cashIn({ amount: 200 }))
    .to.be.an('number')
    .to.equal(0.06);
});

it('cash in should yield maximum 5 amount commission', () => {
  expect(transaction.cashIn({ amount: 1000000 }))
    .to.be.an('number')
    .to.equal(5);
});
