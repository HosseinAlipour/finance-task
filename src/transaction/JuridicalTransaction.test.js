/* eslint-disable no-undef */
import { expect } from 'chai';
import JuridicalTransaction from './JuridicalTransaction';

it('juridical cash out should yield 0.3% commission', () => {
  expect(JuridicalTransaction.cashOut({ amount: 200 }))
    .to.be.an('number')
    .to.equal(0.6);
});

it('juridical cash out should yield minimum 0.5 amount commission', () => {
  expect(JuridicalTransaction.cashOut({ amount: 100 }))
    .to.be.an('number')
    .to.equal(0.5);
});
