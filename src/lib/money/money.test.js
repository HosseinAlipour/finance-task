/* eslint-disable no-undef */
import { expect } from 'chai';
import $ from './money';

describe('should handle different inputs types', () => {
  it('should handle short floating inputs', () => {
    const money = $(0.2);
    expect(money.format()).to.equal(0.2);
    expect(money.value).to.equal(0.2);
  });

  it('should handle long floating inputs', () => {
    const money = $(0.2585);
    expect(money.format()).to.equal(0.26);
    expect(money.value).to.equal(0.2585);
  });

  it('should handle short integer inputs', () => {
    const money = $(23);
    expect(money.format()).to.equal(23);
  });

  it('should handle large integer inputs', () => {
    const money = $(23);
    expect(money.format()).to.equal(23);
  });
});

describe('should format numbers correctly', () => {
  it('should format 0.2023 ceiled to the 2ed decimal place to yeild 0.21', () => {
    const money = $(0.2023);

    expect(money.format(2)).to.equal(0.21);
    expect(money.value).to.equal(0.2023);
  });

  it('should format 0.2023 ceiled to the 3rd decimal place to yeild 0.203', () => {
    const money = $(0.2023);

    expect(money.format(3)).to.equal(0.203);
  });
});

describe('should add numbers correctly', () => {
  it('should add up 12.55 and 10 to 22.55', () => {
    const money = $(12.55);

    money.add(10);

    expect(money.format()).to.equal(22.55);
  });
  it('should add up 0.1 and 0.2 to 0.3', () => {
    const money = $(0.1);

    money.add(0.2);

    expect(money.format()).to.equal(0.3);
  });

  it('should add up 0.875 and 0.125 to 1', () => {
    const money = $(0.875);

    money.add(0.125);

    expect(money.format()).to.equal(1);
  });
});

describe('should multiply numbers correctly', () => {
  it('should multiply 0.1 * 0.2 to yeild 0.01', () => {
    const money = $(0.1);

    money.multiply(0.2);

    expect(money.format()).to.equal(0.02);
  });

  it('should multiply 13 * 0.7 to yeild 9.1', () => {
    const money = $(13);

    money.multiply(0.7);

    expect(money.format()).to.equal(9.1);
  });

  it('should multiply 3 to 0.15 to yeild 0.45', () => {
    const money = $(3);

    money.multiply(0.15);

    expect(money.format()).to.equal(0.45);
  });

  it('should multiply 0.15 to 3 to yeild 0.45', () => {
    const money = $(0.15);

    money.multiply(3);

    expect(money.format()).to.equal(0.45);
  });
});

describe('should be chainable', () => {
  it('should add up 0.875 and 0.125 to 1', () => {
    const money = $(0.875);

    expect(money.add(0.125).format()).to.equal(1);
  });
  it('should multiply 0.15 to 3 to yeild 0.45', () => {
    const money = $(0.15);

    expect(money.multiply(3).format()).to.equal(0.45);
  });
});

describe('should handle input type for itself', () => {
  it('add', () => {
    const money = $(0.875);

    money.add($(0.125));

    expect(money.format()).to.equal(1);
  });

  it('multiply', () => {
    const money = $(13);

    money.multiply($(0.7));

    expect(money.format()).to.equal(9.1);
  });
});

describe('should throw', () => {
  it('expect non-number argument to throw error', () => {
    expect(() => $('foo')).to.throw();
  });

  it('expect empty argument to throw error ', () => {
    expect(() => $()).to.throw();
  });
});
