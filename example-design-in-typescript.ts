type transactionType = 'cash_in' | 'cash_out';

abstract class Money {}

abstract class dbTransactionInterface {
  getThisWeekTotalTransaction(type: transactionType, user_id: number) {
    return 'total transaction in this week';
  }
}

abstract class Customer {
  constructor(private userId) {}
  createTransaction() {}
}

class NaturalCustomer extends Customer {
  createTransaction() {
    return new NaturalTransaction();
  }
}

class LegalCustomer extends Customer {
  createTransaction() {
    return new LegalTransaction();
  }
}

abstract class Transaction {
  private commission;
  cashIn(amount: Money) {
    return 'general Transaction';
  }
  abstract cashOut(amount: Money);
}

class NaturalTransaction extends Transaction {
  cashOut(amount: Money) {
    return 'natural cash out commission';
  }
}

class LegalTransaction extends Transaction {
  cashOut(amount: Money) {
    return 'legal cash out commission';
  }
}

class application {
  private customer;
  constructor(private record) {
    this.init(record);
    this.main(record);
  }
  init({ user_type, user_id }) {
    switch (user_type) {
      case 'juridical':
        this.customer = new LegalCustomer(user_id);
        break;
      case 'natural':
        this.customer = new NaturalCustomer(user_id);
        break;
      default:
        throw new Error('user type not recognized');
    }
  }

  main({ type, operation }) {
    switch (type) {
      case 'cash_in':
        return this.customer.cashIn(operation.amount);
        break;
      case 'cash_out':
        return this.customer.cashOut(operation.amount);
        break;

      default:
        throw new Error('operation type not recognized');
        break;
    }
  }
}

export {};
