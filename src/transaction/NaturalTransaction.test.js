/* eslint-disable no-undef */
import { expect, assert } from 'chai';
import sinon from 'sinon';
import NaturalTransaction from './NaturalTransaction';
import dbInterface from '../lib/db/fakeDbInterface';

const stub = sinon.stub(dbInterface, 'getThisWeekTotalTransaction');
let transaction;

beforeEach(() => {
  stub.reset();
  transaction = new NaturalTransaction({
    cashOut: {
      ratio: 0.003,
      week_limit: { amount: 1000 },
    },
  });
});

describe('if this week total transaction under 1000 amount', () => {
  it('natural cash out should no commission', () => {
    stub.returns(499);

    const commission = transaction.cashOut({ amount: 500 });

    expect(commission).to.be.an('number').to.equal(0);
    assert(stub.calledOnce);
  });

  it('natural cash out should no commission if cash out reached just to 1000 amount', () => {
    stub.returns(500);

    const commission = transaction.cashOut({ amount: 500 });

    expect(commission).to.be.an('number').to.equal(0);
    assert(stub.calledOnce);
  });

  it('cash out should yield commission only for the amount overflowed from 1000', () => {
    stub.returns(800);

    const commission = transaction.cashOut({ amount: 400 });

    expect(commission).to.be.an('number').to.equal(0.6);
    assert(stub.calledOnce);
  });
});

describe('if this week total transaction above 1000 amount', () => {
  it('natural cash out should yield 0.3% commission', () => {
    stub.returns(1200);

    const commission = transaction.cashOut({ amount: 200 });

    expect(commission).to.be.an('number').to.equal(0.6);
    assert(stub.calledOnce);
  });

  it('cash out should yield no commission', () => {
    stub.returns(1000);

    const commission = transaction.cashOut({ amount: 500 });

    expect(commission).to.be.an('number').to.equal(1.5);
    assert(stub.calledOnce);
  });
});
